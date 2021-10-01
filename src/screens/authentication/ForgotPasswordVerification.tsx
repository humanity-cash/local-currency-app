import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, ConfirmationCode, Header } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import * as Routes from 'src/navigation/constants';
import Translation from 'src/translation/en.json';

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

const ForgotPasswordVerification = (): JSX.Element => {
	const navigation = useNavigation();
	const { personalDetails: { email } } = useUserDetails();

	const onComplete = (text: string) => {
		if (text === VALID_CODE) {
			navigation.navigate(Routes.FORGOT_PASSWORD_NEW_PASSWORD);
		}
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.modalHeader}>Verify your mail address</Text>
				</View>
				<View style={styles.modalDescription}>
					<Text>{Translation.EMAIL_VERIFICATION.SENT_VERIFICATION_CODE} {email}.</Text>
					<ConfirmationCode onComplete={onComplete} />
				</View>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<View style={styles.bottomView}>
					<TouchableOpacity style={styles.sendCodeBtn} onPress={() => {
						Keyboard.dismiss();
					}}>
						<Text style={styles.bottomNavigation}>{Translation.EMAIL_VERIFICATION.SEND_CODE}</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default ForgotPasswordVerification