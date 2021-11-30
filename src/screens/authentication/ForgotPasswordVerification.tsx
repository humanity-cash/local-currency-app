import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
	SafeAreaView
} from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/contexts";
import { ForgotPassword } from "src/auth/types";
import {
	BackBtn,
	CancelBtn,
	ConfirmationCode,
	Header
} from "src/shared/uielements";
import {
	baseHeader,
	viewBase,
	wrappingContainerBase
} from "src/theme/elements";

const styles = StyleSheet.create({
	modalHeader: {
		fontSize: 32,
		fontWeight: "400",
		lineHeight: 40,
	},
	modalDescription: {
		paddingBottom: 30,
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20,
	},
	bottomNavigation: {
		alignSelf: "center",
	},
	sendCodeBtn: {
		marginBottom: 30,
	},
});

const ForgotPasswordVerification = () => {
	const navigation = useNavigation();
	const {
		forgotPasswordDetails: { email },
		setForgotPasswordDetails,
	} = useContext(AuthContext);

	const onComplete = async (text: string) => {
		setForgotPasswordDetails((pv: ForgotPassword) => ({
			...pv,
			verificationCode: text,
		}));
		navigation.navigate("ForgotPasswordNewCode");
		return;
	};

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
						Verify your mail address
					</Text>
				</View>
				<View style={styles.modalDescription}>
					<Text>
						We have sent an email with a verification code to{" "}
						{email}.
					</Text>
					<ConfirmationCode onComplete={onComplete} />
				</View>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<SafeAreaView style={styles.bottomView}>
					<TouchableOpacity
						style={styles.sendCodeBtn}
						onPress={() => {
							Keyboard.dismiss();
						}}>
						<Text style={styles.bottomNavigation}>
							Send code again
						</Text>
					</TouchableOpacity>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default ForgotPasswordVerification;
