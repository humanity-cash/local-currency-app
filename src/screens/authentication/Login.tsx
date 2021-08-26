import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	View,
} from 'react-native';
import { Text } from 'react-native-elements';
import { Header, BackBtn, BlockInput, Button } from 'src/shared/uielements';
import {
	baseHeader,
	viewBase,
	wrappingContainerBase,
} from 'src/theme/elements';
import { colors } from 'src/theme/colors';
import { AuthContext } from 'src/auth';
import { BUTTON_TYPES, SCREENS } from 'src/constants';
import { SignInInput } from 'src/auth/types';

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
					<Text style={styles.headerText}>Log in</Text>
				</View>
				<Text style={styles.bodyText}>Welcome back</Text>
				<View style={styles.form}>
					<Text style={styles.label}>Email address or user name</Text>
					<BlockInput
						name='email'
						placeholder='Email'
						value={signInDetails.email}
						onChange={onValueChange}
					/>
					<Text style={styles.label}>Password</Text>
					<BlockInput
						name='password'
						placeholder='Password'
						value={signInDetails.password}
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
							navigation.navigate(SCREENS.FORGOT_PASSWORD)
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

