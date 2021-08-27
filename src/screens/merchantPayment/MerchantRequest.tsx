import React, {useState, useEffect, ReactElement} from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, Switch } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn, BackBtn, BorderedInput } from "src/shared/uielements";
import { baseHeader, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import MerchantQRCodeGen from "./MerchantQRCodeGen";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type MerchantRequestProps = {
	navigation?: any,
	route?: any,
}

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
	}
});

const MerchantRequest = (props: MerchantRequestProps): ReactElement => {

	const [state, setState] = useState<AmountState>({
		amount: "1",
		costs: "1"
	});
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isEnabled, setIsEnabled] = useState<boolean>(true);
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		setGoNext(state.costs !== "");
	}, [state]);

	const onValueChange = (name: string, change: string) => {
		const costs = change;
		setState({
		  ...state,
		  [name]: change,
		  costs: costs,
		} as AmountState);
	};

	const toggleSwitch = () => {
		setIsEnabled(previousState => !previousState);
		if (isEnabled) {
			props.navigation.navigate(Routes.MERCHANT_QRCODE_SCAN);
		}
	}

	const requestAmount = () => {
		setIsVisible(true);
	}

	const onClose = () => {
		setIsVisible(false);
	}

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn color={colors.purple} text={Translation.BUTTON.CLOSE} onClick={() => props.navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<View style={styles.switchView}>
						<Switch
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}
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
						type="purple"
						disabled={!goNext}
						title="Next"
						onPress={requestAmount}
					/>
				</View>
			</KeyboardAvoidingView>
			{ isVisible && <MerchantQRCodeGen visible={isVisible} onClose={onClose} amount={state.amount} /> }
		</View>
	);
}

export default MerchantRequest