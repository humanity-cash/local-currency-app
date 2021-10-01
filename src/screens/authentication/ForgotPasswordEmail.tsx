import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View
} from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import { BlockInput, Button, Header, BackBtn } from "src/shared/uielements";
import { viewBase, baseHeader } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from "src/constants";

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
  label: {
    fontSize: 10
  },
  bottomView: {
		padding: 20,
		paddingBottom: 45
	},
});

const ForgotPasswordEmail = (): JSX.Element => {
  const navigation = useNavigation();
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
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>

      <ScrollView style={styles.container}>
        <View style={ baseHeader }>
					<Text style={styles.modalHeader}>{Translation.FORGOT_PASSWORD.FORGOT_PASSWORD}</Text>
				</View>
        <Text style={styles.modalDescription}>
          {Translation.FORGOT_PASSWORD.FORGOT_PASSWORD_DETAIL}
        </Text>
        <Text style={styles.label}>{Translation.LABEL.EMAIL_ADDR}</Text>
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
            type={BUTTON_TYPES.DARK_GREEN}
            title={Translation.BUTTON.NEXT}
            disabled={!goNext}
            onPress={() =>
              navigation.navigate(Routes.FORGOT_PASSWORD_VERIFICATION)
            }
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPasswordEmail;
