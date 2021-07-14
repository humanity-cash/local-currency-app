import { AntDesign } from "@expo/vector-icons";
import moment from 'moment';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Image, Text } from "react-native-elements";
import { useModalStatusBar, useWallet } from "src/hooks";
import { CancelBtn, Header, Modal, ModalHeader, TransactionDetails } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { modalViewBase, viewBase, walletHeader } from "src/theme/elements";
import { formatValue } from "src/utils/common";
import { Transaction, TransactionType } from "src/utils/types";
import AddCashTransaction from "./AddCashTransaction";
import WithdrawTransaction from "./WithdrawTransaction";

type WalletProps = {
	navigation?: any,
	route: any
}

const styles = StyleSheet.create({
	headerView: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		color: colors.white,
		marginBottom: 0
	},
	headerTextView: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 16,
		color: colors.lightBrown
	},
	codeView: {
		backgroundColor: colors.lightBg,
		minHeight: '100%',
		padding: 10,
		paddingTop: 30,
		paddingBottom: 40
	},
	view: {
		marginTop: 5,
		backgroundColor: colors.text,
		padding: 0,
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	text: {
		fontSize: 20,
		lineHeight: 60,
		paddingLeft: 10,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
		color: colors.white
	},
	arrow: {
		marginVertical: 15
	},
	sectionHeader: {
		fontSize: 20,
		lineHeight: 60,
		paddingLeft: 10,
		paddingTop: 20,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	transaction: {
		backgroundColor: colors.white,
		padding: 15,
		marginBottom: 2,
	},
	transactionsDay: {
		marginTop: 20
	},
	transactionEntry: {
		flexDirection: "row",
		paddingVertical: 7
	},
	transactionTitle: {
		fontSize: 16,
		lineHeight: 16,
		flex: 1,
		textAlignVertical: "center"
	},
	transactionValue: {
		lineHeight: 16
	},
	modalWrap: {
		paddingHorizontal: 10,
		paddingTop: 60,
		height: '100%',
		flex: 1
	},
	modalHeader: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 16,
		marginBottom: 10,
		textAlign: "center",
		opacity: 0.6
	},
	modalTitle: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingHorizontal: '20%',
		marginTop: 50,
		marginBottom: 10,
		textAlign: "center",
	},
	modalPrice: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingHorizontal: '20%',
		marginBottom: 10,
		textAlign: "center",
	},
	emptyListText: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 16,
		textAlign: "center"
	},
	image: {
		alignSelf: "center",
		width: 250,
		height: 250
	},
	imageView: {
		backgroundColor: colors.lightBg,
		alignSelf: "center",
		justifyContent: "center",
		textAlign: "center",
		flex: 1,
		width: '100%'
	}
});

const groupByDate = (data: Transaction[]) => {
	return data.reduce((list: Record<string, Transaction[]>, transaction) => {
		const date = moment(transaction.created).format('YYYY-MM-DD');
		if (!list[date]) {
			list[date] = [];
		}
		list[date].push(transaction);
		return list;
	}, {});
}

const Wallet = (props: WalletProps) => {
	const { wallet } = useWallet();
	const [visibleTransaction, setVisibleTransaction] = useState(false);
	const [withdrawTransaction, setWithdrawTransaction] = useState(false);
	const [addCashTransaction, setAddCashTransaction] = useState(false);
	const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
	const { setUseHeader } = useModalStatusBar();

	const onAddCashOpen = () => {
		setAddCashTransaction(true);
	}

	const onAddCashClose = () => {
		setAddCashTransaction(false);
	}

	const onWithdrawOpen = () => {
		setWithdrawTransaction(true);
	}
	const onWithdrawClose = () => {
		setWithdrawTransaction(false);
	}

	const reservations = groupByDate(wallet.reservations);
	const transactions = groupByDate(wallet.transactions);

	const renderTitle = (transaction: Transaction) => {
		if (transaction.type === TransactionType.ADDCASH) {
			return 'Added cash to wallet'
		}
		if (transaction.type === TransactionType.WITHDRAW) {
			return 'Withdrawed cash from wallet'
		}
		return transaction.title
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

	const onClose = () => {
		setVisibleTransaction(false);
		setCurrentTransaction(null);
		setUseHeader(false);
	}

	const onReservationAccept = () => {
		onClose();
		props.navigation.navigate('OrderStatus');
	}

	const onTransactionSelect = (transaction: Transaction) => {
		setVisibleTransaction(true);
		setCurrentTransaction(transaction);
	}

	const calculateReservations = () => {
		return formatValue(wallet.reservations.reduce((total: number, transaction: Transaction) => {
			const shares = transaction && 'shares' in transaction ? transaction.shares : 1;
			total += transaction.price * shares;
			return total;
		}, 0));
	}

	const renderTransactions = (list: Record<string, Transaction[]>) => {
		return Object.keys(list).map(dateKey => (
			<View key={`date-${dateKey}`} style={styles.transaction}>
				<Text h3>{moment(dateKey).format('dddd DD MMMM YYYY')}</Text>
				<View style={styles.transactionsDay}>
					{list[dateKey].map(transaction => (
						<TouchableWithoutFeedback key={`date-${transaction.id}`} onPress={() => onTransactionSelect(transaction)}>
							<View style={styles.transactionEntry}>
								<Text style={styles.transactionTitle}>{renderTitle(transaction)}</Text>
								<Text style={{ ...styles.transactionValue, ...setPriceColor(transaction)}}>
									{renderPrice(transaction)}
								</Text>
							</View>
						</TouchableWithoutFeedback>
					))}
				</View>
			</View>
		))
	}

	return (
		<View style={{ ...viewBase, height: '100%', backgroundColor: colors.gold }}>
			<Header
				placement="left"
				style={{ backgroundColor: colors.gold }}
				barStyle="light-content"
				rightComponent={<CancelBtn color={colors.white} text={"My wallet"} onClick={() => props.navigation.goBack()} />}
			/>
			<ScrollView style={{ flex: 1 }}>
				<View style={ { ...walletHeader, marginBottom: 0 } }>
					<Text h1 style={styles.headerView}>CHF {formatValue(wallet.amount)}</Text>
					<Text style={styles.headerTextView}>Order reservations CHF {calculateReservations()}</Text>
				</View>
				<View style={styles.codeView}>
					<TouchableWithoutFeedback onPress={onAddCashOpen}>
						<View style={styles.view}>
							<Text style={styles.text}>Add cash</Text>
							<AntDesign
								style={styles.arrow}
								name="plus"
								size={30}
								color={colors.white}
							/>
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={onWithdrawOpen}>
						<View style={[styles.view, wallet.amount === 0 ? { opacity: 0.5 } : {}]}>
							<Text style={styles.text}>Withdraw cash</Text>
							<AntDesign
								style={styles.arrow}
								name="minus"
								size={30}
								color={colors.white}
							/>
						</View>
					</TouchableWithoutFeedback>
					{wallet.reservations.length !== 0 && (
						<View>
							<Text style={styles.sectionHeader}>Order reservations</Text>
							{renderTransactions(reservations)}
						</View>
					)}
					{wallet.transactions.length !== 0 && (
						<View>
							<Text style={styles.sectionHeader}>Transaction history</Text>
							{renderTransactions(transactions)}
						</View>
					)}
					{wallet.transactions.length === 0 &&
					wallet.reservations.length === 0 && (
						<View>
							<Text style={styles.sectionHeader}>Transaction history</Text>
							<View style={styles.imageView}>
								<Image
									source={require('../../../assets/images/noorders.png')}
									containerStyle={styles.image}
								/>
								<Text style={styles.emptyListText}>No transactions yet</Text>
							</View>
						</View>
					)}
				</View>
			</ScrollView>

			{visibleTransaction && currentTransaction && (
				<Modal visible={visibleTransaction} onShow={() => setUseHeader(true)}>
					<View style={{ ...modalViewBase, height: '100%', backgroundColor: colors.white }}>
						<ModalHeader
							rightComponent={<CancelBtn onClick={onClose} />}
						/>
						<TransactionDetails
							transaction={currentTransaction}
							onReservationAccept={onReservationAccept}
						/>
					</View>
				</Modal>
			)}
			<WithdrawTransaction onClose={onWithdrawClose} visible={withdrawTransaction} />
			<AddCashTransaction onClose={onAddCashClose} visible={addCashTransaction} />
		</View>
	)
}

export default Wallet