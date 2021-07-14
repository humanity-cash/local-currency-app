import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, CancelBtn, ConfirmationCode, ModalHeader } from "src/shared/uielements";
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { modalViewBase, wrappingContainerBase } from "src/theme/elements";

type ForgotPasswordVerificationProps = {
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

const ForgotPasswordVerificationView = (props: ForgotPasswordVerificationProps) => {
	const [noCodeReceived, setNoCodeReceived] = useState(false);
	const { personalDetails: { phoneCountry, phoneNumber } } = useUserDetails();

	const onComplete = (text: string) => {
		if (text === VALID_CODE) {
			props.navigation.navigate('ForgotPasswordNewCode')
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
				<Text style={styles.modalHeader}>Enter verification code</Text>
				<View style={styles.codeView}>
					{!noCodeReceived && (<Text>We have sent a message with a verification code to {phoneCountry} {phoneNumber}.</Text>)}
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

const ForgotPasswordVerification = (props:ForgotPasswordVerificationProps) => {
	const navigation = useNavigation();
	return <ForgotPasswordVerificationView navigation={navigation} {...props} />;
}
export default ForgotPasswordVerification