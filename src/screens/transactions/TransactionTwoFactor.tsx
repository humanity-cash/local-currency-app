import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { usePaymentDetails, useUserDetails } from "src/hooks";
import { BackBtn, CancelBtn, ConfirmationCode, ModalHeader } from "src/shared/uielements";
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { modalBaseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";

type TransactionTwoFactorProps = {
	navigation?: any,
	route?: any
}

const styles = StyleSheet.create({
	modalHeader: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingBottom: 10
	},
	codeView: {
		flex: 1
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center'
	}
});

const VALID_CODE = '123456';

const TransactionTwoFactorView = (props: TransactionTwoFactorProps) => {
	const [noCodeReceived, setNoCodeReceived] = useState(false);
	const { personalDetails: { phoneCountry, phoneNumber } } = useUserDetails();
	const { details } = usePaymentDetails();

	const onComplete = (text: string) => {
		if (text === VALID_CODE) {
			props.navigation.navigate('SellTransactionComplete', { added: details.amount });
			return;
		}
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>
			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<Text style={modalBaseHeader}>Two factor authorization</Text>
				<View style={styles.codeView}>
					{!noCodeReceived && (<Text>For amounts above CHF 5000,00 we need an extra authorization. We have sent a message with a verification code to {phoneCountry} {phoneNumber}.</Text>)}
					{noCodeReceived && (<Text>We have sent another message with a new verification code to {phoneCountry} {phoneNumber}. Click back if you need to change your phone number.</Text>)}
					<ConfirmationCode onComplete={onComplete} />
				</View>
			</View>
			{!noCodeReceived && (
				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : "height"}
					keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
				>
					<View style={styles.bottomView}>
						<TouchableOpacity onPress={() => {
							setNoCodeReceived(true);
							Keyboard.dismiss();
						}}>
							<Text style={styles.bottomNavigation}>No code received?</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			)}
			{noCodeReceived && (
				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : "height"}
					keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
				>
					<View style={styles.bottomView}>
						<TouchableOpacity onPress={() => props.navigation.navigate('VerificationHelp')}>
							<Text style={styles.bottomNavigation}>Need help?</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			)}
		</View>
	);
}

const TransactionTwoFactor = (props:TransactionTwoFactorProps) => {
	const navigation = useNavigation();
	return <TransactionTwoFactorView navigation={navigation} {...props} />;
}
export default TransactionTwoFactor