import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { BUTTON_TYPES, SCREENS } from 'src/constants';
import { BackBtn, BlockInput, Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import { isPasswordValid } from 'src/utils/validation';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35
	},
	inlineView: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	bodyText: {
		color: colors.bodyText
	},
	errorText: {
		color: colors.mistakeRed,
		fontSize: 12,
		lineHeight: 14,
	},
	form: {
		marginTop: 30
	},
	label: {
		fontSize: 12,
		lineHeight: 14,
		color: colors.bodyText
	},
	bottomView: {
		paddingHorizontal: 20,
    	paddingBottom: 50
	},
});

const Password = (): JSX.Element => {
	const navigation = useNavigation();
	const {
		setSignUpDetails,
		signUpDetails,
		signUp
	} = useContext(AuthContext);
	const [isValidPassword, setIsValidPassword] = useState<boolean>(false);

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
		setSignUpDetails({
			...signUpDetails,
			[name]: change,
		});
	};

	return (
		<View style={viewBaseWhite}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>Create a password</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>
						Create a password to secure your account
					</Text>
					<View style={styles.form}>
						<Text style={styles.label}>PASSWORD</Text>
						<Text style={styles.label}>
							(min.8 characters, 1 capitical, 1 lower and 1
							symbol)
						</Text>
						<BlockInput
							name='password'
							placeholder='Password'
							value={signUpDetails.password}
							secureTextEntry={true}
							onChange={onValueChange}
						/>

						<View style={styles.inlineView}>
							<Text style={styles.label}>Confirm password</Text>
							{!isValidPassword && (
								<Text style={styles.errorText}>No match</Text>
							)}
						</View>
						<BlockInput
							name='confirmPassword'
							placeholder='confirm password'
							value={signUpDetails.confirmPassword}
							secureTextEntry={true}
							onChange={onValueChange}
						/>
					</View>
				</View>
			</View>

			<KeyboardAvoidingView
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title='NEXT'
						disabled={!isValidPassword}
						onPress={async () => {
							const response = await signUp();
							if (response.success) {
								navigation.navigate(SCREENS.VERIFICATION);
							}
						}}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default Password;