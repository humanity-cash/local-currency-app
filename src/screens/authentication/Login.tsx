import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { SignInInput } from 'src/auth/types';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { BackBtn, BlockInput, Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35,
	},
	bodyText: {
		color: colors.bodyText,
	},
	form: {
		marginVertical: 30,
	},
	label: {
		fontSize: 12,
		lineHeight: 14,
		color: colors.bodyText,
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
});

const Login = (): JSX.Element => {
	const navigation = useNavigation();
	const { signIn, signInDetails, setSignInDetails } = useContext(AuthContext);

	const onValueChange = (name: 'email' | 'password', change: string) => {
		setSignInDetails((pv: SignInInput) => ({
			...pv,
			[name]: change,
		}));
	};

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>{Translation.LANDING_PAGE.LOGIN}</Text>
				</View>
				<Text style={styles.bodyText}>{Translation.LANDING_PAGE.WELCOME_BACK}</Text>
				<View style={styles.form}>
					<Text style={styles.label}>{Translation.LABEL.EMAIL_USERNAME}</Text>
					<BlockInput
						name='email'
						placeholder='Email'
						value={signInDetails?.email}
						onChange={onValueChange}
					/>
					<Text style={styles.label}>{Translation.LABEL.PASSWORD}</Text>
					<BlockInput
						name='password'
						placeholder='Password'
						value={signInDetails?.password}
						secureTextEntry={true}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.TRANSPARENT}
						title='Forgot Passowrd?'
						onPress={() =>
							navigation.navigate(Routes.FORGOT_PASSWORD)
						}
					/>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title='Log in'
						disabled={false}
						onPress={signIn}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default Login;

// useEffect(() => {
// 	async function askFingerprint() {
// 		if (isFocused && touchID) {
// 			const data = await LocalAuthentication.authenticateAsync({
// 				disableDeviceFallback: true,
// 				cancelLabel: 'Close'
// 			});
// 			setAutoFocus(false);
// 		}
// 	}
// 	askFingerprint();

// 	setAutoFocus(isFocused);
// }, [isFocused, touchID]);

// const isFocused = useIsFocused();
// const [autoFocus, setAutoFocus] = useState<boolean>(true);

