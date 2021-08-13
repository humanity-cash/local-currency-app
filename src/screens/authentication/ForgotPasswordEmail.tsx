import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View
} from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import { BlockInput, Button, CancelBtn, Header, BackBtn } from "src/shared/uielements";
import { viewBase, baseHeader } from "src/theme/elements";
import { colors } from "src/theme/colors";

const MAIN_PHONE_COUNTRY = "+41";

type ForgotPasswordEmailProps = {
  navigation?: any;
  route?: any;
};

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

const ForgotPasswordEmailView = (props: ForgotPasswordEmailProps) => {
  const { personalDetails, updatePersonalDetails } = useUserDetails();
  const [email, setEmail] = useState<string>("");
  const [goNext, setGoNext] = useState(false);

  useEffect(() => {
    setGoNext(email !== "");
  }, [email]);

  useEffect(() => {
    setEmail(personalDetails.email);
  }, [personalDetails]);

  const onValueChange = (name: string, change: string) => {
    setEmail(change)
    updatePersonalDetails({ email: change });
  };

  return (
    <View style={viewBase}>
      <Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Login')} />}
			/>

      <ScrollView style={styles.container}>
        <View style={ baseHeader }>
					<Text style={styles.modalHeader}>Forgot password</Text>
				</View>
        <Text style={styles.modalDescription}>
          Enter phone number of the account you would like to change the
          passcode of.
        </Text>
        <Text h3>EMAIL ADDRESS</Text>
        <View>
          <BlockInput
            placeholder="Email"
            name="email"
            value={email}
            onChange={onValueChange}
          />
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.bottomView}>
          <Button
            type="darkGreen"
            title="NEXT"
            disabled={!goNext}
            onPress={() =>
              props.navigation.navigate("ForgotPasswordVerification")
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const ForgotPasswordEmail = (props: ForgotPasswordEmailProps) => {
  const navigation = useNavigation();
  return <ForgotPasswordEmailView navigation={navigation} {...props} />;
};
export default ForgotPasswordEmail;