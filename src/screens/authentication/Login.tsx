import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Header, BackBtn, BlockInput, Button } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import ForgotPassword from "./ForgotPassword";
import { colors } from "src/theme/colors";
import { IMap } from "src/utils/types";

type LoginProps = {
	navigation?: any,
	route: any
}

interface LoginForm extends IMap {
	password: string
	email: string
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35
	},
	bodyText: {
		color: colors.bodyText
	},
	form: {
		marginVertical: 30
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

//eslint-disable-next-line
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})");

//eslint-disable-next-line
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

const LoginView = (props: LoginProps) => {
	const { authorization: { touchID } } = useUserDetails();
	const isFocused = useIsFocused();
	const [autoFocus, setAutoFocus] = useState<boolean>(true);
	const [goNext, setGoNext] = useState<boolean>(true);
	const [state, setState] = useState<LoginForm>({
		email: "",
		password: ""
	})
	
	useEffect(() => {
		setGoNext(Object.keys(state).every((key) => state[key] !== "") && strongRegex.test(state.password) && emailRegex.test(state.email));
	},[state]);

	useEffect(() => {
		async function askFingerprint() {
			if (isFocused && touchID) {
				const data = await LocalAuthentication.authenticateAsync({
					disableDeviceFallback: true,
					cancelLabel: 'Close'
				});
				setAutoFocus(false);
			}
		}
		askFingerprint();

		setAutoFocus(isFocused);
	}, [isFocused, touchID]);

	const onValueChange = (name: any, change: any) => {
		setState({
			...state,
			[name]: change
		});
	};

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>Log in</Text>
				</View>
				<Text style={styles.bodyText}>Welcome back</Text>
				<View style={styles.form}>
					<Text style={styles.label}>Email address or user name</Text>
					<BlockInput
						name="email"
						placeholder="Email"
						value={state.email}
						onChange={onValueChange}
					/>
					<Text style={styles.label}>Password</Text>
					<BlockInput
						name="password"
						placeholder="Password"
						value={state.password}
						secureTextEntry={true}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<View style={styles.bottomView}>
					<Button
						type="transparent"
						title="Forgot Passowrd?"
						onPress={() => props.navigation.navigate("ForgotPassword")}
					/>
					<Button
						type="darkGreen"
						title="Log in"
						disabled={!goNext}
						onPress={() => props.navigation.navigate("SelectAccountType")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const Login = (props:LoginProps) => {
	const navigation = useNavigation();
	return <LoginView {...props} navigation={navigation} />;
}
export default Login