import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MyTransactionItem } from "src/utils/types";

type MerchantTransactionListProps = {
	data: MyTransactionItem[],
	onSelect: (item: MyTransactionItem) => void
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
		backgroundColor: colors.white
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
});

type TransactionItemProps = {
	item: MyTransactionItem,
	selected: number
}

const TransactionItem = (props: TransactionItemProps) => {
	const {item, selected} = props;
	return (
		<View style={ styles.item }>
			<View>
				<Text style={styles.transactionType}>{item.name}</Text>
				<Text style={styles.timeText}>7 MIN AGO</Text>
			</View>
			<Text style={styles.amountText}>-B$ {item.amount}</Text>
		</View>
	);
}

const MerchantTransactionList = (props: MerchantTransactionListProps) => {

	const [list, setList] = useState<MyTransactionItem[]>([]);
	const [selected, setSelected] = useState<number>(0);

	useEffect(() => {
		const data: MyTransactionItem[] = props.data;

		if (!data) {
			return;
		}

		data.sort(function(a: MyTransactionItem, b: MyTransactionItem) {
			if (a.date > b.date) return -1;
			if (a.date < b.date) return 1;
			return 0;
		});

		setList(data);
	}, [props.data]);

	const handleSelect = (item: MyTransactionItem) => {
		setSelected(item.transactionId);
		props.onSelect(item);
	}

	return (
		<View>
		{
			list.map((item: MyTransactionItem, i: any) => 
				<TouchableOpacity onPress={()=>handleSelect(item)} key={i}>
					<TransactionItem item={item} selected={selected} />
				</TouchableOpacity>
			)
		}
		</View>
	);
}

export default MerchantTransactionList