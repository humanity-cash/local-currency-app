import React, {useState, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, ImageRequireSource } from 'react-native';
import { Text, Image } from 'react-native-elements';
import moment from 'moment';
import { Header, Button, BackBtn, SearchInput, Dialog } from "src/shared/uielements";
import { baseHeader, viewBase, dialogViewBase, wrappingContainerBase } from "src/theme/elements";
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
		backgroundColor: colors.inputBg
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
	amountText: {
		fontWeight: 'bold',
		fontSize: 18
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
					source={{ uri: item.avatar }}
					containerStyle={styles.image}
				/>
				<Text>{item.name}</Text>
			</View>
			<Text style={styles.amountText}>+B$ {item.amount}</Text>
		</View>
	);
}

const MyTransactionList = (props: MyTransactionListProps) => {

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
			list.map((item: MyTransactionItem, i: any) => 
				<TouchableOpacity onPress={()=>handleSelect(item)} key={i}>
					<TransactionItem item={item} selected={selected} />
				</TouchableOpacity>
			)
		}
		</View>
	);
}

export default MyTransactionList