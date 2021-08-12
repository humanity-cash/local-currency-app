import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, CancelBtn, ModalHeader, BlockInput, Button } from "src/shared/uielements";
import { modalBaseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { IMap } from "src/utils/types";
import { colors } from "src/theme/colors";

type ForgotPasswordNewPasswordProps = {
	navigation?: any
	route?: any
}

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

//eslint-disable-next-line
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const ForgotPasswordNewPasswordView = (props: ForgotPasswordNewPasswordProps) => {
	const { updateAuthorization } = useUserDetails();
	const [goNext, setGoNext] = useState<boolean>(false);
	const [isMatch, setIsMatch] = useState<boolean>(true);
	const [state, setState] = useState<PasswordForm>({
		password: "",
		confirmPassword: ""
	});

	useEffect(() => {
		setIsMatch(state.password === state.confirmPassword);
		setGoNext(Object.keys(state).every((key) => state[key] !== "") && strongRegex.test(state.password));
	},[state]);

	const onValueChange = (name: any, change: any) => {
		setState({
			...state,
			[name]: change
		});
	};

	return (
		<View style={viewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>
			<View style={{ ...wrappingContainerBase, flex: 1 }}>
				<View style={ modalBaseHeader }>
					<Text style={styles.modalHeader}>Create a new password</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>Create a password to secure your account</Text>
					<View style={styles.form}>
						<Text style={styles.label}>PASSWORD</Text>
						<Text style={styles.label}>(min.8 characters, 1 capitical, 1 lower and 1 symbol)</Text>
						<BlockInput
							name="password"
							placeholder="Password"
							value={state.password}
							secureTextEntry={true}
							onChange={onValueChange}
						/>

						<View style={styles.inlineView}>
							<Text style={styles.label}>Confirm password</Text>
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
						type="darkGreen"
						title="NEXT"
						disabled={!goNext || !isMatch}
						onPress={() => props.navigation.navigate("ForgotPasswordSuccess")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const ForgotPasswordNewPassword = (props:ForgotPasswordNewPasswordProps) => {
	const navigation = useNavigation();
	return <ForgotPasswordNewPasswordView {...props} navigation={navigation} />;
}
export default ForgotPasswordNewPassword