import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, ScrollView, View, Keyboard, Switch } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../uielements/Button'
import { modalViewBase, baseHeader, wrappingContainerBase, modalBaseHeader } from "../../theme/elements";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { MODAL_SCREEN_OFFSET } from "../../uielements/Modal";
import { BorderedInput } from "../../uielements/BorderedInput";
import { useWallet } from "../../hooks/useWallet";
import { colors } from "../../theme/colors";

interface WalletMinimumAmountState {
	amount: string
}

type WalletMinimumAmountProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	view: {
		marginTop: 15,
		flex: 1
	},
	horizontalView: {
		marginTop: 15,
		flex: 1,
		flexDirection: "row"
	},
	text: {
		fontSize: 16,
		lineHeight: 32,
		flex: 1,
		marginRight: 10,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	headerView: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		marginBottom: 5
	}
});

const WalletMinimumAmount = (props: WalletMinimumAmountProps) => {
	const navigation = useNavigation();
	const { wallet, updateMinimum } = useWallet();
	const [state, setState] = useState<WalletMinimumAmountState>({
		amount: '0'
	});
	const [switchToggle, setSwitchToggle] = useState(false);
	const [goNext, setGoNext] = useState(false);

	useEffect(() => {
		setSwitchToggle(wallet.minimum.enabled);
	}, [wallet]);

	const onTouchIdOption = (value: boolean) => {
		updateMinimum({ enabled: value });
	}

	useEffect(() => {
		setState({
			amount: wallet.minimum.amount.toString()
		})
	}, [wallet]);

	useEffect(() => {
		// @ts-ignore
		setGoNext(Object.keys(state).every((key) => state[key] !== '' && state[key] !== '0'));
	}, [state]);

	const onValueChange = (name: any, change: any) => {
		setState({
			...state,
			[name]: change
		} as any)
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text style={modalBaseHeader}>Set wallet minimum</Text>
						<Text>Set a wallet minimum to make sure you always have cash in your wallet to do trading. We will auto top-up your balance to the desired minimum amount.</Text>
					</View>
					<View style={styles.horizontalView}>
						<Text style={styles.text}>Set a wallet minimum</Text>
						<Switch
							trackColor={{ false: colors.white, true: colors.green }}
							thumbColor={colors.white}
							ios_backgroundColor={colors.white}
							onValueChange={onTouchIdOption}
							value={switchToggle}
						/>
					</View>
					{switchToggle && (
						<View style={styles.view}>
							<Text h3>Wallet minimum</Text>
							<BorderedInput
								label="Amount"
								keyboardType="number-pad"
								name="amount"
								prefix="CHF"
								value={state.amount}
								onChange={onValueChange}
							/>
						</View>
					)}
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
				keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
			>
				<Button
					type="fluidDark"
					title="NEXT"
					disabled={!goNext}
					onPress={() => {
						Keyboard.dismiss();
						navigation.navigate('WalletSelectPayment', { amount: state.amount })
					}}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

export default WalletMinimumAmount