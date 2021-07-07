import moment from "moment";
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { useOrders, useTransaction } from "src/hooks";
import { BlockInput, Button, CancelBtn, ModalHeader } from "src/shared/uielements";
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { colors } from "src/theme/colors";
import { modalBaseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import { OrderType } from "src/utils/types";


type TransactionExpireDateState = {
	day: string,
	month: string,
	year: string
}

const styles = StyleSheet.create({
	header: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingBottom: 10
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

const TransactionExpireDate = (props: any) => {
	const { update } = useTransaction();
	const { update: updateOrder } = useOrders();
	const [state, setState] = useState<TransactionExpireDateState>({
		day: '',
		month: '',
		year: ''
	});

	const { orderId, share, order, onClose } = props.route.params;

	useEffect(() => {
		const date = moment();
		setState({
			...state,
			day: date.format('DD'),
			month: date.format('MM'),
			year: date.format('YYYY')
		});
	}, [orderId]);

	const onValueChange = (name: any, change: any) => {
		setState({
			...state,
			[name]: change
		} as any);
	}

	const onSuccess = async () => {
		const expires = moment.utc(`${state.year}-${state.month}-${state.day}`, "YYYY-MM-DD").toDate();
		await update({
			type: share.type,
			expires
		});
		await updateOrder({
			...order,
			expires
		})
		onClose();
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={onClose} />}
			/>
			<View style={{ ...wrappingContainerBase }}>
				<View style={{ padding: 0}}>
					<View style={{ paddingBottom: 0 }}>
						<Text style={modalBaseHeader}>Set an order expiration date</Text>
						<Text>Set a date on which the order automatically will get closed, even if it is not completed yet.</Text>
						<View style={styles.form}>
							<View>
								<Text h3>Expire date</Text>
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
						</View>
					</View>
				</View>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
				keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
			>
				<Button
					type="fluidDark"
					title="SET AND FINISH"
					style={share.type === OrderType.BUY ? { backgroundColor: colors.textSuccess } : {}}
					onPress={onSuccess}
				/>
			</KeyboardAvoidingView>
		</View>
	)
}

export default TransactionExpireDate