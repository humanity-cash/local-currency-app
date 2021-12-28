import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
	SafeAreaView
} from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from "src/contexts";
import { BUTTON_TYPES } from 'src/constants';
import { useUserDetails } from 'src/hooks';
import * as Routes from 'src/navigation/constants';
import {
	BackBtn,
	Button,
	ConfirmationCode,
	Header
} from 'src/shared/uielements';
import { colors } from 'src/theme/colors';
import {
	baseHeader,
	viewBase,
	wrappingContainerBase
} from 'src/theme/elements';
import Translation from 'src/translation/en.json';

const styles = StyleSheet.create({
	container: {
		paddingBottom: 40,
	},
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 32,
	},
	bodyText: {
		color: colors.bodyText,
	},
	codeView: {
		flex: 1,
		marginTop: 25,
	},
	bottomNavigation: {
		alignSelf: 'center',
		color: colors.darkGreen,
		fontWeight: 'bold',
		paddingVertical: 30,
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20,
	},
});

const Verification = (): JSX.Element => {
	const navigation = useNavigation();
	const { emailVerification, resendEmailVerificationCode } =
		useContext(AuthContext);
	const [noCodeReceived, setNoCodeReceived] = useState<boolean>(false);
	const [goNext, setGoNext] = useState<boolean>(false);
	const { signUpDetails: { email } } = useContext(AuthContext);

	const onComplete = async (text: string) => {
		if(text?.length < 5) return;
		const response = await emailVerification(text);
		if (response.success) {
			setGoNext(true);
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
			style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={styles.container}>
					<View style={baseHeader}>
						{!noCodeReceived && (
							<Text style={styles.headerText}>
								{Translation.EMAIL_VERIFICATION.VERIFY_MAIL}
							</Text>
						)}
						{noCodeReceived && (
							<Text style={styles.headerText}>
								{Translation.EMAIL_VERIFICATION.ENTER_VERIFICATION_CODE}
							</Text>
						)}
					</View>
					<Text style={styles.bodyText}>
						{noCodeReceived 
							? Translation.EMAIL_VERIFICATION.SENT_VERIFICATION_CODE_AGAIN.replace('{{mail}}', email)
							: Translation.EMAIL_VERIFICATION.SENT_VERIFICATION_CODE.replace('{{mail}}', email)}
					</Text>
					<View style={styles.codeView}>
						<ConfirmationCode onComplete={onComplete} />
					</View>
				</View>
			</ScrollView>

			<SafeAreaView style={styles.bottomView}>
				{!noCodeReceived && (
					<TouchableOpacity onPress={() => {
						resendEmailVerificationCode()
						setNoCodeReceived(true)
					}}>
						<Text style={styles.bottomNavigation}>
							{Translation.EMAIL_VERIFICATION.SEND_CODE}
						</Text>
					</TouchableOpacity>
				)}
				{noCodeReceived && (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate(Routes.VERIFICATION_HELP)
						}>
						<Text style={styles.bottomNavigation}>
							{Translation.EMAIL_VERIFICATION.NEED_HELP}
						</Text>
					</TouchableOpacity>
				)}
				<Button
					type={BUTTON_TYPES.DARK_GREEN}
					title='NEXT'
					disabled={!goNext}
					onPress={() =>
						navigation.navigate(Routes.EMAIL_CONFIRMED)
					}
				/>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default Verification;
