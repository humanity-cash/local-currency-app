import { useNavigation } from "@react-navigation/native";
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from "react-native-elements";
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { useBusinessWallet } from "src/hooks";
import { viewBaseB, wrappingContainerBase, baseHeader, dialogViewBase } from "src/theme/elements";
import { SearchInput, Dialog, CancelBtn } from "src/shared/uielements";
import CashierTransactionList from "./CashierTransactionList";
import Translation from 'src/translation/en.json';
import { TransactionType } from "src/utils/types";
import { getBerksharePrefix } from "src/utils/common";
import moment from "moment";

import { ITransaction } from 'src/api/types';
import { TransactionState } from 'src/store/transaction/transaction.reducer';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store';

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
	balanceText: {
		color: colors.purple,
		fontSize: 18,
		fontFamily: 'GothamBold',
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
		fontFamily: 'GothamBold',
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
		if (type === TransactionType.SALE || type === TransactionType.RETURN) {
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
							<Text style={styles.detailText}>
								{data.type}
							</Text>
						</View>
						<View style={styles.detailView}>
							<Text style={styles.detailText}>DATE</Text>
							<Text style={styles.detailText}>
								{moment(data.timestamp).format('HH:mm, MMM D, YYYY')}
							</Text>
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
	fromAddress: "",
	fromUserId: "",
	type: "",
	value: "",
	timestamp: new Date().getTime(),
	blockNumber: 0
};

const CashierTransactions = (): JSX.Element => {
	const navigation = useNavigation();
	const { wallet } = useBusinessWallet();
	const [searchText, setSearchText] = useState<string>("");
	const [isDetailViewOpen, setIsDetailViewOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<ITransaction>(defaultTransaction);

	const { businessTransactions } = useSelector((state: AppState) => state.transactionReducer) as TransactionState;

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

	return (
		<View style={viewBaseB}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={() => navigation.goBack()} />}
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
							<Text style={styles.balanceText}>B$ {wallet.availableBalance}</Text>
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
				<CashierTransactionList data={businessTransactions} onSelect={viewDetail} />
			</ScrollView>
			{isDetailViewOpen && <TransactionDetail visible={isDetailViewOpen} data={selectedItem} onConfirm={onConfirm} />}
		</View>
	);
}

export default CashierTransactions