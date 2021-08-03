import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Octicons } from '@expo/vector-icons';
import { Header, Button, BackBtn, SearchInput, Dialog } from "src/shared/uielements";
import { baseHeader, viewBase, dialogViewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import MyTransactionList from './MyTransactionList';
import { MyTransactionItem } from "src/utils/types";
import transactionList from "src/mocks/transactions";

type MyTransactionsProps = {
	navigation?: any,
	route: any
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	totalAmountView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
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
	bottomView: {
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 45
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
		fontSize: 16,
		color: colors.darkRed
	},
	dialogFooter: {
		// padding: 20,
	},
});

type TransactionDetailProps = {
	visible: boolean,
	data: MyTransactionItem,
	onConfirm: ()=>void,
	onReturn: ()=>void
}

const TransactionDetail = (props: TransactionDetailProps) => {
	const {data, visible, onConfirm, onReturn} = props;

	return (
		<Dialog visible={visible}>
			<View style={dialogViewBase}>
				<ScrollView style={wrappingContainerBase}>
					<View style={ baseHeader }>
						<Text h1 style={styles.headerText}> B$ { data.amount } </Text>
					</View>
					<View style={styles.view}>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>TRANSACTION ID</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>05636826HDI934</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>TYPE</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>PURCHASE</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>DATE</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>4:22, JUN 17, 2021</Text>
						</View>
					</View>
				</ScrollView>
				<View style={styles.dialogFooter}>
					<Button
						type="transparent"
						title="I want to make a return"
						onPress={onReturn}
					/>
				</View>
			</View>
		</Dialog>
	)
}

const MyTransactionsView = (props: MyTransactionsProps) => {

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

	const onSearchChange = (name: any, change: any) => {
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
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>My Transactions</Text>
				</View>
				<View style={styles.totalAmountView}>
					<Text></Text>
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
					<TouchableOpacity style={styles.filterBtn}>
						<Octicons 
							name="settings"
							size={24}
							color={colors.text}
						/>
					</TouchableOpacity>
				</View>
				<MyTransactionList data={transactionList} onSelect={viewDetail} />
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						title="Scan to Pay or Request"
						onPress={()=>props.navigation.navigate("QRCodeScan")}
					/>
				</View>
			</KeyboardAvoidingView>
			{isDetailViewOpen && <TransactionDetail visible={isDetailViewOpen} data={selectedItem} onReturn={onReturn} onConfirm={onConfirm} />}
		</View>
	);
}

const MyTransactions = (props:MyTransactionsProps) => {
	const navigation = useNavigation();
	return <MyTransactionsView {...props} navigation={navigation} />;
}
export default MyTransactions