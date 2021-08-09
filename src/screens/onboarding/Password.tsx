import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { BackBtn, Header, BlockInput, Button } from "src/shared/uielements";
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import { IMap } from "src/utils/types";
import { colors } from "src/theme/colors";

type PasswordProps = {
	navigation?: any
	route?: any
}

interface PasswordForm extends IMap {
	password: string
	confirmPassword: string
}

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

//eslint-disable-next-line
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const PasswordView = (props: PasswordProps) => {
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
		<View style={viewBaseWhite}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>Create a password</Text>
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
						onPress={() => props.navigation.navigate("Teaser")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const Password = (props:PasswordProps) => {
	const navigation = useNavigation();
	return <PasswordView {...props} navigation={navigation} />;
}
export default Password