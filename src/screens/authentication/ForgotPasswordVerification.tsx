import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View
} from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/auth";
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
		padding: 20,
		paddingBottom: 45,
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
				<View style={styles.bottomView}>
					<TouchableOpacity
						style={styles.sendCodeBtn}
						onPress={() => {
							Keyboard.dismiss();
						}}>
						<Text style={styles.bottomNavigation}>
							Send code again
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default ForgotPasswordVerification;
