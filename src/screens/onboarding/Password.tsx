import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState, createRef } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, SafeAreaView, ScrollView, TextInput, Keyboard } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from "src/contexts";
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';
import { BackBtn, BlockInput, Button, Header } from 'src/shared/uielements';
import { colors } from 'src/theme/colors';
import {
	baseHeader,
	viewBaseWhite,
	wrappingContainerBase
} from 'src/theme/elements';
import Translation from 'src/translation/en.json';
import { isPasswordValid } from 'src/utils/validation';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35,
	},
	inlineView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	bodyText: {
		color: colors.bodyText,
	},
	errorText: {
		color: colors.mistakeRed,
		fontSize: 12,
		lineHeight: 14,
	},
	form: {
		marginTop: 30,
	},
	label: {
		fontSize: 12,
		lineHeight: 14,
		color: colors.bodyText,
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20,
	},
});

const Password = (): JSX.Element => {
	const navigation = useNavigation();
	const { updateSignUpDetails, signUpDetails, signUp } = useContext(AuthContext);
	const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

	const confirmPasswordRef = createRef<TextInput>()

	useEffect(() => {
		if (
			isPasswordValid(signUpDetails.password) &&
			isPasswordValid(signUpDetails.confirmPassword)
		) {
			if (signUpDetails.password === signUpDetails.confirmPassword) {
				setIsValidPassword(true);
			}
		}
	}, [signUpDetails.confirmPassword, signUpDetails.password]);

	const onValueChange = (
		name: 'password' | 'confirmPassword',
		change: string
	) => {
		updateSignUpDetails({ [name]: change });
	};

	return (
		<View style={viewBaseWhite}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>{Translation.EMAIL_VERIFICATION.CREATE_PASSWORD}</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>
						{Translation.EMAIL_VERIFICATION.CREATE_PASSWORD_DETAIL}
					</Text>
					<View style={styles.form}>
						<Text style={styles.label}>PASSWORD</Text>
						<Text style={styles.label}>
							{Translation.LABEL.PASSWORD_REG}
						</Text>
						<BlockInput
							name='password'
							placeholder='Password'
							value={signUpDetails.password}
							secureTextEntry={true}
							onChange={onValueChange}
							returnKeyType='next'
							onSubmitEditing={() => {confirmPasswordRef.current?.focus()}}
						/>

						<View style={styles.inlineView}>
							<Text style={styles.label}>Confirm password</Text>
							{!isValidPassword && (
								<Text style={styles.errorText}>No match</Text>
							)}
						</View>
						<BlockInput
							inputRef={confirmPasswordRef}
							name='confirmPassword'
							placeholder='confirm password'
							value={signUpDetails.confirmPassword}
							secureTextEntry={true}
							onChange={onValueChange}
						/>
					</View>
				</View>
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
				<SafeAreaView style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title='NEXT'
						disabled={!isValidPassword}
						onPress={async () => {
							const response = await signUp();
              				console.log(" onPress={ ~ response", response)
							if (response.success) {
								navigation.navigate(Routes.VERIFICATION);
							}
						}}
					/>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default Password;
