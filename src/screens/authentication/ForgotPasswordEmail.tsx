import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/contexts";
import { ForgotPassword } from "src/auth/types";
import {
  BackBtn,
  BlockInput,
  Button,
  CancelBtn,
  Header,
} from "src/shared/uielements";
import { baseHeader, viewBase } from "src/theme/elements";
import { isEmailValid } from "src/utils/validation";
import { LoadingPage } from "src/views";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
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
});

const ForgotPasswordEmail = (): React.ReactElement => {
  const {
    forgotPasswordDetails,
    setForgotPasswordDetails,
    startForgotPasswordFlow,
  } = useContext(AuthContext);
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState<boolean>(false);

  const onValueChange = (name: string, change: string) => {
    setForgotPasswordDetails((pv: ForgotPassword) => ({
      ...pv,
      email: change,
    }));
  };

  const handleNext = async () => {
    setLoading(true);
    const response = await startForgotPasswordFlow();
    setLoading(false);
    if (response.success) {
      /**Email exist and a verification code was sent */
      navigation.navigate("ForgotPasswordNewCode");
    }
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === "ios" && { behavior: "padding" })}
      style={viewBase}
    >
      <LoadingPage visible={isLoading} isData={true} />
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
          Enter email of the account you would like to change the
          passcode of.
        </Text>
        <Text h3>EMAIL ADDRESS</Text>
        <View>
          <BlockInput
            placeholder="Email"
            name="email"
            value={forgotPasswordDetails.email}
            onChange={onValueChange}
            keyboardType="email-address"
          />
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type="darkGreen"
          title="NEXT"
          disabled={!isEmailValid(forgotPasswordDetails.email)}
          onPress={handleNext}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordEmail;
