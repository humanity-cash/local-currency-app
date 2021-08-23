import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, BackBtn, BlockInput, Button } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import { IMap } from "src/utils/types";

import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

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
	const [goNext, setGoNext] = useState<boolean>(true);
	const [state, setState] = useState<LoginForm>({
		email: "",
		password: ""
	})
	
	useEffect(() => {
		setGoNext(Object.keys(state).every((key) => state[key] !== "") && strongRegex.test(state.password) && emailRegex.test(state.email));
	},[state]);

	const onValueChange = (name: string, change: string) => {
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
					<Text style={styles.headerText}>{Translation.LANDING_PAGE.LOGIN}</Text>
				</View>
				<Text style={styles.bodyText}>{Translation.LANDING_PAGE.WELCOME_BACK}</Text>
				<View style={styles.form}>
					<Text style={styles.label}>{Translation.LABEL.EMAIL_USERNAME}</Text>
					<BlockInput
						name="email"
						placeholder="Email"
						value={state.email}
						onChange={onValueChange}
					/>
					<Text style={styles.label}>{Translation.LABEL.PASSWORD}</Text>
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
						onPress={() => props.navigation.navigate(Routes.FORGOT_PASSWORD)}
					/>
					<Button
						type="darkGreen"
						title="Log in"
						disabled={!goNext}
						onPress={() => props.navigation.navigate(Routes.SELECT_ACCOUNT_TYPE)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const Login = (props:LoginProps): ReactElement => {
	const navigation = useNavigation();
	return <LoginView {...props} navigation={navigation} />;
}
export default Login