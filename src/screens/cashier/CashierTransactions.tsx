import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from "react-native-elements";
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseB, wrappingContainerBase, baseHeader, dialogViewBase, FontFamily } from "src/theme/elements";
import { SearchInput, Dialog, CancelBtn } from "src/shared/uielements";
import CashierTransactionList from "./CashierTransactionList";
import Translation from 'src/translation/en.json';
import { BusinessTxDataStore, BusinessTxDataStoreActions, BusinessTxDataStoreReducer, MiniTransaction, TransactionType } from "src/utils/types";
import { getBerksharePrefix, sortTxByTimestamp } from "src/utils/common";
import moment from "moment";
import { WalletContext, UserContext } from "src/contexts";
import { useStore } from "react-hookstore";
import { TransactionsAPI } from "src/api";
import { BUSINESS_TX_DATA_STORE } from "src/hook-stores";
import DataLoading from "src/screens/loadings/DataLoading";

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
		fontFamily: FontFamily.bold,
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
	data: MiniTransaction,
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

const CashierTransactions = (): JSX.Element => {
	const navigation = useNavigation();
	const [searchText, setSearchText] = useState<string>("");
	const [isDetailViewOpen, setIsDetailViewOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<MiniTransaction>({} as MiniTransaction);

	const { businessDwollaId } = useContext(UserContext)
	const { businessWalletData } = useContext(WalletContext)
	const [, dispatchApiData] = useStore<BusinessTxDataStore, BusinessTxDataStoreReducer>(BUSINESS_TX_DATA_STORE);
	const [filteredApiData, setFilteredApiData] = useState<MiniTransaction []>([]);
	const onSearchChange = (name: string, change: string) => {
		setSearchText(change);
	}

	useEffect(() => {
		const handler = async () => {
			if (!businessDwollaId) return;
			setIsLoading(true);
			const txs = await TransactionsAPI.getAllTransactions(businessDwollaId);
			const sortedTxs = sortTxByTimestamp(txs);
			dispatchApiData({ type: BusinessTxDataStoreActions.UpdateTransactions, payload: { txs: sortedTxs } });
			setFilteredApiData(sortedTxs);
			setIsLoading(false);
		}
		handler();

	}, [businessWalletData.availableBalance, businessDwollaId]);

	const viewDetail = (item: MiniTransaction) => {
		setSelectedItem(item);
		setIsDetailViewOpen(true);
	}

	const onConfirm = () => {
		setIsDetailViewOpen(false);
	}

	return (
		<View style={viewBaseB}>
			<DataLoading visible={isLoading} />
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
							<Text style={styles.balanceText}>B$ {businessWalletData?.availableBalance}</Text>
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
				<CashierTransactionList data={filteredApiData} onSelect={viewDetail} />
			</ScrollView>
			{isDetailViewOpen && <TransactionDetail visible={isDetailViewOpen} data={selectedItem} onConfirm={onConfirm} />}
		</View>
	);
}

export default CashierTransactions