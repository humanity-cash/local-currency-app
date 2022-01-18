import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/contexts";
import { ForgotPassword } from "src/auth/types";
import Translation from "src/translation/en.json";
import {
  BackBtn,
  CancelBtn,
  ConfirmationCode,
  Header,
} from "src/shared/uielements";
import {
  baseHeader,
  viewBase,
  wrappingContainerBase,
} from "src/theme/elements";
import { showToast } from "src/utils/common";
import { ToastType } from "src/utils/types";

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
    marginBottom: 30,
  },
  bottomNavigation: {
    alignSelf: "center",
  },
});

const ForgotPasswordVerification = () => {
  const navigation = useNavigation();
  const {
    forgotPasswordDetails: { email },
    setForgotPasswordDetails,
    startForgotPasswordFlow,
  } = useContext(AuthContext);
  const [sentAgain, setSentAgain] = useState(false);

  const onComplete = async (text: string) => {
    setForgotPasswordDetails((pv: ForgotPassword) => ({
      ...pv,
      verificationCode: text,
    }));
    navigation.navigate("ForgotPasswordNewCode");
    return;
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === "ios" && { behavior: "padding" })}
      style={viewBase}
    >
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
            {Translation.EMAIL_VERIFICATION.VERIFY_MAIL}
          </Text>
        </View>
        <View style={styles.modalDescription}>
          <Text>
            {sentAgain
              ? Translation.EMAIL_VERIFICATION.SENT_VERIFICATION_CODE_AGAIN.replace(
                  "{{mail}}",
                  email
                )
              : Translation.EMAIL_VERIFICATION.SENT_VERIFICATION_CODE.replace(
                  "{{mail}}",
                  email
                )}
          </Text>
          <ConfirmationCode onComplete={onComplete} />
        </View>
      </View>
      <SafeAreaView style={styles.bottomView}>
        <TouchableOpacity
          onPress={async () => {
            Keyboard.dismiss();
            const response = await startForgotPasswordFlow();
            if (response.success) {
              showToast(ToastType.SUCCESS, "Code sent again!", "");
            } else {
              showToast(ToastType.ERROR, "Something went wrong!", "");
            }
          }}
        >
          <Text style={styles.bottomNavigation}>
            {Translation.EMAIL_VERIFICATION.SEND_CODE}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordVerification;
