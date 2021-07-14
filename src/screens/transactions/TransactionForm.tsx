import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { useMarketEntry, useShares, useTransaction, useWallet } from "src/hooks";
import { BackBtn, BorderedInput, Button, CancelBtn, ModalHeader, OwnedShareCard } from "src/shared/uielements";
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { colors } from "src/theme/colors";
import { modalBaseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import { formatValue, makeId } from "src/utils/common";
import { OrderType } from "src/utils/types";

const styles = StyleSheet.create({
	header: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingBottom: 20
	},
	form: {
		paddingTop: 20
	},
	row: {
		padding: 3,
		paddingHorizontal: 15,
		flexDirection: "row"
	},
	totalTexts: {
		color: colors.brown,
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20
	}
});

const CONTROLLED_VALUE = 5000;

const TransactionForm = (props: any) => {
	const [quantityValid, setQuantityValid] = useState(true);
	const { getByMarketEntryId } = useShares();
	const { wallet } = useWallet();
	const { get } = useMarketEntry();
	const { update } = useTransaction();
	const [state, setState] = useState({
		quantity: '0',
		price: '0'
	});

	const { orderId, share, onClose, showBack } = props.route.params;
	const marketEntry = get(orderId);
	const ownedShare = getByMarketEntryId(orderId);

	useEffect(() => {
		setState({
			quantity: share.quantity.toString(),
			price: share.price.toString()
		})
		update({ id: makeId(), price: share.price, quantity: share.quantity, type: share.type });
	}, [share]);

	const onValueChange = (name: any, change: any) => {
		setState({
			...state,
			[name]: change
		} as any);
		update({ [name]: parseFloat(change) })
	}

	const calculateTotal = () => {
		return parseInt(state.quantity)*parseFloat(state.price);
	}

	const calculateFee = () => {
		return calculateTotal()*0.01;
	}

	const onConfirmPinSuccess = () => {
		if (share.type === OrderType.SELL && calculateTotal() > CONTROLLED_VALUE) {
			props.navigation.navigate('SellTransactionTwoFactor');
			return;
		}
		props.navigation.navigate(share.type === OrderType.SELL ? 'SellTransactionComplete' : 'BuyTransactionComplete');
	}

	const onSuccess = async () => {
		switch (share.type) {
			case OrderType.SELL:
				if (ownedShare && ownedShare.quantity < parseInt(state.quantity)) {
					setQuantityValid(false);
					return;
				}
				props.navigation.navigate('SellTransactionConfirmPin', { onSuccess: onConfirmPinSuccess })
				return;
			case OrderType.BUY:
				if (calculateTotal() > wallet.amount) {
					props.navigation.navigate('BuyTransactionAddCash');
					return;
				}
				props.navigation.navigate('BuyTransactionConfirmPin', { onSuccess: onConfirmPinSuccess });
		}
	}

	const headerProps: any = {};
	if (showBack) {
		headerProps.leftComponent = (
			<BackBtn />
		)
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader
				{...headerProps}
				rightComponent={<CancelBtn onClick={onClose} />}
			/>
			<ScrollView style={{ ...wrappingContainerBase }}>
				<View style={{ padding: 0}}>
					<View style={{ paddingBottom: 0 }}>
						<Text style={modalBaseHeader}>{share.type === OrderType.SELL ? 'Sell' : 'Buy'} {marketEntry?.name}</Text>

						{share.type === OrderType.SELL && marketEntry && (<OwnedShareCard share={ownedShare} marketEntry={marketEntry} />)}

						<View style={styles.form}>
							{share.type === OrderType.SELL && (<Text h3>Edit these to place an ask order</Text>)}
							{share.type === OrderType.BUY && (<Text h3>Change these to place a bid order</Text>)}
							{!quantityValid && (<Text h3 style={{ color: colors.textWarning }}>Number of shares shouldn't exceed possessed amount</Text>)}
							<BorderedInput
								label="Number of shares"
								keyboardType="number-pad"
								name="quantity"
								value={state.quantity}
								onChange={onValueChange}
							/>

							<BorderedInput
								label="Price per share"
								keyboardType="number-pad"
								name="price"
								prefix="CHF"
								value={state.price}
								onChange={onValueChange}
							/>
						</View>
						<View style={styles.row}>
							<Text style={{ opacity: 0.6, flex: 1 }}>Transaction fee</Text>
							<Text style={{ opacity: 0.6 }}>{formatValue(calculateFee())}</Text>
						</View>
						<View style={styles.row}>
							<Text style={{ ...styles.totalTexts, flex: 1 }}>Total</Text>
							<Text style={styles.totalTexts}>CHF {formatValue(calculateTotal())}</Text>
						</View>
					</View>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
				keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
			>
				<Button
					type="fluidDark"
					title={share.type === OrderType.BUY ? 'BUY NOW' : 'SELL NOW'}
					style={share.type === OrderType.BUY ? { backgroundColor: colors.textSuccess } : {}}
					onPress={onSuccess}
				/>
			</KeyboardAvoidingView>
		</View>
	)
}

export default TransactionForm