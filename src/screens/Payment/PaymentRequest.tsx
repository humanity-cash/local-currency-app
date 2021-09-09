import React, { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BackBtn, BorderedInput, ToggleButton } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import QRCodeGen from "./QRCodeGen";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type AmountState = {
	amount: string,
	cost: string
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	switchView: {
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	contentView: { 
		marginTop: 5
	},
	label: { 
		marginTop: 20, 
		color: colors.text, 
		fontSize: 12 
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
	openBtn: {
		marginBottom: 10
	},
	switch: {
		borderColor: colors.darkGreen,
	},
	switchText: {
		color: colors.darkGreen
	}
});

const PaymentRequest = (): JSX.Element => {
	const navigation = useNavigation();
	const [state, setState] = useState<AmountState>({
		amount: "1",
		cost: "1"
	});
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isOpenAmount, setIsOpenAmount] = useState<boolean>(false);

	useEffect(() => {
		setGoNext(state.cost !== "");
	}, [state]);

	const onValueChange = (name: string, change: string) => {
		const costs = change;
		setState({
		  ...state,
		  [name]: change,
		  costs: costs,
		} as AmountState);
	};

	const openAmount = () => {
		setIsOpenAmount(true);
		setIsVisible(true);
	}

	const requestAmount = () => {
		setIsOpenAmount(false);
		setIsVisible(true);
	}

	const onClose = () => {
		setIsVisible(false);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} onClick={() => navigation.navigate(Routes.DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<View style={styles.switchView}>
						<ToggleButton
							value={false}
							onChange={()=>navigation.navigate(Routes.QRCODE_SCAN)}
							activeText="Pay"
							inActiveText="Receive"
							style={styles.switch}
							textStyle={styles.switchText}
						/>
					</View>
				</View>
				<View style={styles.contentView}>
					<Text style={styles.label}>{Translation.LABEL.AMOUNT}</Text>
					<BorderedInput
						label="Amount"
						name="amount"
						keyboardType="number-pad"
						placeholder="Amount"
						prefix="B$"
						value={state.amount}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="transparent"
						disabled={!goNext}
						title={Translation.BUTTON.OPEN_AMOUNT}
						style={styles.openBtn}
						onPress={openAmount}
					/>
					<Button
						type="darkGreen"
						disabled={!goNext}
						title={Translation.BUTTON.NEXT}
						onPress={requestAmount}
					/>
				</View>
			</KeyboardAvoidingView>
			{ isVisible && <QRCodeGen visible={isVisible} onClose={onClose} isOpenAmount={isOpenAmount} amount={state.amount} /> }
		</View>
	);
}

export default PaymentRequest