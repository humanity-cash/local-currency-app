import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from "expo-local-authentication";
import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useUserDetails } from "src/hooks";
import { Header, BackBtn, BlockInput, Button } from "src/shared/uielements";
import { baseHeader, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

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
	const [goNext, setGoNext] = useState<boolean>(true);
	const [password, setPassword] = useState<string>("");
	
	useEffect(() => {
		setGoNext(password !== "" && strongRegex.test(password));
	},[password]);

	useEffect(() => {
		async function askFingerprint() {
			if (touchID) {
				const data = await LocalAuthentication.authenticateAsync({
					disableDeviceFallback: true,
					cancelLabel: 'Close'
				});
				console.log(data);
			}
		}
		askFingerprint();
	}, [touchID]);

	const onValueChange = (name: string, change: string) => {
		setPassword(change);
	};

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => props.navigation.goBack()} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>{Translation.COMMON.VERIFY_PASSOWRD}</Text>
				</View>
				<View style={styles.form}>
					<Text style={styles.label}>{Translation.LABEL.PASSWORD}</Text>
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
						title={Translation.BUTTON.FORGOT_PASSWORD}
                        textStyle={styles.forgotText}
						onPress={() => props.navigation.navigate(Routes.FORGOT_PASSWORD)}
					/>
					<Button
						type="purple"
						title={Translation.BUTTON.CONFIRM}
						disabled={!goNext}
						onPress={() => props.navigation.navigate(Routes.MERCHANT_REDEMPTION_IN_PROGRESS)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

const MerchantCashoutPassword = (props:MerchantCashoutPasswordProps): ReactElement => {
	const navigation = useNavigation();
	return <MerchantCashoutPasswordView {...props} navigation={navigation} />;
}
export default MerchantCashoutPassword