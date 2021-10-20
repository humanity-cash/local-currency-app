import React, {useState, useEffect} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BorderedInput, ToggleButton } from "src/shared/uielements";
import { baseHeader, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import MerchantQRCodeGen from "./MerchantQRCodeGen";
import MerchantRequestSuccess from "./MerchantRequestSuccess";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';

type AmountState = {
	amount: string,
	costs: string
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
		alignItems: 'center',
		marginTop: 20
	},
	contentView: { 
		marginTop: 5
	},
	label: { 
		marginTop: 20, 
		color: colors.text, 
		fontSize: 12 
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	text: {
		color: colors.purple
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
	switch: {
		borderColor: colors.purple,
	},
	switchText: {
		color: colors.purple
	},
	toggleBg: {
		backgroundColor: colors.purple
	}
});

const MerchantRequest = (): JSX.Element => {
	const navigation = useNavigation();
	const [state, setState] = useState<AmountState>({
		amount: "",
		costs: ""
	});
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [receivedAmount, setReceivedAmount] = useState<number>(0);
	const [isRequestSuccess, setIsRequestSuccess] = useState<boolean>(false);

	useEffect(() => {
		setGoNext(Number(state.costs) > 0);
	}, [state]);

	const onValueChange = (name: string, change: string) => {
		const costs = change;
		setState({
		  ...state,
		  [name]: change,
		  costs: costs,
		} as AmountState);
	};

	const requestAmount = () => {
		setIsVisible(true);
	}

	const onSuccess = (amount: number) => {
		setReceivedAmount(amount);
		setIsVisible(false);
		setIsRequestSuccess(true);
	}

	const onConfirm = () => {
		setIsRequestSuccess(false);
		navigation.navigate(Routes.MERCHANT_DASHBOARD);
	}

	const onClose = () => {
		setIsVisible(false);
	}

	return (
		<View style={viewBaseB}>
			<Header
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.CLOSE} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<View style={styles.switchView}>
						<ToggleButton
							value={false}
							onChange={()=>navigation.navigate(Routes.MERCHANT_QRCODE_SCAN)}
							activeText="Pay"
							inActiveText="Receive"
							style={styles.switch}
							textStyle={styles.switchText}
							circleStyle={styles.toggleBg}
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
						placeholderTextColor={colors.greyedPurple}
						prefix="B$"
						style={styles.input}
						textStyle={styles.text}
						value={state.amount}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.PURPLE}
						disabled={!goNext}
						title={Translation.BUTTON.NEXT}
						onPress={requestAmount}
					/>
				</View>
			</KeyboardAvoidingView>
			{ isVisible && <MerchantQRCodeGen visible={isVisible} onSuccess={onSuccess} onClose={onClose} amount={Number(state.amount)} /> }
			{ isRequestSuccess && <MerchantRequestSuccess visible={isRequestSuccess} onClose={onConfirm} amount={receivedAmount} /> }
		</View>
	);
}

export default MerchantRequest