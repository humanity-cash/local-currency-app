import { useNavigation } from "@react-navigation/native";
import React, { createRef, useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Text } from "react-native-elements";
import { AuthStatus, SignInInput } from "src/auth/types";
import { BUTTON_TYPES } from "src/constants";
import { AuthContext } from "src/contexts";
import * as Routes from "src/navigation/constants";
import { LoadingPage } from "src/views";
import { BackBtn, BlockInput, Button, Header } from "src/shared/uielements";
import SecurityEyeButton from "src/shared/uielements/SecurityEyeButton";
import { colors } from "src/theme/colors";
import {
  baseHeader,
  viewBase,
  wrappingContainerBase,
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { isPasswordValid } from "src/utils/validation";

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    color: colors.darkGreen,
    lineHeight: 35,
  },
  bodyText: {
    color: colors.bodyText,
  },
  form: {
    marginVertical: 30,
  },
  label: {
    fontSize: 12,
    lineHeight: 14,
    color: colors.bodyText,
    paddingTop: 10,
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  eyeView: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
});

const Login = (): JSX.Element => {
  const navigation = useNavigation();
  const {
    signIn,
    signInDetails,
    setSignInDetails,
    authStatus,
    resendEmailVerificationCode,
  } = useContext(AuthContext);
  const [goNext, setGoNext] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const passwordRef = createRef<TextInput>();
  const [isSecurity, setSecurity] = useState(true);
  const { updateSignUpDetails } = useContext(AuthContext);
  useEffect(() => {
    setGoNext(isPasswordValid(signInDetails ? signInDetails.password : ""));
  }, [signInDetails]);

  useEffect(() => {
    setLoading(authStatus === AuthStatus.Loading);
  }, [authStatus]);

  const onValueChange = (name: "email" | "password", change: string) => {
    setSignInDetails((pv: SignInInput) => ({
      ...pv,
      [name]: change,
    }));
  };

  const handleSignin = async () => {
    setLoading(true);
    const response = await signIn();
    if (response.error === "UserNotConfirmedException") {
      updateSignUpDetails(signInDetails)
      await resendEmailVerificationCode(signInDetails.email);
      navigation.navigate(Routes.VERIFICATION);
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === "ios" && { behavior: "padding" })}
      style={viewBase}
    >
      <LoadingPage visible={isLoading} isData={true} />
      <Header leftComponent={<BackBtn onClick={() => navigation.goBack()} />} />

      <ScrollView style={wrappingContainerBase}>
        <View style={baseHeader}>
          <Text style={styles.headerText}>
            {Translation.LANDING_PAGE.LOGIN}
          </Text>
        </View>
        <Text style={styles.bodyText}>
          {Translation.LANDING_PAGE.WELCOME_BACK}
        </Text>
        <View style={styles.form}>
          <Text style={styles.label}>{Translation.LABEL.EMAIL_USERNAME}</Text>
          <BlockInput
            name="email"
            placeholder="Email"
            value={signInDetails?.email}
            onChange={onValueChange}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
            keyboardType="email-address"
          />
          <Text style={styles.label}>{Translation.LABEL.CONFIRM_PASSWORD}</Text>
          <View>
            <BlockInput
              inputRef={passwordRef}
              name="password"
              placeholder="Password"
              value={signInDetails?.password}
              secureTextEntry={isSecurity}
              onChange={onValueChange}
            />
            <View style={styles.eyeView}>
              <SecurityEyeButton
                isSecurity={isSecurity}
                onPress={() => setSecurity(!isSecurity)}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView style={styles.bottomView}>
        <Button
          type={BUTTON_TYPES.TRANSPARENT}
          disabled={AuthStatus.Loading === authStatus}
          title="Forgot password"
          onPress={() => navigation.navigate(Routes.FORGOT_PASSWORD)}
        />
        <Button
          type={BUTTON_TYPES.DARK_GREEN}
          title="Log in"
          disabled={!goNext || AuthStatus.Loading === authStatus}
          onPress={handleSignin}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

// useEffect(() => {
// 	async function askFingerprint() {
// 		if (isFocused && touchID) {
// 			const data = await LocalAuthentication.authenticateAsync({
// 				disableDeviceFallback: true,
// 				cancelLabel: 'Close'
// 			});
// 			setAutoFocus(false);
// 		}
// 	}
// 	askFingerprint();

// 	setAutoFocus(isFocused);
// }, [isFocused, touchID]);

// const isFocused = useIsFocused();
// const [autoFocus, setAutoFocus] = useState<boolean>(true);
