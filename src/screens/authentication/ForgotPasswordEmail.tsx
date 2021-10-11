import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View
} from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from 'src/auth';
import { ForgotPassword } from "src/auth/types";
import { BackBtn, BlockInput, Button, CancelBtn, Header } from "src/shared/uielements";
import { baseHeader, viewBase } from "src/theme/elements";
import { isEmailValid } from "src/utils/validation";

const styles = StyleSheet.create({
  container: { 
    padding: 10 
  },
  modalHeader: {
    fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
  },
  modalDescription: {
    paddingBottom: 30,
  },
  bottomView: {
		padding: 20,
		paddingBottom: 45
	},
});

const ForgotPasswordEmail = (): React.ReactElement => {
  const { forgotPasswordDetails, setForgotPasswordDetails, startForgotPasswordFlow } = useContext(AuthContext)
  const navigation = useNavigation();

  const onValueChange = (name: string, change: string) => {
    setForgotPasswordDetails((pv: ForgotPassword) => ({ ...pv, email: change }));
  };

  const handleNext = async () => {
    const response = await startForgotPasswordFlow();
    if(response.success) {
      /**Email exist and a verification code was sent */
      navigation.navigate("ForgotPasswordVerification")
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

			<ScrollView style={styles.container}>
				<View style={baseHeader}>
					<Text style={styles.modalHeader}>Forgot password</Text>
				</View>
				<Text style={styles.modalDescription}>
					Enter phone number of the account you would like to change
					the passcode of.
				</Text>
				<Text h3>EMAIL ADDRESS</Text>
				<View>
					<BlockInput
						placeholder="Email"
						name="email"
						value={forgotPasswordDetails.email}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						title="NEXT"
						disabled={!isEmailValid(forgotPasswordDetails.email)}
						onPress={handleNext}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
  );
};

export default ForgotPasswordEmail;
