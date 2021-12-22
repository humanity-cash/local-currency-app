import { useNavigation } from '@react-navigation/native';
import React, { createRef, RefObject, useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View, SafeAreaView, TextInput, Keyboard, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/contexts';
import { ForgotPassword } from 'src/auth/types';
import { BackBtn, BlockInput, Button, CancelBtn, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { IMap } from "src/utils/types";
import Translation from 'src/translation/en.json';
import { LoadingPage } from 'src/views';
import SecurityEyeButton from 'src/shared/uielements/SecurityEyeButton';

interface PasswordForm extends IMap {
	confirmPassword: string
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
	bodyText: {
		color: colors.bodyText
	},
	inlineView: {
		flexDirection: 'row',
		justifyContent: 'space-between'
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
		marginHorizontal: 20,
		marginBottom: 20
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	eyeView: {
		position: 'absolute',
		right: 10,
		top: 0,
		bottom: 0,
		justifyContent: 'center'
	}
});

const ForgotPasswordNewPassword = (): React.ReactElement => {
	const { forgotPasswordDetails, setForgotPasswordDetails, completeForgotPasswordFlow }  = useContext(AuthContext);
	const navigation = useNavigation();
	const [isMatch, setIsMatch] = useState<boolean>(false);
	const [state, setState] = useState<PasswordForm>({
		confirmPassword: "",
	});
	const [isLoading, setLoading] = useState<boolean>(false)
	const [isShowPassword, setShowPassword] = useState<boolean>(true)
	const [isShowConPassword, setShowConPassword] = useState<boolean>(true)

	const confirmPasswordRef = createRef<TextInput>()

	useEffect(() => {
		setIsMatch(forgotPasswordDetails.newPassword === state.confirmPassword);
	}, [state, forgotPasswordDetails.newPassword]);

	const onValueChange = (name: string, change: string) => {
		setForgotPasswordDetails((pv: ForgotPassword) => ({
			...pv,
			newPassword: change
		}));
	};
	
	const onPress = async () => {
		setLoading(true)
		const response = await completeForgotPasswordFlow();
		setLoading(false)
		if(response.success){
			navigation.navigate("ForgotPasswordSuccess");
		} else {
			console.log('something went wrong in forgot password flow');
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={viewBase}>

			<LoadingPage visible={isLoading} isData={true} />
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
				rightComponent={
					<CancelBtn
						text="Close"
						onClick={() => navigation.navigate("Login")}
					/>
				}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.modalHeader}>
						Create a new password
					</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>
						Create a password to secure your account
					</Text>
					<View style={styles.form}>
						<Text style={styles.label}>PASSWORD</Text>
						<Text style={styles.label}>
							{Translation.LABEL.PASSWORD_REG}
						</Text>
						<View>
							<BlockInput
								name="password"
								placeholder="Password"
								value={forgotPasswordDetails.newPassword}
								secureTextEntry={isShowPassword}
								onChange={onValueChange}
								returnKeyType='next'
								onSubmitEditing={() => confirmPasswordRef.current?.focus()}
							/>
							<View style={styles.eyeView}>
								<SecurityEyeButton
									isSecurity={isShowPassword}
									onPress={() => setShowPassword(!isShowPassword)}
								/>
							</View>
						</View>
						<View style={styles.inlineView}>
							<Text style={styles.label}>Confirm password</Text>
							{!isMatch && (
								<Text style={styles.errorText}>No match</Text>
							)}
						</View>
						<View>
							<BlockInput
								inputRef={confirmPasswordRef}
								name="confirmPassword"
								placeholder="confirm password"
								value={state.confirmPassword}
								secureTextEntry={isShowConPassword}
								onChange={(name: string, change: string) => {
									setState({ confirmPassword: change });
								}}
							/>
							<View style={styles.eyeView}>
								<SecurityEyeButton
									isSecurity={isShowConPassword}
									onPress={() => setShowConPassword(!isShowConPassword)}
								/>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type="darkGreen"
					title="NEXT"
					disabled={
						forgotPasswordDetails.newPassword !==
							state.confirmPassword || !state.confirmPassword
					}
					onPress={onPress}
				/>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default ForgotPasswordNewPassword;