import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { ForgotPassword } from 'src/auth/types';
import { BackBtn, BlockInput, Button, CancelBtn, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { IMap } from "src/utils/types";
import Translation from 'src/translation/en.json';

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
		padding: 20,
		paddingBottom: 45
	},
	bottomNavigation: {
		justifyContent: "center"
	}
});

const ForgotPasswordNewPassword = (): React.ReactElement => {
	const { forgotPasswordDetails, setForgotPasswordDetails, completeForgotPasswordFlow }  = useContext(AuthContext);
	const navigation = useNavigation();
	const [isMatch, setIsMatch] = useState<boolean>(false);
	const [state, setState] = useState<PasswordForm>({
		confirmPassword: "",
	});

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
		const response = await completeForgotPasswordFlow();
		if(response.success){
			navigation.navigate("ForgotPasswordSuccess");
		} else {
			console.log('something went wrong in forgot password flow');
		}
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
				rightComponent={
					<CancelBtn
						text="Close"
						onClick={() => navigation.navigate("Login")}
					/>
				}
			/>
			<View style={wrappingContainerBase}>
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
						<BlockInput
							name="password"
							placeholder="Password"
							value={forgotPasswordDetails.newPassword}
							secureTextEntry={true}
							onChange={onValueChange}
						/>
						<View style={styles.inlineView}>
							<Text style={styles.label}>Confirm password</Text>
							{!isMatch && (
								<Text style={styles.errorText}>No match</Text>
							)}
						</View>
						<BlockInput
							name="confirmPassword"
							placeholder="confirm password"
							value={state.confirmPassword}
							secureTextEntry={true}
							onChange={(name: string, change: string) => {
								setState({ confirmPassword: change });
							}}
						/>
					</View>
				</View>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						title="NEXT"
						disabled={
							forgotPasswordDetails.newPassword !==
								state.confirmPassword || !state.confirmPassword
						}
						onPress={onPress}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default ForgotPasswordNewPassword;