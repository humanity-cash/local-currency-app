import React, {useState, useEffect, ReactElement} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MyTransactionItem } from "src/utils/types";

type MyTransactionListProps = {
	data: MyTransactionItem[],
	onSelect: (item: MyTransactionItem) => void
}

const styles = StyleSheet.create({
	listView: {
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5,
	},
	selectedItem: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5,
		backgroundColor: colors.card
	},
	imageContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		alignSelf: "center",
		width: 60,
		height: 60,
		borderRadius: 30
	},
	timeText: {
		fontSize: 10,
		color: colors.darkGreen
	},
	amountText: {
		fontWeight: 'bold',
		fontSize: 18,
		color: colors.darkRed
	},
});

type MyTransactionItemProps = {
	item: MyTransactionItem,
	selected: number
}

const TransactionItem = (props: MyTransactionItemProps) => {
	const {item, selected} = props;
	return (
		<View style={ selected===item.transactionId? styles.selectedItem : styles.item }>
			<View style={styles.imageContainer}>
				<Image
					source={require("../../../assets/images/placeholder2.png")}
					containerStyle={styles.image}
				/>
				<View>
					<Text>{item.name}</Text>
					<Text style={styles.timeText}>2:51, JUN 16, 2021</Text>
				</View>
			</View>
			<Text style={styles.amountText}>-B$ {item.amount}</Text>
		</View>
	);
}

const MyTransactionList = (props: MyTransactionListProps): ReactElement => {

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
		<View style={styles.listView}>
		{
			list.map((item: MyTransactionItem, i: number) => 
				<TouchableOpacity onPress={()=>handleSelect(item)} key={i}>
					<TransactionItem item={item} selected={selected} />
				</TouchableOpacity>
			)
		}
		</View>
	);
}

export default MyTransactionList