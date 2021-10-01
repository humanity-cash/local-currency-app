import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { Octicons } from '@expo/vector-icons';
import { Header, Button, BackBtn, SearchInput, Dialog } from "src/shared/uielements";
import { baseHeader, viewBase, dialogViewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import MyTransactionList from './MyTransactionList';
import { MyTransactionItem } from "src/utils/types";
import MyTransactionFilter from './MyTransactionsFilter';
import { consumerTransactions } from "src/mocks/transactions";
import QRCodeGen from "src/screens/payment/QRCodeGen";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';

const styles = StyleSheet.create({
	content: {
		paddingBottom: 120
	},
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 35
	},
	totalAmountView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: colors.darkGreen
	},
	amountText: {
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
	view: {
		padding: 10,
	},
	detailView: {
		flexDirection: 'row', 
		justifyContent: 'space-between'
	},
	detailText: {
		fontSize: 10,
	},
	returnText: {
		color: colors.darkRed
	}
});

const transactionData = {
	transactionId: "05636826HDI934",
	type: "PURCHASE",
	date: "4:22, JUN 17, 2021"
}

type TransactionDetailProps = {
	visible: boolean,
	data: MyTransactionItem,
	onConfirm: ()=>void,
	onReturn: ()=>void
}

const TransactionDetail = (props: TransactionDetailProps) => {
	const {data, visible, onConfirm, onReturn} = props;

	return (
		<Dialog visible={visible} onClose={onConfirm}>
			<View style={dialogViewBase}>
				<ScrollView style={wrappingContainerBase}>
					<View style={ baseHeader }>
						<Text h1 style={styles.returnText}> - B$ {data.amount} </Text>
					</View>
					<View style={styles.view}>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>{Translation.PAYMENT.TRANSACTION_ID}</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>{transactionData.transactionId}</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>TYPE</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>{transactionData.type}</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>DATE</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>{transactionData.date}</Text>
						</View>
					</View>
				</ScrollView>
				<View>
					<Button
						type={BUTTON_TYPES.TRANSPARENT}
						title={Translation.BUTTON.WANT_RETURN}
						textStyle={styles.returnText}
						onPress={onReturn}
					/>
				</View>
			</View>
		</Dialog>
	)
}

const MyTransactions = (): JSX.Element => {
	const navigation = useNavigation();
	const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false);
	const [searchText, setSearchText] = useState<string>("");
	const [selectedItem, setSelectedItem] = useState<MyTransactionItem>({
		transactionId: 0,
		avatar: "",
		name: "",
		type: "",
		amount: "",
		date: ""
	});
	const [isDetailViewOpen, setIsDetailViewOpen] = useState<boolean>(false);
	const [isReturnViewOpen, setIsReturnViewOpen] = useState<boolean>(false);

	const onSearchChange = (name: string, change: string) => {
		setSearchText(change);
	}

	const viewDetail = (item: MyTransactionItem) => {
		setSelectedItem(item);
		setIsDetailViewOpen(true);
	}

	const onReturn = () => {
		setIsDetailViewOpen(false);
		setIsReturnViewOpen(true);
	}

	const onConfirm = () => {
		setIsDetailViewOpen(false);
		setIsReturnViewOpen(false);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn text="Home" onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={styles.content}>
					<View style={baseHeader}>
						<Text style={styles.headerText}>{Translation.PAYMENT.MY_TRANSACTIONS}</Text>
					</View>
					<View style={styles.totalAmountView}>
						<Text style={styles.amountText}>B$ 382.91</Text>
					</View>
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
					<MyTransactionList data={consumerTransactions} onSelect={viewDetail} />
				</View>
			</ScrollView>

			<TouchableOpacity onPress={()=>navigation.navigate(Routes.QRCODE_SCAN)} style={styles.scanButton}>
				<Image
					source={require('../../../assets/images/qr_code_consumer.png')}
					containerStyle={styles.qrIcon}
				/>
				<Text style={styles.scanBtnText}>{Translation.PAYMENT.SCAN_TO_PAY_REQUEST}</Text>
			</TouchableOpacity>

			{isDetailViewOpen && <TransactionDetail visible={isDetailViewOpen} data={selectedItem} onReturn={onReturn} onConfirm={onConfirm} />}
			{isReturnViewOpen && <QRCodeGen visible={isReturnViewOpen} onClose={onConfirm} isOpenAmount={true} amount={"10"} /> }
		</View>
	);
}

export default MyTransactions