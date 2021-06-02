import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../uielements/Button";
import { BlockInput } from "../../uielements/BlockInput";
import { useUserDetails } from "../../hooks/useUserDetails";
import {
  baseHeader,
  modalBaseHeader,
  viewBase,
  wrappingContainerBase,
} from "../../theme/elements";
import { colors } from "../../theme/colors";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { MODAL_SCREEN_OFFSET } from "../../uielements/Modal";
import { IMap } from "../../utils/types";

const EMAIL_VALIDATION = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

interface ChangeEmailState extends IMap {
  email: string;
}

type ChangeEmailProps = {
  navigation?: any;
  route?: any;
};

const styles = StyleSheet.create({
  modalHeader: {
    fontFamily: "IBMPlexSansSemiBold",
    fontSize: 20,
    paddingBottom: 10,
  },
  codeView: {
    flex: 1,
    paddingTop: 30,
  },
});

const ChangeEmail = (props: ChangeEmailProps) => {
  const navigation = useNavigation();
  const { personalDetails, updatePersonalDetails } = useUserDetails();
  const [emailValid, setEmailValid] = useState(true);
  const [state, setState] = useState<ChangeEmailState>({
    email: "",
  });
  const [goNext, setGoNext] = useState(false);

  useEffect(() => {
    setGoNext(
      emailValid && Object.keys(state).every((key) => state[key] !== "")
    );
  }, [state, emailValid]);

  useEffect(() => {
    setState({
      email: personalDetails.email,
    });
  }, [personalDetails]);

  const onValueChange = (name: any, change: any) => {
    if (!emailValid) {
      setEmailValid(EMAIL_VALIDATION.test(change));
    }
    setState({
      ...state,
      [name]: change,
    } as any);
  };

  const onSuccess = () => {
    updatePersonalDetails({ email: state.email, emailVerified: false });
    navigation.navigate("ChangeEmailConfirm");
  };

  return (
    <View style={viewBase}>
      <ModalHeader
        rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={{ paddingBottom: 40 }}>
          <Text style={modalBaseHeader}>Edit your email address</Text>
          <View style={styles.codeView}>
            <Text h3>Your email address</Text>
            {!emailValid && (
              <Text h3 style={{ marginTop: 5, color: colors.textError }}>
                Please enter valid email address
              </Text>
            )}
            <BlockInput
              name="email"
              placeholder="name@example.com"
              keyboardType="email-address"
              value={state.email}
              onChange={onValueChange}
            />
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
      >
        <Button
          type="fluidDark"
          title="NEXT"
          disabled={!goNext}
          onPress={() => {
            const isEmailValid = EMAIL_VALIDATION.test(state.email);
            setEmailValid(isEmailValid);
            if (!isEmailValid) {
              return;
            }
            navigation.navigate("ChangeEmailPasscode", { onSuccess });
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChangeEmail;
