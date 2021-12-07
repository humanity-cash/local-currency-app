import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ITransaction } from 'src/api/types';
import { colors } from "src/theme/colors";
import { getBerksharePrefix } from "src/utils/common";
import { TransactionType } from "src/utils/types";

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

const MerchantTransactionList = (props = {} as MerchantTransactionListProps): JSX.Element => {
	const [selected, setSelected] = useState<string>("");

	const handleSelect = (item: ITransaction) => {
		setSelected(item.transactionHash);
		props.onSelect(item);
	}

	return (
		<View>
			{
				props.data?.map((item: ITransaction, i: number) =>
					<TouchableOpacity onPress={() => handleSelect(item)} key={i}>
						<TransactionItem item={item} selected={selected} />
					</TouchableOpacity>
				)
			}
		</View>
	);
}

export default MerchantTransactionList
