import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from "src/theme/colors";
import { getBerksharePrefix } from "src/utils/common";
import { MiniTransaction, TransactionType } from "src/utils/types";

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
	item: MiniTransaction,
	selected: string
}

const TransactionItem = (props: TransactionItemProps) => {
	const { item, selected } = props;

	const getStyle = (type: string) => {
		if (type === TransactionType.SALE || type === TransactionType.RETURN || type === TransactionType.IN || type == TransactionType.DEPOSIT) {
			return styles.plusText;
		} else {
			return styles.amountText;
		}
	}

	const name = item.type === "Withdraw" ? "Cash out to bank" : item.type === "Deposit" ? "Load up" : item.type === "OUT" ? item.toName : item.fromName;
	return (
		<View style={selected === item.transactionHash ? styles.selectedItem : styles.item}>
			<View>
				<Text style={styles.transactionType}>{name}</Text>
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
			<Text style={getStyle(item.type)}>{getBerksharePrefix(item.type)}  {item.value}</Text>
		</View>
	);
}

type MerchantTransactionListProps = {
	data?: MiniTransaction[],
	onSelect: (item: MiniTransaction) => void
}

const MerchantTransactionList = (props = {} as MerchantTransactionListProps): JSX.Element => {
	const [selected, setSelected] = useState<string>("");

	const handleSelect = (item: MiniTransaction) => {
		setSelected(item.transactionHash);
		props.onSelect(item);
	}

	return (
		<View>
			{
				props.data?.map((item: MiniTransaction, i: number) =>
					<TouchableOpacity onPress={() => handleSelect(item)} key={i}>
						<TransactionItem item={item} selected={selected} />
					</TouchableOpacity>
				)
			}
		</View>
	);
}

export default MerchantTransactionList
