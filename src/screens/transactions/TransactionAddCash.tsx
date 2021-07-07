import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    Keyboard, KeyboardAvoidingView,
    Platform, ScrollView, StyleSheet, View
} from "react-native";
import { Text } from "react-native-elements";
import { usePaymentDetails, useTransaction, useWallet } from "src/hooks";
import { BackBtn, BorderedInput, Button, CancelBtn, ModalHeader } from "src/shared/uielements";
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { colors } from "src/theme/colors";
import {
    baseHeader, modalBaseHeader, modalViewBase, wrappingContainerBase
} from "src/theme/elements";
import { formatValue } from "src/utils/common";
import { IMap, OrderType } from "src/utils/types";

interface TransactionAddCashState extends IMap {
  amount: string;
  needed: number;
}

type TransactionAddCashProps = {
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

const TransactionAddCashView = (props: TransactionAddCashProps) => {
  const { update } = usePaymentDetails();
  const { wallet } = useWallet();
  const { transaction } = useTransaction();
  const { share } = props.route.params;

  const [state, setState] = useState<TransactionAddCashState>({
    amount: "10",
    needed: 0,
  });
  const [goNext, setGoNext] = useState(false);

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

  useEffect(() => {
    const needed = transaction.quantity * transaction.price - wallet.amount;
    setState({
      amount: needed.toString(),
      needed,
    });
  }, [transaction]);

  return (
    <View style={modalViewBase}>
      <ModalHeader
        rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
        leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={{ paddingBottom: 40 }}>
          <View style={baseHeader}>
            <Text style={modalBaseHeader}>
              Add enough cash to your wallet first
            </Text>
          </View>
          <Text>You need CHF {formatValue(state.needed)} extra.</Text>
          <View style={styles.view}>
            <BorderedInput
              label="Amount"
              keyboardType="decimal-pad"
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
          style={
            share.type === OrderType.BUY
              ? { backgroundColor: colors.textSuccess }
              : {}
          }
          onPress={async () => {
            Keyboard.dismiss();
            await update({ amount: state.amount });
            props.navigation.navigate("BuyTransactionSelectPayment");
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const TransactionAddCash = (props: TransactionAddCashProps) => {
  const navigation = useNavigation();
  return <TransactionAddCashView {...props} navigation={navigation} />;
};
export default TransactionAddCash;
