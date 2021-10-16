import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { colors } from "src/theme/colors";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ITransactionResponse } from "src/api/types";
import moment from 'moment';

type MyTransactionListProps = {
	data: ITransactionResponse[],
	onSelect: (item: ITransactionResponse) => void
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
	item: ITransactionResponse,
	selected: string
}

const TransactionItem = (props: MyTransactionItemProps) => {
	const {item, selected} = props;
	return (
		<View style={ selected===item.transactionHash? styles.selectedItem : styles.item }>
			<View style={styles.imageContainer}>
				<Image
					source={require("../../../assets/images/placeholder2.png")}
					containerStyle={styles.image}
				/>
				<View>
					<Text>name</Text>
					<Text style={styles.timeText}>{item.timestamp}</Text>
				</View>
			</View>
			<Text style={styles.amountText}>-B$ {item.value}</Text>
		</View>
	);
}

const MyTransactionList = (props: MyTransactionListProps): JSX.Element => {

	const [list, setList] = useState<ITransactionResponse[]>([]);
	const [selected, setSelected] = useState<string>("");

	useEffect(() => {
		const data: ITransactionResponse[] = props.data;

		if (!data) {
			return;
		}

		data.sort(function(a: ITransactionResponse, b: ITransactionResponse) {
			if (moment(a.timestamp).isAfter(b.timestamp)) return -1;
			else if (moment(a.timestamp).isBefore(b.timestamp)) return 1;
			else return 0;
		});

		setList(data);
	}, [props.data]);

	const handleSelect = (item: ITransactionResponse) => {
		setSelected(item.transactionHash);
		props.onSelect(item);
	}

	return (
		<View style={styles.listView}>
		{
			list.map((item: ITransactionResponse, i: number) => 
				<TouchableOpacity onPress={()=>handleSelect(item)} key={i}>
					<TransactionItem item={item} selected={selected} />
				</TouchableOpacity>
			)
		}
		</View>
	);
}

export default MyTransactionList