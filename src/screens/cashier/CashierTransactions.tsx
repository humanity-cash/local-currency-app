import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from "react-native-elements";
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseB, wrappingContainerBase, baseHeader, dialogViewBase } from "src/theme/elements";
import { SearchInput, Dialog, BackBtn } from "src/shared/uielements";
import CashierTransactionList from "./CashierTransactionList";
import { merchantTransactions } from "src/mocks/transactions";
import Translation from 'src/translation/en.json';
import { MerchantTransactionItem, MerchantTransactionType } from "src/utils/types";
import { getBerksharePrefix } from "src/utils/common";

const styles = StyleSheet.create({
	mainTextColor: {
		color: colors.purple,
	},
	inlineView: {flexDirection: 'row'},
	headerText: {
		color: colors.purple,
		fontSize: 40,
		fontWeight: '400',
		lineHeight: 40
	},
	amountView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	text: {
		color: colors.purple,
		fontSize: 18,
		fontWeight: 'bold',
		paddingLeft: 5,
		paddingRight: 5
	},
	alignRight: {
		fontSize: 10,
		textAlign: 'right',
		color: colors.purple,
		paddingRight: 5
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	dialog: {
		backgroundColor: colors.overlayPurple
	},
	infoView: {
		paddingHorizontal: 5,
		paddingTop: 20
	},
	detailView: {
		flexDirection: 'row', 
		justifyContent: 'space-between'
	},
	detailText: {
		fontSize: 10,
		color: colors.bodyText
	},
	minusText: {
		color: colors.darkRed,
		textAlign: 'center'
	},
	plusText: {
		color: colors.purple,
		textAlign: 'center'
	},
	amountText: {
		fontWeight: 'bold',
		fontSize: 18
	}
});

type TransactionDetailProps = {
	visible: boolean,
	data: MerchantTransactionItem,
	onConfirm: () => void
}

const TransactionDetail = (props: TransactionDetailProps) => {
	const {data, visible, onConfirm} = props;

	const getTransactionType = (type: MerchantTransactionType) => {
		if (type === MerchantTransactionType.SALE) {
			return "Customer sale";
		} else if (type === MerchantTransactionType.PURCHASEMENT) {
			return "Purchasement";
		} else if (type === MerchantTransactionType.CASH_OUT) {
			return "Cash out";
		} else if (type === MerchantTransactionType.CUSTOMER_RETURN) {
			return "Customer return";
		} else if (type === MerchantTransactionType.TRANSFER) {
			return "Transfer";
		} else if (type === MerchantTransactionType.RETURN) {
			return "Return";
		} else {
			return "Donation";
		}
	}

	const getStyle = (type: MerchantTransactionType) => {
		if (type === MerchantTransactionType.SALE || type === MerchantTransactionType.RETURN) {
			return styles.plusText;
		} else {
			return styles.minusText;
		}
	}

	return (
		<Dialog visible={visible} onClose={onConfirm} backgroundStyle={styles.dialog}>
			<View style={dialogViewBase}>
				<ScrollView style={wrappingContainerBase}>
					<View style={ baseHeader }>
						<Text style={getStyle(data.type)}>
							{getTransactionType(data.type)}
						</Text>
						<Text h1 style={{...styles.amountText, ...getStyle(data.type)}}>
							{getBerksharePrefix(data.type)} { data.amount.toFixed(2) } 
						</Text>
					</View>
					<View style={styles.infoView}>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>{Translation.PAYMENT.TRANSACTION_ID}</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>{data.transactionId}</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>TYPE</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>{data.type}</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>DATE</Text>
							<Text style={{...styles.detailText, fontWeight: 'bold'}}>{data.date}</Text>
						</View>
					</View>
				</ScrollView>
			</View>
		</Dialog>
	)
}

const CashierTransactions = (): JSX.Element => {
	const navigation = useNavigation();
	const [searchText, setSearchText] = useState<string>("");
	const [isDetailViewOpen, setIsDetailViewOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<MerchantTransactionItem>({
		transactionId: "123457899",
		type: MerchantTransactionType.SALE,
		amount: 0,
		date: "2021-01-01"
	});

	const onSearchChange = (name: string, change: string) => {
		setSearchText(change);
	}

	const viewDetail = (item: MerchantTransactionItem) => {
		setSelectedItem(item);
		setIsDetailViewOpen(true);
	}

	const onConfirm = () => {
		setIsDetailViewOpen(false);
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View>
					<View style={baseHeader}>
						<Text style={styles.headerText}>{Translation.CASHIER.TRANSACTIONS}</Text>
					</View>
					<View style={styles.amountView}>
						<View></View>
						<View>
							<Text style={styles.alignRight}>{Translation.CASHIER.BALANCE}</Text>
							<Text style={styles.text}>B$ 382.91</Text>
						</View>
					</View>

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
				<CashierTransactionList data={merchantTransactions} onSelect={viewDetail} />
			</ScrollView>
			{isDetailViewOpen && <TransactionDetail visible={isDetailViewOpen} data={selectedItem} onConfirm={onConfirm} />}
		</View>
	);
}

export default CashierTransactions