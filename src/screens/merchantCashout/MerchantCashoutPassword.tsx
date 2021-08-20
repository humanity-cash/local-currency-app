import { useIsFocused, useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Header, BackBtn, BlockInput, Button } from "src/shared/uielements";
import { baseHeader, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type MerchantCashoutPasswordProps = {
	navigation?: any,
	route: any
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.purple,
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
    input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
    forgotText: {
        color: colors.purple,
        textDecorationLine: 'underline'
    },
	bottomView: {
		paddingHorizontal: 20,
    	paddingBottom: 50
	},
});

//eslint-disable-next-line
const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})");

const MerchantCashoutPasswordView = (props: MerchantCashoutPasswordProps) => {
	const { authorization: { touchID } } = useUserDetails();
    const isFocused = useIsFocused();
    const [autoFocus, setAutoFocus] = useState<boolean>(true);
	const [goNext, setGoNext] = useState<boolean>(true);
	const [password, setPassword] = useState<string>("");
	
	useEffect(() => {
		setGoNext(password !== "" && strongRegex.test(password));
	},[password]);

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
		setPassword(change);
	};

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>Verify with password</Text>
				</View>
				<View style={styles.form}>
					<Text style={styles.label}>PASSWORD</Text>
					<BlockInput
						name="password"
						placeholder="Password"
						value={password}
						secureTextEntry={true}
                        style={styles.input}
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
                        textStyle={styles.forgotText}
						onPress={() => props.navigation.navigate("ForgotPassword")}
					/>
					<Button
						type="purple"
						title="Confirm"
						disabled={!goNext}
						onPress={() => props.navigation.navigate("MerchantRedemptionInProgress")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const MerchantCashoutPassword = (props:MerchantCashoutPasswordProps) => {
	const navigation = useNavigation();
	return <MerchantCashoutPasswordView {...props} navigation={navigation} />;
}
export default MerchantCashoutPassword