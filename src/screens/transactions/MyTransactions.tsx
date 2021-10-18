import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from 'src/auth';
import { useLoadingModal, usePersonalWallet } from 'src/hooks';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { Octicons } from '@expo/vector-icons';
import { Header, Button, BackBtn, SearchInput, Dialog } from "src/shared/uielements";
import { baseHeader, viewBase, dialogViewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import MyTransactionList from './MyTransactionList';
import MyTransactionFilter from './MyTransactionsFilter';
import QRCodeGen from "src/screens/payment/QRCodeGen";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { getBerksharePrefix } from "src/utils/common";
import { TransactionType, LoadingScreenTypes } from "src/utils/types";

import { ITransaction } from 'src/api/types';
import { loadPersonalTransactions } from 'src/store/transaction/transaction.actions';
import { TransactionState } from 'src/store/transaction/transaction.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from 'src/store';
import moment from 'moment';

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
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.darkGreen
	},
	amountText: {
		fontFamily: 'GothamBold',
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
		fontFamily: 'GothamBold',
		fontSize: 32,
		lineHeight: 32,
		color: colors.darkRed,
		textAlign: 'center'
	},
	plusText: {
		fontFamily: 'GothamBold',
		fontSize: 32,
		lineHeight: 32,
		color: colors.darkGreen,
		textAlign: 'center'
	},
	dialogHeight: {
		height: 250
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
				{/* <View>
					<Button
						type={BUTTON_TYPES.TRANSPARENT}
						title={Translation.BUTTON.WANT_RETURN}
						textStyle={styles.returnText}
						onPress={onReturn}
					/>
				</View> */}
			</View>
		</Dialog>
	)
}

const defaultTransaction = {
	transactionHash: "",
	toUserId: "",
	toAddress: "",
	fromAddress: "",
	fromUserId: "",
	type: "",
	value: "",
	timestamp: new Date().getTime(),
	blockNumber: 0
};

const MyTransactions = (): JSX.Element => {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const { customerDwollaId } = useContext(AuthContext);
	const { updateLoadingStatus } = useLoadingModal();
	const { wallet } = usePersonalWallet();
	const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>("");
	const [isDetailViewOpen, setIsDetailViewOpen] = useState<boolean>(false);
	const [isReturnViewOpen, setIsReturnViewOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<ITransaction>(defaultTransaction);

	const { personalTransactions } = useSelector((state: AppState) => state.transactionReducer) as TransactionState;
	

	useEffect(() => {
		if (customerDwollaId) {
			(async () => {
				updateLoadingStatus({
					isLoading: true,
					screen: LoadingScreenTypes.LOADING_DATA
				});
				await dispatch(loadPersonalTransactions(customerDwollaId));
				updateLoadingStatus({
					isLoading: false,
					screen: LoadingScreenTypes.LOADING_DATA
				});
			})();
		}
	}, []);

	const onSearchChange = (name: string, change: string) => {
		setSearchText(change);
	}

	const viewDetail = (item: ITransaction) => {
		setSelectedItem(item);
		setIsDetailViewOpen(true);
	}

	const onReturn = () => {
		setIsDetailViewOpen(false);
		setIsReturnViewOpen(true);
	}

	const onClose = () => {
		setIsDetailViewOpen(false);
		setIsReturnViewOpen(false);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn text="Home" onClick={() => navigation.goBack()} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={styles.content}>
					<View style={baseHeader}>
						<Text style={styles.headerText}>{Translation.PAYMENT.MY_TRANSACTIONS}</Text>
					</View>
					<View style={styles.totalAmountView}>
						<Text style={styles.amountText}>B$ {wallet.availableBalance}</Text>
					</View>
					
					<ScrollView>
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
						{isFilterVisible && <MyTransactionFilter></MyTransactionFilter>}
						<MyTransactionList data={personalTransactions} onSelect={viewDetail} />
					</ScrollView>
				</View>
			</View>

			<TouchableOpacity onPress={()=>navigation.navigate(Routes.QRCODE_SCAN)} style={styles.scanButton}>
				<Image
					source={require('../../../assets/images/qr_code_consumer.png')}
					containerStyle={styles.qrIcon}
				/>
				<Text style={styles.scanBtnText}>{Translation.PAYMENT.SCAN_TO_PAY_REQUEST}</Text>
			</TouchableOpacity>

			{isDetailViewOpen && <TransactionDetail visible={isDetailViewOpen} data={selectedItem} onReturn={onReturn} onClose={onClose} />}
			{isReturnViewOpen && <QRCodeGen visible={isReturnViewOpen} onClose={onClose} isOpenAmount={true} amount={Number(selectedItem.value)} /> }
		</View>
	);
}

export default MyTransactions