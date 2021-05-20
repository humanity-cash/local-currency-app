import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, ScrollView, View, Keyboard } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../uielements/Button'
import { modalViewBase, baseHeader, wrappingContainerBase } from "../../theme/elements";
import { usePaymentDetails } from "../../hooks/usePaymentDetails";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { MODAL_SCREEN_OFFSET } from "../../uielements/Modal";
import { BorderedInput } from "../../uielements/BorderedInput";
import { useWallet } from "../../hooks/useWallet";
import { colors } from "../../theme/colors";

interface WalletAddCashState {
	amount: string
}

type WalletAddCashProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	view: {
		marginTop: 10
	},
	header: {
		fontFamily: 'IBMPlexSansBold',
		fontSize: 20,
	},
	text: {
		fontSize: 20,
		lineHeight: 60,
		marginRight: 10,
		fontFamily: 'IBMPlexSansSemiBold',
	}
});

const WalletAddCashView = (props: WalletAddCashProps) => {
	const { update } = usePaymentDetails();
	const { wallet } = useWallet();
	const [state, setState] = useState<WalletAddCashState>({
		amount: '0'
	});
	const [goNext, setGoNext] = useState(false);
	const [lowBalance, setLowBalance] = useState(false);

	useEffect(() => {
		update({ amount: state.amount });
	}, []);

	useEffect(() => {
		// @ts-ignore
		setGoNext(Object.keys(state).every((key) => state[key] !== '' && parseInt(state[key]) > '0'));
	}, [state]);

	const onValueChange = (name: any, change: any) => {
		setState({
			...state,
			[name]: change
		} as any)
		update({ [name]: change });
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text style={styles.header}>Add cash</Text>
					</View>
					<View style={styles.view}>
						{lowBalance && (<Text h3 style={{ color: colors.textWarning }}>Sorry, that exceeds your wallet balance</Text>)}
						<BorderedInput
							label="Amount"
							keyboardType="number-pad"
							name="amount"
							prefix="CHF"
							value={state.amount}
							onChange={onValueChange}
						/>
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
					disabled={!goNext}
					onPress={() => {
						Keyboard.dismiss();
						props.navigation.navigate('WalletSelectPayment');
					}}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

const WalletAddCash = (props: WalletAddCashProps) => {
	const navigation = useNavigation();
	return <WalletAddCashView {...props} navigation={navigation} />;
}
export default WalletAddCash