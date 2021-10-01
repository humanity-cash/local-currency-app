import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { BackBtn, Header, BlockInput, Button } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { IMap } from "src/utils/types";
import { colors } from "src/theme/colors";
import { isPasswordValid } from "src/utils/validation";
import * as Routes from 'src/navigation/constants';
import Translation from 'src/translation/en.json';
import { BUTTON_TYPES } from 'src/constants';

interface PasswordForm extends IMap {
	password: string
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

const ForgotPasswordNewPassword = (): JSX.Element => {
	const navigation = useNavigation();
	const { forgotPasswordDetails, setForgotPasswordDetails, completeForgotPasswordFlow } = useContext(AuthContext);
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isMatch, setIsMatch] = useState<boolean>(true);
	const [state, setState] = useState<PasswordForm>({
		password: "",
		confirmPassword: ""
	});

	useEffect(() => {
		setIsMatch(state.password === state.confirmPassword);
		setGoNext(
			isPasswordValid(state.password) && 
			isPasswordValid(state.confirmPassword)
		);
	},[state.password, state.confirmPassword]);

	const onValueChange = (name: string, change: string) => {
		setState({
			...state,
			[name]: change
		});
	};

	const handleNext = async () => {
		setForgotPasswordDetails({
			...forgotPasswordDetails,
			newPassword: state.password
		});
		
		const response = await completeForgotPasswordFlow({
			...forgotPasswordDetails,
			newPassword: state.password
		});

		if (!response?.success) {
			navigation.navigate(Routes.FORGOT_PASSWORD);
		}
		navigation.navigate(Routes.FORGOT_PASSWORD_SUCCESS);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<View style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.modalHeader}>{Translation.FORGOT_PASSWORD.CREATE_NEW_PASSWORD}</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>{Translation.FORGOT_PASSWORD.CREATE_NEW_PASSWORD_DETAIL}</Text>
					<View style={styles.form}>
						<Text style={styles.label}>{Translation.LABEL.PASSWORD}</Text>
						<Text style={styles.label}>({Translation.LABEL.PASSWORD_REG})</Text>
						<BlockInput
							name="password"
							placeholder="Password"
							value={state.password}
							secureTextEntry={true}
							onChange={onValueChange}
						/>

						<View style={styles.inlineView}>
							<Text style={styles.label}>{Translation.LABEL.CONFIRM_PASSWORD}</Text>
							{!isMatch && <Text style={styles.errorText}>No match</Text>}
						</View>
						<BlockInput
							name="confirmPassword"
							placeholder="confirm password"
							value={state.confirmPassword}
							secureTextEntry={true}
							onChange={onValueChange}
						/>
					</View>
				</View>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={Translation.BUTTON.NEXT}
						disabled={!goNext || !isMatch}
						onPress={handleNext}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default ForgotPasswordNewPassword