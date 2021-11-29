import { AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import React, { useState, useContext } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Image } from "react-native-elements";
import { colors } from "src/theme/colors";
import { viewBaseB, wrappingContainerBase, baseHeader, dialogViewBase, FontFamily } from "src/theme/elements";
import { SearchInput, Header, Dialog, Button } from "src/shared/uielements";
import MerchantTransactionList from "./MerchantTransactionList";
import MerchantTransactionsFilter from "./MerchantTransactionsFilter";
import { TransactionType } from "src/utils/types";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { getBerksharePrefix } from "src/utils/common";
import DwollaDialog from './DwollaDialog';
import { BUTTON_TYPES } from "src/constants";
import moment from "moment";
import { ITransaction } from 'src/api/types';
import { WalletContext, UserContext } from "src/contexts";
import { useWallet } from "src/hooks";

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

type TransactionDetailProps = {
	visible: boolean,
	data: ITransaction,
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

const defaultTransaction = {
	transactionHash: "",
	toUserId: "",
	toAddress: "",
	toName: "",
	fromName: "",
	fromAddress: "",
	fromUserId: "",
	type: "IN",
	value: "",
	timestamp: new Date().getTime(),
	blockNumber: 0
};

const MerchantDashboard = (): JSX.Element => {
	const navigation = useNavigation();
	const { walletData  } = useContext(WalletContext);
	const { businessDwollaId } = useContext(UserContext);
	const { user } = useContext(UserContext);
	const completedCustomerVerification = user?.verifiedCustomer;
	const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>("");
	const [isDetailViewOpen, setIsDetailViewOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<ITransaction>(defaultTransaction as ITransaction);
	const [isDwollaVisible, setIsDwollaVisible] = useState<boolean>(false);
	const [isPayment, setIsPayment] = useState<boolean>(false);

	useWallet(businessDwollaId);

	const onSearchChange = (name: string, change: string) => {
		setSearchText(change);
	}

	const viewDetail = (item: ITransaction) => {
		setSelectedItem(item);
		setIsDetailViewOpen(true);
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

	const businessFundingSource = walletData?.availableFundingSource;
	const availableBalance = walletData?.availableBalance;

	return (
		<View style={viewBaseB}>
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
					<Text style={styles.amountTxt}>B$ {businessFundingSource ? availableBalance : '0'}</Text>
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

						{!businessFundingSource && walletData?.address === user?.business?.walletAddress ? (
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
										{Translation.BANK_ACCOUNT.ACCOUNT_LINK_TEXT}
										&gt;
									</Text>
								</Text>
							</View>
						): null}

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
						{isFilterVisible && <MerchantTransactionsFilter/>}
						<MerchantTransactionList onSelect={viewDetail} />
					</View>
				</ScrollView>
			</View>
			<TouchableOpacity onPress={() => { 
				businessFundingSource 
				? navigation.navigate(Routes.MERCHANT_QRCODE_SCAN) 
				: setIsPayment(true) }} 
				style={styles.scanButton}>
				<Image
					source={require('../../../assets/images/qr_code_merchant.png')}
					containerStyle={styles.qrIcon}
				/>
				<Text style={styles.scanBtnText}>{Translation.BUTTON.RECEIVE_OR_SCAN}</Text>
			</TouchableOpacity>
			{isDetailViewOpen && <TransactionDetail visible={isDetailViewOpen} data={selectedItem} onConfirm={onConfirm} />}
			{isDwollaVisible && (
				<DwollaDialog visible={isDwollaVisible} onClose={onClose} />
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
								title={Translation.BUTTON.LINK_BANK}
								onPress={selectBank}
							/>
						</View>
					</View>
				</Dialog>
			)}
		</View>
	);
}

export default MerchantDashboard