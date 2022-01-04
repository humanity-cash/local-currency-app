import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import { BackBtn, Header, NextBtn } from "src/shared/uielements";
import {
  baseHeader,
  viewBase,
  wrappingContainerBase,
} from "src/theme/elements";

const styles = StyleSheet.create({
  codeView: {
    flex: 1,
  },
  bottomNavigation: {
    justifyContent: "center",
  },
  bottomView: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ConfirmEmail = (): React.ReactElement => {
  const navigation = useNavigation();
  const [noCodeReceived, setNoCodeReceived] = useState(false);
  const {
    personalDetails: { email, emailVerified },
    updatePersonalDetails,
  } = useUserDetails();

  useEffect(() => {
    updatePersonalDetails({ emailVerified: false });
  }, [noCodeReceived]);

  useEffect(() => {
    setTimeout(() => {
      if (!emailVerified) {
        updatePersonalDetails({ emailVerified: true });
      }
    }, 6000);
  }, [noCodeReceived, emailVerified]);

  useEffect(() => {
    if (emailVerified) {
      navigation.navigate("EmailConfirmed");
    }
  }, [emailVerified]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={viewBase}
    >
      <Header
        leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
        rightComponent={
          <NextBtn
            text="Skip"
            onClick={() => navigation.navigate("OnboardingSteps", { step: 4 })}
          />
        }
      />

      <View style={{ ...wrappingContainerBase, flex: 1 }}>
        <View style={{ ...baseHeader }}>
          <Text h1>Confirm your email address</Text>
        </View>
        <View style={styles.codeView}>
          {!noCodeReceived && (
            <Text>
              We just sent an email to {email} with a verification link. Please
              click the link to verify your email address. Check your spam
              folder if you can’t find our email.
            </Text>
          )}
          {noCodeReceived && (
            <Text>
              We just sent another email to {email} with a verification link.
            </Text>
          )}
        </View>
      </View>
      {!noCodeReceived ? (
        <SafeAreaView style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => {
              setNoCodeReceived(true);
            }}
          >
            <Text style={styles.bottomNavigation}>
              Resend verification email
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.bottomView}>
          <TouchableOpacity
            onPress={() => navigation.navigate("VerificationHelp")}
          >
            <Text style={styles.bottomNavigation}>Need help?</Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
};

export default ConfirmEmail;
