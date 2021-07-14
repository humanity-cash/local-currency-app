import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useMarketEntry, useNotifications, useOrders, useShares, useTransaction, useWallet } from "src/hooks";
import { Button, CancelBtn, ModalHeader } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import { makeId } from "src/utils/common";
import { Order, OrderType, StatusType, TransactionType } from "src/utils/types";

type TransactionCompleteProps = {
	navigation?: any,
	route: any
}

const styles = StyleSheet.create({
	headerView: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		textAlign: "center"
	},
	codeView: {
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	successStatusText: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		textAlign: "center",
		color: colors.textSuccess
	},
	failedStatusText: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		textAlign: "center",
		color: colors.textWarning
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center'
	},
	image: {
		alignSelf: "center",
		width: 260,
		height: 260
	},
	imageView: {
		justifyContent: "center",
		textAlignVertical: "center",
		flex: 1
	}
});

const TransactionCompleteView = (props: TransactionCompleteProps) => {
	const { onClose, share, added, orderId, withMarketEntry } = props.route.params;
	const { addTransaction, addMoney, removeMoney } = useWallet();
	const { add: addNotification } = useNotifications();
	const { add } = useOrders();
	const { get, addOrderToEntry } = useMarketEntry();
	const { transaction } = useTransaction();
	const { getByMarketEntryId, updateShare } = useShares();
	const [ createdOrder, setCreatedOrder ] = useState<Order | null>(null);

	const marketEntry = get(orderId);

	useEffect(() => {
		const finalize = async () => {
			if (added) {
				await addMoney(parseFloat(added));
			}
			const order = {
				id: transaction.id,
				type: transaction.type,
				quantity: transaction.quantity,
				price: transaction.price,
				created: new Date(),
				status: StatusType.PROGRESS,
				name: marketEntry?.name || ''
			};
			await add(order);
			setCreatedOrder(order);

			if (withMarketEntry) {
				await addOrderToEntry(orderId, {
					type: transaction.type === OrderType.BUY ? OrderType.SELL : OrderType.BUY,
					quantity: transaction.quantity,
					price: transaction.price,
				})
			}
			if (transaction.type === OrderType.BUY) {
				await removeMoney(transaction.quantity*transaction.price);
			}
			await addTransaction({
				id: makeId(),
				title: marketEntry?.name || '',
				shares: transaction.quantity,
				price: transaction.price,
				type: (transaction.type === OrderType.BUY) ? TransactionType.BUY : TransactionType.SELL,
				created: new Date(),
			});

			if (transaction.type === OrderType.SELL) {
				const share = getByMarketEntryId(orderId);
				if (share) {
					await updateShare({ id: share.id, quantity: share.quantity - transaction.quantity });
				}
			}
			const messageAction = transaction.type === OrderType.BUY ? 'Bought' : 'Pending Sell Order'
			await addNotification({
				message: `${messageAction} ${transaction.quantity} of Company ${marketEntry?.name}`,
				redirect: 'OrderStatus'
			})
		}
		finalize();
	}, []);
	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={onClose} />}
			/>
			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ { ...baseHeader, marginTop: 20, marginBottom: 0 } }>
					{added && (<Text style={[styles.headerView, { color: colors.textSuccess}]}>Added CHF {added}</Text>)}
					<Text style={styles.headerView}>Order confirmed!</Text>
				</View>
				<View style={styles.imageView}>
					<Image
						source={require('../../../assets/images/onboarding4.png')}
						containerStyle={styles.image}
					/>
				</View>
			</View>
			<Button
				type="fluidDark"
				title="SET EXPIRATION DATE"
				style={share.type === OrderType.BUY ? { backgroundColor: colors.textSuccess } : {}}
				onPress={() => {
					if (createdOrder) {
						props.navigation.navigate(
							share.type === OrderType.SELL ? 'SellTransactionExpireDate' : 'BuyTransactionExpireDate',
							{ order: createdOrder }
						);
					}
				}}
			/>
		</View>
	);
}

const TransactionComplete = (props:TransactionCompleteProps) => {
	const navigation = useNavigation();
	return <TransactionCompleteView {...props} navigation={navigation} />;
}
export default TransactionComplete