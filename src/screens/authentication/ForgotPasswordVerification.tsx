import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, CancelBtn, ConfirmationCode, Header } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

type ForgotPasswordVerificationProps = {
	navigation?: any,
	route?: any
}

const styles = StyleSheet.create({
	modalHeader: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	modalDescription: {
		paddingBottom: 30,
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
	bottomNavigation: {
		alignSelf: "center"
	},
	sendCodeBtn: {
		marginBottom: 30
	}
});

const VALID_CODE = '123456';

const ForgotPasswordVerificationView = (props: ForgotPasswordVerificationProps) => {
	const [noCodeReceived, setNoCodeReceived] = useState(false);
	const { personalDetails: { email } } = useUserDetails();

	const onComplete = (text: string) => {
		if (text === VALID_CODE) {
			props.navigation.navigate('ForgotPasswordNewCode')
			return;
		}
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Login')} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.modalHeader}>Verify your mail address</Text>
				</View>
				<View style={styles.modalDescription}>
					<Text>We have sent an email with a verification code to {email}.</Text>
					<ConfirmationCode onComplete={onComplete} />
				</View>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<View style={styles.bottomView}>
					<TouchableOpacity style={styles.sendCodeBtn} onPress={() => {
						setNoCodeReceived(true);
						Keyboard.dismiss();
					}}>
						<Text style={styles.bottomNavigation}>Send code again</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const ForgotPasswordVerification = (props:ForgotPasswordVerificationProps) => {
	const navigation = useNavigation();
	return <ForgotPasswordVerificationView navigation={navigation} {...props} />;
}
export default ForgotPasswordVerification