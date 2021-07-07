import moment from "moment";
import React from 'react';
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";
import { formatValue } from "src/utils/common";
import { OrderTransaction, Transaction, TransactionType } from "src/utils/types";
import Button from "./Button";

interface TransactionDetailsProps {
	transaction: Transaction,
	onReservationAccept: () => void
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		paddingTop: 60,
		height: '100%',
		flex: 1
	},
	header: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 16,
		marginBottom: 10,
		textAlign: "center",
		opacity: 0.6
	},
	title: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingHorizontal: '20%',
		marginTop: 50,
		marginBottom: 10,
		textAlign: "center",
	},
	price: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingHorizontal: '20%',
		marginBottom: 10,
		textAlign: "center",
	},
	detailsView: {
		flexDirection: "row",
		marginVertical: 20,
		paddingHorizontal: 20,
	},
	gridView: {
		flex: 1,
		alignItems: "center"
	},
	boldText: {
		fontFamily: 'IBMPlexSansSemiBold',
	},
	transferView: {
		flex: 1,
		alignItems: "center",
		marginTop: 10
	}
})

const TransactionDetails = (props: TransactionDetailsProps) => {
	const renderTitle = (transaction: Transaction) => {
		switch (transaction.type) {
			case TransactionType.ADDCASH:
				return 'Added cash to wallet'
			case TransactionType.WITHDRAW:
				return 'Withdrawed cash from wallet'
			case TransactionType.SELL:
				return `Sold ${(transaction as OrderTransaction).shares} ${(transaction as OrderTransaction).shares === 1 ? 'share' : 'shares'} ${(transaction as OrderTransaction).title}`
			case TransactionType.BUY:
				return `Purchased ${(transaction as OrderTransaction).shares} ${(transaction as OrderTransaction).shares === 1 ? 'share' : 'shares'} ${(transaction as OrderTransaction).title}`
			case TransactionType.RESERVATION:
				return `Bid order ${(transaction as OrderTransaction).shares} ${(transaction as OrderTransaction).shares === 1 ? 'share' : 'shares'} ${(transaction as OrderTransaction).title}`
		}
	}

	const renderHeader = (transaction: Transaction) => {
		switch (transaction.type) {
			case TransactionType.ADDCASH:
			case TransactionType.WITHDRAW:
				return 'Cash transfer'
			case TransactionType.SELL:
			case TransactionType.BUY:
				return 'Transaction'
			case TransactionType.RESERVATION:
				return 'Reservation'
		}
	}

	const renderPrice = (transaction: Transaction) => {
		const shares = transaction && 'shares' in transaction ? transaction.shares : 1;
		switch (transaction.type) {
			case TransactionType.ADDCASH:
			case TransactionType.SELL:
				return `+${formatValue(transaction.price*shares)}`
			case TransactionType.WITHDRAW:
			case TransactionType.BUY:
			case TransactionType.RESERVATION:
				return `-${formatValue(transaction.price*shares)}`
		}
	}

	const setPriceColor = (transaction: Transaction) => {
		switch (transaction.type) {
			case TransactionType.ADDCASH:
			case TransactionType.SELL:
				return { color: colors.textSuccess}
			case TransactionType.WITHDRAW:
			case TransactionType.BUY:
			case TransactionType.RESERVATION:
				return { color: colors.textWarning}
		}
	}

	const renderDetails = (transaction: Transaction) => {
		switch (transaction.type) {
			case TransactionType.ADDCASH:
			case TransactionType.WITHDRAW:
				return (
					<View style={styles.transferView}>
						<Text h3>{transaction.type === TransactionType.ADDCASH ? 'From' : 'To'} bank account: NL 12 ABCD 1234 5678 90</Text>
					</View>
				)
			case TransactionType.SELL:
			case TransactionType.BUY:
			case TransactionType.RESERVATION:
				return (
					<View style={styles.detailsView}>
						<View style={styles.gridView}>
							<Text h3>{transaction.type === TransactionType.SELL ? 'offered' : 'wanted'}</Text>
							<Text style={styles.boldText}>{(transaction as OrderTransaction).shares} shares</Text>
						</View>
						<View style={styles.gridView}>
							<Text h3>{transaction.type === TransactionType.SELL ? 'ask' : 'bid'} per share</Text>
							<Text style={styles.boldText}>{formatValue(transaction.price)}</Text>
						</View>
						<View style={styles.gridView}>
							<Text h3>Total {transaction.type === TransactionType.SELL ? 'ask' : 'bid'} price</Text>
							<Text style={styles.boldText}>{formatValue(transaction.price*(transaction as OrderTransaction).shares)}</Text>
						</View>
					</View>
				)
		}
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={styles.container}>
				<Text style={styles.header}>{renderHeader(props.transaction)}</Text>
				<Text h3 style={{ textAlign: "center" }}>
					{moment(props.transaction.created).format('dddd DD MMMM YYYY - hh:mm')}
				</Text>
				<Text style={styles.title}>{renderTitle(props.transaction)}</Text>
				<Text style={{ ...styles.price, ...setPriceColor(props.transaction)}}>
					CHF {renderPrice(props.transaction)}
				</Text>
				{renderDetails(props.transaction)}
			</View>
			{props.transaction.type === TransactionType.RESERVATION &&(
				<Button
					type="fluidDark"
					title="OPEN ORDER STATUS"
					onPress={props.onReservationAccept}
				/>
			)}
		</View>
	)
}

export default TransactionDetails;