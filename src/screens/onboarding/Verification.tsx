import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/contexts";
import { BUTTON_TYPES } from "src/constants";
import * as Constants from "src/constants"
import * as Routes from "src/navigation/constants";
import {
  BackBtn,
  Button,
  ConfirmationCode,
  Header,
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  baseHeader,
  viewBase,
  wrappingContainerBase,
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { FontFamily } from '../../theme/elements';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 32,
    color: colors.darkGreen,
    lineHeight: 32,
  },
  bodyText: {
    color: colors.bodyText,
  },
  codeView: {
    flex: 1,
    marginTop: 25,
  },
  bottomNavigation: {
    alignSelf: "center",
    color: colors.darkGreen,
    fontFamily: FontFamily.bold,
  },
  needHelpNavigation: {
    textAlign: "center",
    fontSize: 12,
    color: colors.darkGreen,
    fontFamily: FontFamily.bold,
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

const Verification = (): JSX.Element => {
  const navigation = useNavigation();
  const { emailVerification, resendEmailVerificationCode } =
    useContext(AuthContext);
  const [noCodeReceived, setNoCodeReceived] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(1)
  const [goNext, setGoNext] = useState<boolean>(false);
  const {
    signUpDetails: { email },
  } = useContext(AuthContext);

  const onComplete = async (text: string) => {
    if (text?.length < 5) return;
    const response = await emailVerification(text);
    if (response.success) {
      setGoNext(true);
    }
  };
  
  const onPressSendAgain = () => {
    resendEmailVerificationCode();
    if( retryCount < Constants.MAX_RESEND_CODE_COUNT ) {
      setRetryCount(retryCount+1)
    } else {
      setNoCodeReceived(true);
    }
  }

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === "ios" && { behavior: "padding" })}
      style={viewBase}
    >
      <Header leftComponent={<BackBtn onClick={() => navigation.goBack()} />} />

      <ScrollView style={wrappingContainerBase}>
        <View style={styles.container}>
          <View style={baseHeader}>
            {retryCount > 1 ? (
              <Text style={styles.headerText}>
                {Translation.EMAIL_VERIFICATION.ENTER_VERIFICATION_CODE}
              </Text>
            ) : (
              <Text style={styles.headerText}>
                {Translation.EMAIL_VERIFICATION.VERIFY_MAIL}
              </Text>
            )}
          </View>
          <Text style={styles.bodyText}>
            {retryCount > 1
              ? Translation.EMAIL_VERIFICATION.SENT_VERIFICATION_CODE_AGAIN.replace(
                  "{{mail}}",
                  email
                )
              : Translation.EMAIL_VERIFICATION.SENT_VERIFICATION_CODE.replace(
                  "{{mail}}",
                  email
                )}
          </Text>
          <View style={styles.codeView}>
            <ConfirmationCode onComplete={onComplete} />
          </View>
        </View>
      </ScrollView>

      <SafeAreaView style={styles.bottomView}>
        {!noCodeReceived && (
          <TouchableOpacity
            style={{marginBottom: 30}}
            onPress={onPressSendAgain}
          >
            <Text style={styles.bottomNavigation}>
              {Translation.EMAIL_VERIFICATION.SEND_CODE}
            </Text>
          </TouchableOpacity>
        )}
        {noCodeReceived && (
          <TouchableOpacity
            style={{marginBottom: 30}}
            onPress={() => {
              navigation.navigate(Routes.VERIFICATION_HELP)
            }}
          >
            <View style={{alignSelf: 'center'}}>
              <Text style={styles.bottomNavigation}>
                {Translation.EMAIL_VERIFICATION.NEED_HELP}
              </Text>
              <Text style={styles.needHelpNavigation}>
                (Did you sign up with your correct email?)
              </Text>
            </View>
          </TouchableOpacity>
        )}
        <Button
          type={BUTTON_TYPES.DARK_GREEN}
          title="NEXT"
          disabled={!goNext}
          onPress={() => navigation.navigate(Routes.EMAIL_CONFIRMED)}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Verification;
