import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View
} from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
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
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
});

const Verification = (): JSX.Element => {
	const navigation = useNavigation();
	const { emailVerification, resendEmailVerificationCode } =
		useContext(AuthContext);
	const [noCodeReceived, setNoCodeReceived] = useState<boolean>(false);
	const [goNext, setGoNext] = useState<boolean>(false);
	const { personalDetails } = useUserDetails();

	const onComplete = async (text: string) => {
		const response = await emailVerification(text);
		if (response.success) {
			setGoNext(true);
		}
	};

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={styles.container}>
					<View style={baseHeader}>
						{!noCodeReceived && (
							<Text style={styles.headerText}>
								Verify your mail address
							</Text>
						)}
						{noCodeReceived && (
							<Text style={styles.headerText}>
								Enter verification code
							</Text>
						)}
					</View>
					{!noCodeReceived && (
						<Text style={styles.bodyText}>
							We have sent an email with a verification code to{' '}
							{personalDetails.email}
						</Text>
					)}
					{noCodeReceived && (
						<Text style={styles.bodyText}>
							We have sent another message with a new verification
							code to {personalDetails.email}
						</Text>
					)}
					<View style={styles.codeView}>
						<ConfirmationCode onComplete={onComplete} />
					</View>
				</View>
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
				<View style={styles.bottomView}>
					{!noCodeReceived && (
						<TouchableOpacity onPress={resendEmailVerificationCode}>
							<Text style={styles.bottomNavigation}>
								Send code again
							</Text>
						</TouchableOpacity>
					)}
					{noCodeReceived && (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate(Routes.VERIFICATION_HELP)
							}>
							<Text style={styles.bottomNavigation}>
								Need help?
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
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default Verification;
