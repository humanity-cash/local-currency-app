/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Keyboard, KeyboardAvoidingView,
  Platform, ScrollView, StyleSheet, View
} from "react-native";
import { Text } from "react-native-elements";
import { usePaymentDetails } from "src/hooks";
import { BackBtn, BorderedInput, Button, CancelBtn, ModalHeader } from "src/shared/uielements";
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { colors } from "src/theme/colors";
import {
  baseHeader, modalViewBase, wrappingContainerBase
} from "src/theme/elements";
import { IMap } from "src/utils/types";

interface MissingAddCashState extends IMap {
  amount: string;
}

type AddCashProps = {
  navigation?: any;
  route?: any;
};

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    lineHeight: 60,
    marginRight: 10,
    fontFamily: "IBMPlexSansSemiBold",
  },
});

const MissingAddCashView = (props: AddCashProps) => {
  const { update } = usePaymentDetails();
  const [state, setState] = useState<MissingAddCashState>({
    amount: "1000",
  });
  const [goNext, setGoNext] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    update({ amount: state.amount });
  }, []);

  useEffect(() => {
    setGoNext(Object.keys(state).every((key) => state[key] !== ""));
  }, [state]);

  const onValueChange = (name: any, change: any) => {
    setState({
      ...state,
      [name]: change,
    } as any);
    update({ [name]: change });
  };

  return (
    <View style={modalViewBase}>
      <ModalHeader
        rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
        leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={{ paddingBottom: 40 }}>
          <View style={baseHeader}>
            <Text h1>Add cash</Text>
          </View>
          <View style={styles.view}>
            {showError && (
              <Text h3 style={{ marginTop: 5, color: colors.textError }}>
                Minimum amount is CHF 1,000
              </Text>
            )}
            <BorderedInput
              label="Amount"
              keyboardType="number-pad"
              name="amount"
              prefix="CHF"
              value={state.amount}
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
            Keyboard.dismiss();
            if (parseFloat(state.amount) < 1000) {
              setShowError(true);
              return;
            }
            props.navigation.navigate("MissingSelectPayment");
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const MissingAddCash = (props: AddCashProps) => {
  const navigation = useNavigation();
  return <MissingAddCashView {...props} navigation={navigation} />;
};

export default MissingAddCash;
