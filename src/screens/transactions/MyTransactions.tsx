import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useStore } from 'react-hookstore';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { TransactionsAPI } from 'src/api';
import { ITransaction } from 'src/api/types';
import { BUTTON_TYPES } from 'src/constants';
import { UserContext, WalletContext } from "src/contexts";
import { createFuseSearchInstance } from 'src/fuse';
import { CUSTOMER_TX_FILTERS_STORE } from 'src/hook-stores';
import * as Routes from 'src/navigation/constants';
import DataLoading from 'src/screens/loadings/DataLoading';
import PaymentRequestSuccess from 'src/screens/payment/PaymentRequestSuccess';
import { BackBtn, Button, Dialog, Header, SearchInput } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, dialogViewBase, FontFamily, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { getBerksharePrefix } from "src/utils/common";
import { CustomerTxFilterStore, MiniTransaction, TransactionType } from "src/utils/types";
import MyTransactionList from './MyTransactionList';
import MyTransactionFilter from './MyTransactionsFilter';
import ReturnQRCodeGen from './ReturnQRCodeGen';

const styles = StyleSheet.create({
	content: {
		flex: 1,
		paddingBottom: 100
	},
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 35
	},
	totalAmountView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
		paddingBottom: 5,
		borderBottomWidth: 1,
		borderBottomColor: colors.darkGreen
	},
	amountText: {
		fontFamily: FontFamily.bold,
		fontWeight: 'bold',
		fontSize: 18
	},
	filterView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	filterInput: {
		flex: 1,
		marginRight: 10
	},
	filterBtn: {
		width: 55,
		height: 55,
		marginTop: 8,
		borderRadius: 3,
		backgroundColor: colors.inputBg,
		alignItems: 'center',
		justifyContent: 'center'
	},
	selectedFilterBtn: {
		width: 55,
		height: 55,
		marginTop: 8,
		borderRadius: 3,
		backgroundColor: colors.darkGreen,
		alignItems: 'center',
		justifyContent: 'center'
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
		backgroundColor: colors.darkGreen,
		alignSelf: 'center',
		borderRadius: 30
	},
	scanBtnText: {
		color: colors.white
	},
	qrIcon: {
		width: 24,
		height: 24,
		marginRight: 20
	},
	headerView: {
		marginTop: 20,
		marginBottom: 40
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
	returnText: {
		color: colors.darkRed
	},
	minusText: {
		fontFamily: FontFamily.bold,
		fontSize: 32,
		lineHeight: 32,
		color: colors.darkRed,
		textAlign: 'center'
	},
	plusText: {
		fontFamily: FontFamily.bold,
		fontSize: 32,
		lineHeight: 32,
		color: colors.darkGreen,
		textAlign: 'center'
	},
	dialogHeight: {
		height: 300
	}
});

type TransactionDetailProps = {
	visible: boolean,
	data: ITransaction,
	onClose: ()=>void,
	onReturn: ()=>void
}

const TransactionDetail = (props: TransactionDetailProps) => {
	const {data, visible, onClose } = props;

	const getStyle = (type: string) => {
		if (type === TransactionType.SALE || type === TransactionType.RETURN || type === TransactionType.IN) {
			return styles.plusText;
		} else {
			return styles.minusText;
		}
	}

	return (
		<Dialog visible={visible} onClose={onClose} style={styles.dialogHeight}>
			<View style={dialogViewBase}>
				<ScrollView style={wrappingContainerBase}>
					<View style={styles.headerView}>
						<Text style={getStyle(data.type)}> {getBerksharePrefix(data.type)} {data.value} </Text>
					</View>

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
				</ScrollView>
				{TransactionType.OUT === data.type && (
					<View>
						<Button
							type={BUTTON_TYPES.TRANSPARENT}
							title={Translation.BUTTON.WANT_RETURN}
							textStyle={styles.returnText}
							onPress={props.onReturn}
						/>
					</View>
				)}
			</View>
		</Dialog>
	)
}

const options = {
  includeScore: false,
  keys: ['toName', 'fromName', 'value']
}

const MyTransactions = (): JSX.Element => {
	const [{ selectedType,
		startDate,
		endDate,
	}] = useStore<CustomerTxFilterStore>(CUSTOMER_TX_FILTERS_STORE)
	const navigation = useNavigation();
	const { customerDwollaId } = useContext(UserContext);
	const { customerWalletData } = useContext(WalletContext);
	const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>("");
	const [isDetailView, setIsDetailView] = useState<boolean>(false);
	const [isReturnView, setIsReturnView] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<ITransaction>({} as ITransaction);
	const [isRequestSuccess, setIsRequestSuccess] = useState<boolean>(false);
	const [isLoading, setIsLoading]= useState<boolean>(false);
	const [receivedAmount, setReceivedAmount] = useState<number>(0);
	const [apiData, setAPIData] = useState<MiniTransaction[]>([]);
	const [ filteredData, setFilteredData] = useState<MiniTransaction[]>([]);
	const fuseInstance = createFuseSearchInstance(filteredData, options)

	useEffect(() => {
		filterData()
	}, [startDate, endDate, selectedType, searchText])

	useEffect(() => {
		if (customerDwollaId) {
			const handler = async () => {
				setIsLoading(true);
				const txs = await TransactionsAPI.getAllTransactions(customerDwollaId)
				setAPIData(txs);
				setFilteredData(txs);
				setIsLoading(false);
			};
			handler();
		}
	}, [customerDwollaId]);

	const filterData = () => {
		let data = apiData

		// filter by date
		data = data.reduce<MiniTransaction[]>((acc, curr) => {
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

		// filter by name
		const fuseResult = fuseInstance.search(searchText)
		data = fuseResult.map(i => i.item)

		// filter by type <-- to do

		setFilteredData(data)
	}

	const onSearchChange = (name: string, change: string) => {
		if(!change){
			setFilteredData(apiData)
			setSearchText(change);
			return
		}
		const fuseResult = fuseInstance.search(change)
		setFilteredData(fuseResult.map(i => i.item))
		setSearchText(change);
	}

	const viewDetail = (item: ITransaction) => {
		setSelectedItem(item);
		setIsDetailView(true);
	}

	const onReturn = () => {
		setIsDetailView(false);
		setIsReturnView(true);
	}

	const onSuccess = (amount: number) => {
		setReceivedAmount(amount);
		setIsReturnView(false);
		setIsRequestSuccess(true);
	}

	const onConfirm = () => {
		setIsRequestSuccess(false);
	}

	const onClose = () => {
		setIsDetailView(false);
		setIsReturnView(false);
		setIsRequestSuccess(false);
	}

	return (
		<View style={viewBase}>
			<DataLoading visible={isLoading}/>
			<Header
				leftComponent={<BackBtn text="Home" onClick={() => navigation.goBack()} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>{Translation.PAYMENT.MY_TRANSACTIONS}</Text>
				</View>
				<View style={styles.totalAmountView}>
					<Text style={styles.amountText}>B$ {customerWalletData?.availableBalance}</Text>
				</View>
				
				<ScrollView>
					<View style={styles.content}>
						<View style={styles.filterView}>
							<View style={styles.filterInput}>
								<SearchInput
									label="Search"
									name="searchText"
									keyboardType="default"
									placeholder="Search"
									value={searchText}
									onChange={onSearchChange}
								/>
							</View>
							<TouchableOpacity style={isFilterVisible ? styles.selectedFilterBtn : styles.filterBtn} onPress={()=>setIsFilterVisible(!isFilterVisible)}>
								<Octicons 
									name="settings"
									size={24}
									color={isFilterVisible ? colors.white : colors.text}
								/>
							</TouchableOpacity>
						</View>
						{isFilterVisible && <MyTransactionFilter/>}
						<MyTransactionList data={filteredData} onSelect={viewDetail} />
					</View>
				</ScrollView>
			</View>

			<TouchableOpacity onPress={()=>navigation.navigate(Routes.QRCODE_SCAN)} style={styles.scanButton}>
				<Image
					source={require('../../../assets/images/qr_code_consumer.png')}
					containerStyle={styles.qrIcon}
				/>
				<Text style={styles.scanBtnText}>{Translation.PAYMENT.SCAN_TO_PAY_REQUEST}</Text>
			</TouchableOpacity>

			{isDetailView && <TransactionDetail visible={isDetailView} data={selectedItem} onReturn={onReturn} onClose={onClose} />}
			{isReturnView && <ReturnQRCodeGen visible={isReturnView} onSuccess={onSuccess} onClose={onClose} transactionInfo={selectedItem} /> }
			{isRequestSuccess && <PaymentRequestSuccess visible={isRequestSuccess} onClose={onConfirm} amount={receivedAmount} /> }
		</View>
	);
}

export default MyTransactions