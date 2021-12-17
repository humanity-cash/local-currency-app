import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from "src/theme/colors";
import { FontFamily } from "src/theme/elements";
import { getBerksharePrefix } from "src/utils/common";
import { MiniTransaction, TransactionType } from "src/utils/types";

type MyTransactionListProps = {
	data: MiniTransaction[],
	onSelect: (item: MiniTransaction) => void
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
	minusText: {
		fontFamily: FontFamily.bold,
		fontSize: 18,
		color: colors.darkRed
	},
	plusText: {
		fontFamily: FontFamily.bold,
		fontSize: 18,
		color: colors.darkGreen
	},
});

type MyTransactionItemProps = {
	item: MiniTransaction,
	selected: string
}

const TransactionItem = (props: MyTransactionItemProps) => {
	const {item, selected} = props;
	
	const getStyle = (type: string) => {
		if (TransactionType.SALE || type === TransactionType.RETURN || type === TransactionType.IN || type === TransactionType.DEPOSIT) {
			return styles.plusText;
		} else {
			return styles.minusText;
		}
	}

	const name = item.type === "Withdraw" ? "Cash out to bank" : item.type === "Deposit" ? "Load up" : item.type === "OUT" ? item.toName : item.fromName;
	return (
		<View style={ selected===item.transactionHash? styles.selectedItem : styles.item }>
			<View style={styles.imageContainer}>
				<Image
					source={require("../../../assets/images/placeholder5.png")}
					containerStyle={styles.image}
				/>
				<View>
					<Text>{name}</Text>
					<Text style={styles.timeText}>{moment(item.timestamp).format('HH:mm, MMM D, YYYY')}</Text>
					<Text style={styles.timeText}>
						{item.type === "IN"
							? "Transfer In"
							: item.type === "Deposit"
								? "Deposit"
								: item.type === "Withdraw"
									? "Withdraw"
									: "Transfer Out"}
					</Text>
				</View>
			</View>
			<Text style={getStyle(item.type)}>{getBerksharePrefix(item.type)} {item.value}</Text>
		</View>
	);
}

const MyTransactionList = (props: MyTransactionListProps): JSX.Element => {
	const [list, setList] = useState<MiniTransaction[]>([]);
	const [selected, setSelected] = useState<string>("");

	useEffect(() => {
		const data: MiniTransaction[] = props.data;

		if (!data) {
			return;
		}

		data.sort(function(a: MiniTransaction, b: MiniTransaction) {
			if (moment(a.timestamp).isAfter(b.timestamp)) return -1;
			else if (moment(a.timestamp).isBefore(b.timestamp)) return 1;
			else return 0;
		});

		setList(data);
	}, [props.data]);

	const handleSelect = (item: MiniTransaction) => {
		setSelected(item.transactionHash);
		props.onSelect(item);
	}

	return (
		<View style={styles.listView}>
		{
				list.map((item: MiniTransaction, i: number) =>
				<TouchableOpacity onPress={()=>handleSelect(item)} key={i}>
					<TransactionItem item={item} selected={selected} />
				</TouchableOpacity>
			)
		}
		</View>
	);
}

export default MyTransactionList