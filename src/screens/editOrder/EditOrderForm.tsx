import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { useOrders } from "src/hooks";
import { BlockInput, BorderedInput, Button, CancelBtn, ModalHeader } from "src/shared/uielements";
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { colors } from "src/theme/colors";
import { modalViewBase, wrappingContainerBase } from "src/theme/elements";
import { formatValue } from "src/utils/common";
import { Order, OrderType } from "src/utils/types";

type EditOrderFormProps = {
	navigation?: any,
	route?: any,
	onClose: () => void,
	order: Order
}

type EditOrderFormState = {
	day: string,
	month: string,
	year: string,
	quantity: string,
	price: string
}

const styles = StyleSheet.create({
	header: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingBottom: 10
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

const EditOrderForm = (props: EditOrderFormProps) => {
	const { update } = useOrders();
	const { onClose, order }: { onClose: () => void, order: Order } = props.route.params;
	const [state, setState] = useState<EditOrderFormState>({
		day: '',
		month: '',
		year: '',
		quantity: '',
		price: ''
	});

	const onSuccess = async () => {
		onClose();
		const editedOrder: Order = {
			...order,
			quantity: parseInt(state.quantity),
			price: parseFloat(state.price),
			expires: moment.utc(`${state.year}-${state.month}-${state.day}`, "YYYY-MM-DD").toDate()
		};
		await update(editedOrder);
	}

	useEffect(() => {
		const date = moment(order.expires);
		setState({
			...state,
			day: date.format('DD'),
			month: date.format('MM'),
			year: date.format('YYYY'),
			quantity: order.quantity.toString(),
			price: order.price.toString()
		});
	}, [order]);

	const onValueChange = (name: any, change: any) => {
		setState({
			...state,
			[name]: change
		} as any);
	}

	const calculateTotal = () => {
		return parseInt(state.quantity)*parseFloat(state.price);
	}

	const calculateFee = () => {
		return calculateTotal()*0.01;
	}

	return (
		<View style={{ ...modalViewBase }}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={onClose} />}
			/>

			<ScrollView style={{ ...wrappingContainerBase }}>
				<View style={{ paddingBottom: 0 }}>
					<Text style={styles.header}>Edit {order.type === OrderType.SELL ? 'sell' : 'buy'} order - {order.name}</Text>

					<View style={{
						flexDirection: "row"
					}}>
						<View style={{ flex: 1, justifyContent: 'center' }}>
							<Text style={{ textAlign: "center", opacity: 0.6 }}>Expire date</Text>
						</View>
						<View style={{ width: '60%', flexDirection: "row" }}>
							<BlockInput
								style={{ flex: 1, textAlign: 'center', fontFamily: 'IBMPlexSansSemiBold' }}
								placeholder="DD"
								keyboardType="number-pad"
								name="day"
								maxLength={2}
								value={state.day}
								onChange={onValueChange}
							/>
							<BlockInput
								style={{ marginLeft: 5, flex: 1, textAlign: 'center', fontFamily: 'IBMPlexSansSemiBold' }}
								placeholder="MM"
								keyboardType="number-pad"
								name="month"
								maxLength={2}
								value={state.month}
								onChange={onValueChange}
							/>
							<BlockInput
								style={{ marginLeft: 5, flex: 2, textAlign: 'center', fontFamily: 'IBMPlexSansSemiBold' }}
								placeholder="YYYY"
								keyboardType="number-pad"
								name="year"
								maxLength={4}
								value={state.year}
								onChange={onValueChange}
							/>
						</View>
					</View>
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
					<View style={styles.row}>
						<Text style={{ opacity: 0.6, flex: 1 }}>Transaction fee</Text>
						<Text style={{ opacity: 0.6 }}>{formatValue(calculateFee())}</Text>
					</View>
					<View style={styles.row}>
						<Text style={{ ...styles.totalTexts, flex: 1 }}>Total</Text>
						<Text style={styles.totalTexts}>CHF {formatValue(calculateTotal())}</Text>
					</View>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
				keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
			>
				<Button
					type="fluidDark"
					title="NEXT"
					onPress={() => props.navigation.navigate('EditOrderConfirmPin', { onSuccess })}
				/>
			</KeyboardAvoidingView>
		</View>
	)
}

export default EditOrderForm;