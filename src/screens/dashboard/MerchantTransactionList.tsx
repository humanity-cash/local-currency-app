import React, { useState, useEffect, useContext } from 'react';
import { TransactionState } from 'src/store/transaction/transaction.reducer';
import { AppState } from 'src/store';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TransactionType } from "src/utils/types";
import { getBerksharePrefix } from "src/utils/common";
import { ITransaction } from 'src/api/types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { WalletContext, UserContext } from 'src/contexts';
import { loadBusinessTransactions } from 'src/store/transaction/transaction.actions';
import { TransactionsAPI} from 'src/api';

const styles = StyleSheet.create({
	transactionType: {
		color: colors.purple,
		fontWeight: 'bold'
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 80,
		paddingHorizontal: 20,
		marginVertical: 5,
		backgroundColor: colors.white
	},
	selectedItem: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 80,
		paddingHorizontal: 20,
		marginVertical: 2,
		borderRadius: 3,
		backgroundColor: colors.lightPurple
	},
	timeText: {
		fontSize: 10,
		color: colors.purple
	},
	amountText: {
		fontWeight: 'bold',
		fontSize: 18,
		color: colors.darkRed
	},
	plusText: {
		fontWeight: 'bold',
		fontSize: 18,
		color: colors.purple
	},
});

type TransactionItemProps = {
	item: ITransaction,
	selected: string
}

const TransactionItem = (props: TransactionItemProps) => {
	const { item, selected } = props;
  console.log("🚀 ~ file: MerchantTransactionList.tsx ~ line 66 ~ TransactionItem ~ item", item)

	const getStyle = (type: string) => {
		if (type === TransactionType.SALE || type === TransactionType.RETURN || type === TransactionType.IN) {
			return styles.plusText;
		} else {
			return styles.amountText;
		}
	}

	return (
		<View style={selected === item.transactionHash ? styles.selectedItem : styles.item}>
			<View>
				<Text style={styles.transactionType}>
					{item.type}
				</Text>
				<Text style={styles.timeText}>{moment(item.timestamp).format('HH:mm, MMM D, YYYY')}</Text>
				<Text style={styles.timeText}>{item.type === "OUT" ? `To: ${item.toName}` : `From: ${item.fromName}`}</Text>
			</View>
			<Text style={getStyle(item.type)}>{getBerksharePrefix(item.type)}  {item.value}</Text>
		</View>
	);
}

type MerchantTransactionListProps = {
	data?: ITransaction[],
	onSelect: (item: ITransaction) => void
}

const MerchantTransactionList = (props: MerchantTransactionListProps): JSX.Element => {
	const { businessTransactions } = useSelector((state: AppState) => state.transactionReducer) as TransactionState;
	const [list, setList] = useState<ITransaction[]>([]);
	const [selected, setSelected] = useState<string>("");

	const dispatch = useDispatch();
	const { walletData } = useContext(WalletContext);
	const { businessDwollaId } = useContext(UserContext);
	useEffect(() => {
		const handler = async () => {
			if(!businessDwollaId) return
			const transactions: ITransaction[] = await TransactionsAPI.getTransactions(businessDwollaId);
			if (transactions?.length) {
				transactions.sort(function (a: ITransaction, b: ITransaction) {
					if (moment(a.timestamp).isAfter(b.timestamp)) return -1;
					else if (moment(a.timestamp).isBefore(b.timestamp)) return 1;
					else return 0;
				});
			}
			setList(transactions);
		}
		handler();

	}, [walletData, businessDwollaId]);

	const handleSelect = (item: ITransaction) => {
		setSelected(item.transactionHash);
		props.onSelect(item);
	}

	return (
		<View>
			{
				list.map((item: ITransaction, i: number) =>
					<TouchableOpacity onPress={() => handleSelect(item)} key={i}>
						<TransactionItem item={item} selected={selected} />
					</TouchableOpacity>
				)
			}
		</View>
	);
}

export default MerchantTransactionList