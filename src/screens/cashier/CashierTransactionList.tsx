import React, {useState, useEffect, ReactElement} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MerchantTransactionItem, TransactionType, TransactionTypes } from "src/utils/types";
import { getBerksharePrefix } from "src/utils/common";

type CashierTransactionListProps = {
	data: MerchantTransactionItem[],
	onSelect: (item: MerchantTransactionItem) => void
}

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
		borderRadius: 3,
		backgroundColor: colors.white
	},
	selectedItem: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 80,
		paddingHorizontal: 20,
		marginVertical: 5,
		borderRadius: 3,
		backgroundColor: colors.greyedPurple1
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
	item: MerchantTransactionItem,
	selected: string
}

const TransactionItem = (props: TransactionItemProps) => {
	const {item, selected} = props;

	const getStyle = (type: TransactionType) => {
		if (type === TransactionType.SALE || type === TransactionType.RETURN) {
			return styles.plusText;
		} else {
			return styles.amountText;
		}
	}
	
	return (
		<View style={selected === item.transactionId ? styles.selectedItem : styles.item}>
			<View>
				<Text style={styles.transactionType}>
					{TransactionTypes[item.type]}
				</Text>
				<Text style={styles.timeText}>7 MIN AGO</Text>
			</View>
			<Text style={getStyle(item.type)}>{getBerksharePrefix(item.type)} {item.amount.toFixed(2)}</Text>
		</View>
	);
}

const CashierTransactionList = (props: CashierTransactionListProps): ReactElement => {

	const [list, setList] = useState<MerchantTransactionItem[]>([]);
	const [selected, setSelected] = useState<string>("123346595867");

	useEffect(() => {
		const data: MerchantTransactionItem[] = props.data;

		if (!data) {
			return;
		}

		data.sort(function(a: MerchantTransactionItem, b: MerchantTransactionItem) {
			if (a.date > b.date) return -1;
			if (a.date < b.date) return 1;
			return 0;
		});

		setList(data);
	}, [props.data]);

	const handleSelect = (item: MerchantTransactionItem) => {
		setSelected(item.transactionId);
		props.onSelect(item);
	}

	return (
		<View>
		{
			list.map((item: MerchantTransactionItem, i: number) => 
				<TouchableOpacity onPress={()=>handleSelect(item)} key={i}>
					<TransactionItem item={item} selected={selected} />
				</TouchableOpacity>
			)
		}
		</View>
	);
}

export default CashierTransactionList