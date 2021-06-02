import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Keyboard,
} from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../uielements/Button";
import {
  modalViewBase,
  baseHeader,
  wrappingContainerBase,
} from "../../theme/elements";
import { usePaymentDetails } from "../../hooks/usePaymentDetails";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { MODAL_SCREEN_OFFSET } from "../../uielements/Modal";
import { BorderedInput } from "../../uielements/BorderedInput";
import { useWallet } from "../../hooks/useWallet";
import { colors } from "../../theme/colors";
import { IMap } from "../../utils/types";

interface WithdrawCashState extends IMap {
  amount: string;
}

type WithdrawCashProps = {
  navigation?: any;
  route?: any;
};

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
  },
  header: {
    fontFamily: "IBMPlexSansBold",
    fontSize: 20,
  },
  text: {
    fontSize: 20,
    lineHeight: 60,
    marginRight: 10,
    fontFamily: "IBMPlexSansSemiBold",
  },
});

const WithdrawCashView = (props: WithdrawCashProps) => {
  const { update } = usePaymentDetails();
  const { wallet } = useWallet();
  const [state, setState] = useState<WithdrawCashState>({
    amount: "0",
  });
  const [goNext, setGoNext] = useState(false);
  const [lowBalance, setLowBalance] = useState(false);

  useEffect(() => {
    update({ amount: state.amount });
  }, []);

  useEffect(() => {
    setGoNext(
      Object.keys(state).every(
        (key) => state[key] !== "" && parseInt(state[key]) > 0
      )
    );
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
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={{ paddingBottom: 40 }}>
          <View style={baseHeader}>
            <Text style={styles.header}>Withdraw cash</Text>
          </View>
          <View style={styles.view}>
            {lowBalance && (
              <Text h3 style={{ color: colors.textWarning }}>
                Sorry, that exceeds your wallet balance
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
            if (wallet.amount < parseFloat(state.amount)) {
              setLowBalance(true);
              return;
            }
            props.navigation.navigate("WithdrawAccount");
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const WithdrawCash = (props: WithdrawCashProps) => {
  const navigation = useNavigation();
  return <WithdrawCashView {...props} navigation={navigation} />;
};
export default WithdrawCash;
