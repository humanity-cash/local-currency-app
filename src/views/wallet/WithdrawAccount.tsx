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
import { BlockInput } from "../../uielements/BlockInput";
import { BackBtn } from "../../uielements/header/BackBtn";
import { useWallet } from "../../hooks/useWallet";
import { makeId } from "../../utils/common";
import { IMap, TransactionType } from "../../utils/types";

interface WithdrawAccountState extends IMap {
  number: string;
  ownerName: string;
}

type WithdrawAccountProps = {
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

const WithdrawAccountView = (props: WithdrawAccountProps) => {
  const { details, updateWithdraw } = usePaymentDetails();
  const { wallet, updateAmount, addTransaction } = useWallet();
  const [state, setState] = useState<WithdrawAccountState>({
    number: "",
    ownerName: "",
  });
  const [goNext, setGoNext] = useState(false);

  useEffect(() => {
    setGoNext(Object.keys(state).every((key) => state[key] !== ""));
  }, [state]);

  useEffect(() => {
    setState({
      number: details.withdrawDetails.number,
      ownerName: details.withdrawDetails.ownerName,
    });
  }, [details]);

  const onValueChange = (name: any, change: any) => {
    setState({
      ...state,
      [name]: change,
    } as any);
    updateWithdraw({ [name]: change });
  };

  const onConfirmPinSuccess = () => {
    updateAmount(wallet.amount - parseFloat(details.amount));
    addTransaction({
      id: makeId(),
      price: parseFloat(details.amount),
      account: details.withdrawDetails.number,
      type: TransactionType.WITHDRAW,
      created: new Date(),
    });
    props.route.params.onClose();
  };

  return (
    <View style={modalViewBase}>
      <ModalHeader
        leftComponent={<BackBtn onClick={props.navigation.goBack} />}
        rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={{ paddingBottom: 40 }}>
          <View style={baseHeader}>
            <Text style={styles.header}>Enter your bank account details</Text>
          </View>
          <View style={styles.view}>
            <Text h3>IBAN</Text>
            <BlockInput
              name="number"
              placeholder="Card number (e.g. 1234 5678 9876 5432)"
              value={state.number}
              keyboardType="number-pad"
              onChange={onValueChange}
            />
            <Text h3>NAME account holder</Text>
            <BlockInput
              name="ownerName"
              placeholder="Name"
              value={state.ownerName}
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
            props.navigation.navigate("WithdrawConfirmPin", {
              onSuccess: onConfirmPinSuccess,
            });
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const WithdrawAccount = (props: WithdrawAccountProps) => {
  const navigation = useNavigation();
  return <WithdrawAccountView {...props} navigation={navigation} />;
};
export default WithdrawAccount;
