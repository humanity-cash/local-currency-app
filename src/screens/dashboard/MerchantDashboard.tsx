import { AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useContext, useEffect, useState } from 'react';
import { useStore } from "react-hookstore";
import { ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Image, Text } from "react-native-elements";
import { DwollaAPI, TransactionsAPI } from "src/api";
import { BUTTON_TYPES } from "src/constants";
import { UserContext, WalletContext } from "src/contexts";
import { createFuseSearchInstance } from "src/fuse";
import { BUSINESS_TX_DATA_STORE, BUSINESS_TX_FILTERS_STORE } from "src/hook-stores";
import { useBusinessWallet } from "src/hooks";
import * as Routes from 'src/navigation/constants';
import DataLoading from "src/screens/loadings/DataLoading";
import { Button, Dialog, Header, SearchInput } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, dialogViewBase, FontFamily, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { getBerksharePrefix, sortTxByTimestamp } from "src/utils/common";
import { BusinessTxDataStore, BusinessTxDataStoreActions, BusinessTxDataStoreReducer, BusinessTxFilterStore, MiniTransaction, TransactionType } from "src/utils/types";
import DwollaDialog from './DwollaDialog';
import MerchantTransactionList from "./MerchantTransactionList";
import SettingDialog from 'src/shared/uielements/SettingDialog';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { EventsContext } from 'src/contexts/events';
import EventItem from 'src/shared/uielements/EventItem';
import MerchantTransactionsFilter from './MerchantTransactionsFilter';

type TransactionDetailProps = {
	visible: boolean,
	data: MiniTransaction,
	onConfirm: () => void
}

const TransactionDetail = (props: TransactionDetailProps) => {
	const {data, visible, onConfirm} = props;

	const getStyle = (type: string) => {
		if (type === TransactionType.SALE || type === TransactionType.RETURN || type === TransactionType.IN) {
			return styles.plusText;
		} else {
			return styles.minusText;
		}
	}

	return (
		<Dialog visible={visible} onClose={onConfirm} backgroundStyle={styles.dialog} style={styles.dialogHeight}>
			<View style={dialogViewBase}>
				<ScrollView style={wrappingContainerBase}>
					<View style={ baseHeader }>
						<Text style={getStyle(data.type)}>
							{data.type}
						</Text>
						<Text style={{...getStyle(data.type), ...styles.amountText}}>
							{getBerksharePrefix(data.type)} { data.value } 
						</Text>
					</View>
					<View style={styles.infoView}>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>{Translation.PAYMENT.TRANSACTION_ID}</Text>
							<Text style={styles.detailText}>{data.transactionHash}</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>TYPE</Text>
							<Text style={styles.detailText}>{data.type}</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>DATE</Text>
							<Text style={styles.detailText}>{moment(data.timestamp).format('HH:mm, MMM D, YYYY')}</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		</Dialog>
	)
}

const options = {
  includeScore: false,
  keys: ['toName', 'fromName', 'value']
}

const MerchantDashboard = (): JSX.Element => {
	const navigation = useNavigation();
	const [{ selectedType,
		startDate,
		endDate,
	}] = useStore<BusinessTxFilterStore>(BUSINESS_TX_FILTERS_STORE);
	const [apiData, dispatchApiData] = useStore<BusinessTxDataStore, BusinessTxDataStoreReducer>(BUSINESS_TX_DATA_STORE);
	const { businessWalletData, updateBusinessWalletData } = useContext(WalletContext);
	const { user } = useContext(UserContext);
	const { events, getEvents, deleteEvent } = useContext(EventsContext)
	const completedCustomerVerification = user?.verifiedCustomer;
	const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>("");
	const [isDetailViewOpen, setIsDetailViewOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<MiniTransaction>({} as MiniTransaction);
	const [isDwollaVisible, setIsDwollaVisible] = useState<boolean>(false);
	const [isPayment, setIsPayment] = useState<boolean>(false);
	const [filteredApiData, setFilteredApiData] = useState<MiniTransaction[]>([]);
	const { isLoading: isWalletLoading } = useBusinessWallet();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { businessDwollaId } = useContext(UserContext);
	let hasUnmounted = false;
	const businessFundingSource = businessWalletData?.availableFundingSource;
	const availableBalance = businessWalletData?.availableBalance;
	const [isSetting, setIsSetting] = useState(false)

	useEffect(() => {
		const timerId = setInterval(async () => {
			if (businessDwollaId) {
				const userWallet = await DwollaAPI.loadWallet(businessDwollaId)
				const fundingSource = await DwollaAPI.loadFundingSource(businessDwollaId)
				updateBusinessWalletData(({ ...userWallet, availableFundingSource: fundingSource }))
				getEvents(businessDwollaId)
			}
		}, 1000);
		return () => clearInterval(timerId);
	}, [businessDwollaId]);

	const fuse = createFuseSearchInstance(filteredApiData, options)
	const onSearchChange = (name: string, change: string) => {
		updateSearchText(change)
	}

	const updateSearchText = (change: string) => {
		if (!change) {
			setFilteredApiData(apiData.txs)
			setSearchText(change);
			return
		}
		const fuseResult = fuse.search(change)
		//@ts-ignore
		setFilteredApiData(fuseResult.map(i => i.item))
		setSearchText(change);
	}

	useEffect(() => {
		if (!startDate && !endDate) {
			setFilteredApiData(apiData.txs)
			return
		}
		const data = apiData.txs.reduce<MiniTransaction[]>((acc, curr) => {
			if (startDate) {
				if (curr.timestamp < startDate?.getTime()) {
					return acc
				}
			}
			if (endDate) {
				if (curr.timestamp > endDate?.getTime()) {
					return acc
				}
			}
			return [...acc, curr]
		}, [])
		setFilteredApiData(data)
	}, [startDate, endDate, selectedType])
	const viewDetail = (item: MiniTransaction) => {
		setSelectedItem(item);
		setIsDetailViewOpen(true);
	}

	useEffect(() => {
		const handler = async () => {
			if (hasUnmounted) return;
			if (!businessDwollaId) return
			setIsLoading(true);
			const txs = await TransactionsAPI.getAllTransactions(businessDwollaId)
			const sortedTxs = sortTxByTimestamp(txs)
			dispatchApiData({ type: BusinessTxDataStoreActions.UpdateTransactions, payload: { txs: sortedTxs } })
			setFilteredApiData(sortedTxs)
			setIsLoading(false);
		}
		handler();

		return () => {
			hasUnmounted = true;
		}

	}, [businessWalletData.availableBalance, businessDwollaId]);

	const clearSearchText = () => {
		updateSearchText("")
	}

	const onConfirm = () => {
		setIsDetailViewOpen(false);
	}

	const onClose = () => {
		setIsDwollaVisible(false);
		setIsPayment(false);
	};

	const selectBank = () => {
		navigation.navigate(Routes.MERCHANT_BANK_ACCOUNT);
		onClose();
	}

	const onPressScan = async () => {
		const {status} = await BarCodeScanner.requestPermissionsAsync();
		if(status === 'granted') {
			if(businessFundingSource && availableBalance > 0) {
				navigation.navigate(Routes.MERCHANT_QRCODE_SCAN)
			} else {
				navigation.navigate(Routes.MERCHANT_REQUEST)
			}
		} else {
			setIsSetting(true)
		}
	}

	return (
		<View style={viewBaseB}>
			<DataLoading visible={isWalletLoading || isLoading} />
			<Header
				leftComponent={
					<TouchableWithoutFeedback onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
						<View style={styles.inlineView}>
							<Entypo
								name='menu'
								size={25}
								color={colors.purple}
							/>
							<Text style={styles.mainTextColor}>{Translation.BUTTON.MENU}</Text>
						</View>
					</TouchableWithoutFeedback>
				}
			/>
			<View style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>{Translation.LANDING_PAGE.TITLE}</Text>
				</View>
				<View style={styles.amountView}>
					<Text style={styles.amountTxt}>B$ {businessFundingSource ? availableBalance : '-'}</Text>
				</View>

				<ScrollView>
					<View style={styles.content}>
						{!completedCustomerVerification && <View style={styles.alertView}>
							<AntDesign name="exclamationcircleo" size={18} style={styles.alertIcon} />
							<Text style={styles.alertText}>
								{Translation.PROFILE.PERSONAL_PROFILE_ALERT} &nbsp;
								<Text style={styles.alertIcon} onPress={() => navigation.navigate(Routes.PERSONAL_PROFILE)}>{Translation.BUTTON.GOTO_SETUP} &gt;</Text>
							</Text>
						</View>}

						{!businessFundingSource && !isWalletLoading? (
							<View style={styles.alertView}>
								<AntDesign
									name='exclamationcircleo'
									size={18}
									style={styles.alertIcon}
								/>
								<Text style={styles.alertText}>
									{Translation.BANK_ACCOUNT.ACCOUNT_ALERT} &nbsp;
									<Text
										style={styles.alertIcon}
										onPress={() => setIsDwollaVisible(true)}>
										{`${Translation.BANK_ACCOUNT.LINK_BUSINESS_BANK_ACCOUNT} `}
										&gt;
									</Text>
								</Text>
							</View>
						): null}
						{ events.length > 0 && 
							<EventItem 
								event={events[events.length-1]}
								onDelete={()=>{deleteEvent(businessDwollaId, events[events.length-1].dbId)}} 
							/>
						}
						<View style={styles.filterView}>
							<View style={styles.filterInput}>
								<SearchInput
									label="Search"
									name="searchText"
									keyboardType="default"
									placeholder="Search"
									style={styles.input}
									textColor={colors.greyedPurple}
									value={searchText}
									onChange={onSearchChange}
								/>
							</View>
							<TouchableOpacity style={isFilterVisible ? styles.selectedFilterBtn : styles.filterBtn} onPress={()=>setIsFilterVisible(!isFilterVisible)}>
								<Octicons 
									name="settings"
									size={24}
									color={isFilterVisible ? colors.white : colors.purple}
								/>
							</TouchableOpacity>
						</View>
						{isFilterVisible && <MerchantTransactionsFilter onClear={clearSearchText}/>}
						<MerchantTransactionList data={filteredApiData} onSelect={viewDetail} />
					</View>
				</ScrollView>
			</View>
			<TouchableOpacity onPress={onPressScan} 
				style={styles.scanButton}>
				<Image
					source={require('../../../assets/images/qr_code_merchant.png')}
					containerStyle={styles.qrIcon}
				/>
				<Text style={styles.scanBtnText}>{Translation.BUTTON.RECEIVE_OR_SCAN}</Text>
			</TouchableOpacity>
			{isDetailViewOpen && <TransactionDetail visible={isDetailViewOpen} data={selectedItem} onConfirm={onConfirm} />}
			{isDwollaVisible && (
				<DwollaDialog title={Translation.BANK_ACCOUNT.USE_DWOLLA_BUSINESS} visible={isDwollaVisible} onClose={onClose} />
			)}
			{(isPayment) && (
				<Dialog visible={isPayment} onClose={onClose} backgroundStyle={styles.dialog}>
					<View style={dialogViewBase}>
						<View style={styles.dialogWrap}>
							<Text style={styles.dialogHeader}>{Translation.PAYMENT.PAYMENT_NO_BANK_TITLE}</Text>
							<Text style={styles.mainTextColor}>{Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL}</Text>
						</View>
						<View style={styles.dialogBottom}>
							<Button
								type={BUTTON_TYPES.PURPLE}
								title={Translation.BUTTON.LINK_BUSINESS_BANK}
								onPress={selectBank}
							/>
						</View>
					</View>
				</Dialog>
			)}

			<SettingDialog
				visible={isSetting}
				onCancel={() => setIsSetting(false)}
				description={Translation.OTHER.NO_CAMERA_PERMISSION_DETAIL}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	mainTextColor: {
		color: colors.purple,
	},
	content: { paddingBottom: 100 },
	inlineView: {flexDirection: 'row'},
	headerText: {
		color: colors.purple,
		fontSize: 40,
		lineHeight: 45
	},
	amountView: {
		borderBottomColor: colors.purple,
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 2,
		marginBottom: 10
	},
	amountTxt: {
		color: colors.purple,
		fontSize: 18,
		fontFamily: FontFamily.bold,
		paddingLeft: 5,
		paddingRight: 5
	},
	alertView: {
		borderLeftWidth: 5,
		borderRadius: 4,
		borderLeftColor: colors.alert,
		backgroundColor: colors.white,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10
	},
	alertIcon: {
		color: colors.alert,
		fontWeight: 'bold'
	},
	alertText: {
		color: colors.black, 
		width: '90%'
	},
	bodyText: {
		paddingVertical: 10
	},
	filterView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	filterInput: {
		flex: 1,
		marginRight: 10
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	dialog: {
		backgroundColor: colors.overlayPurple
	},
	dialogWrap: {
		paddingHorizontal: 10,
		flex: 1
	},
	dialogHeader: {
		fontSize: 30,
		lineHeight: 32,
		marginTop: 20,
		marginBottom: 10,
		color: colors.purple
	},
	dialogBottom: {
		paddingTop: 20,
	},
	filterBtn: {
		width: 55,
		height: 55,
		marginTop: 8,
		borderRadius: 3,
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center'
	},
	selectedFilterBtn: {
		width: 55,
		height: 55,
		marginTop: 8,
		borderRadius: 3,
		backgroundColor: colors.purple,
		alignItems: 'center',
		justifyContent: 'center'
	},
	qrIcon: {
		width: 24,
		height: 24,
		marginRight: 20
	},
	scanButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '90%',
		height: 55,
		position: 'absolute',
		bottom: 45,
		color: colors.white,
		backgroundColor: colors.purple,
		alignSelf: 'center',
		borderRadius: 30
	},
	scanBtnText: {
		color: colors.white
	},
	infoView: {
		paddingHorizontal: 5,
		paddingTop: 30
	},
	detailView: {
		flexDirection: 'row', 
		justifyContent: 'space-between'
	},
	detailText: {
		fontSize: 10,
		marginHorizontal: 10,
		color: colors.bodyText
	},
	minusText: {
		color: colors.darkRed,
		textAlign: 'center',
		fontSize: 10
	},
	plusText: {
		color: colors.purple,
		textAlign: 'center',
		fontSize: 10
	},
	amountText: {
		fontFamily: FontFamily.bold,
		fontSize: 32,
		lineHeight: 35
	},
	dialogHeight: {
		height: 270
	}
});

export default MerchantDashboard