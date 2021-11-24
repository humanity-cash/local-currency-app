import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from "src/contexts";
import { SignInInput } from 'src/auth/types';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { BackBtn, BlockInput, Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { LoadingScreenTypes } from 'src/utils/types';
import { isPasswordValid } from 'src/utils/validation';

import { updateLoadingStatus } from 'src/store/loading/loading.actions';
import { useDispatch } from 'react-redux';
import { showLoadingProgress, hideLoadingProgress } from '../../store/loading/loading.actions';

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
		paddingTop: 10
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
});

const Login = (): JSX.Element => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { signIn, signInDetails, setSignInDetails } = useContext(AuthContext);
	const [goNext, setGoNext] = useState<boolean>(false);

	useEffect(() => {
		setGoNext(isPasswordValid(signInDetails ? signInDetails.password : ""));
	}, [signInDetails]);

	const onValueChange = (name: 'email' | 'password', change: string) => {
		setSignInDetails((pv: SignInInput) => ({
			...pv,
			[name]: change,
		}));
	};

	const handleSignin = async () => {
		dispatch(showLoadingProgress(LoadingScreenTypes.LOADING_DATA))
		await signIn();
		dispatch(hideLoadingProgress())
	}

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
					<Text style={styles.label}>{Translation.LABEL.CONFIRM_PASSWORD}</Text>
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
						title='Forgot password'
						onPress={() =>
							navigation.navigate(Routes.FORGOT_PASSWORD)
						}
					/>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title='Log in'
						disabled={!goNext}
						onPress={handleSignin}
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

