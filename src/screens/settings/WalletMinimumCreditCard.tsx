import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform, ScrollView, StyleSheet, View
} from "react-native";
import { Text } from "react-native-elements";
import { usePaymentDetails, useWallet } from "src/hooks";
import { BackBtn, BlockInput, Button, CancelBtn, ModalHeader } from "src/shared/uielements";
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { colors } from "src/theme/colors";
import {
    baseHeader, modalBaseHeader, modalViewBase, wrappingContainerBase
} from "src/theme/elements";
import { IMap } from "src/utils/types";

interface WalletMinimumCreditCardState extends IMap {
  number: string;
  expireMonth: string;
  expireYear: string;
  cvc: string;
}

type WalletMinimumCreditCardProps = {
  navigation?: any;
  route?: any;
};

const styles = StyleSheet.create({
  view: {
    marginTop: 15,
  },
  text: {
    fontSize: 20,
    lineHeight: 60,
    flex: 1,
    fontFamily: "IBMPlexSansSemiBold",
  },
  arrow: {
    marginVertical: 15,
  },
  headerView: {
    fontFamily: "IBMPlexSansSemiBold",
    fontSize: 20,
    marginBottom: 5,
  },
  bottomNavigation: {
    justifyContent: "center",
    color: colors.brown,
    marginLeft: 2,
  },
  bottomView: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  dateInput: {
    width: "35%",
    marginRight: 10,
    padding: 0,
    justifyContent: "center",
    textAlignVertical: "center",
    textAlign: "center",
  },
  cvcInput: {
    width: "60%",
    marginRight: 5,
    textAlign: "center",
  },
});

const WalletMinimumCreditCard = (props: WalletMinimumCreditCardProps) => {
  const navigation = useNavigation();
  const { addCard } = usePaymentDetails();
  const { wallet, updateMinimum } = useWallet();
  const [goNext, setGoNext] = useState(false);
  const [state, setState] = useState<WalletMinimumCreditCardState>({
    number: "",
    expireMonth: "",
    expireYear: "",
    cvc: "",
  });
  const { amount, cardId, onClose } = props.route.params;

  useEffect(() => {
    setState({
      number: wallet.minimum.number,
      expireMonth: wallet.minimum.expireMonth,
      expireYear: wallet.minimum.expireYear,
      cvc: wallet.minimum.cvc,
    });
  }, [wallet]);

  useEffect(() => {
    setGoNext(Object.keys(state).every((key) => state[key] !== ""));
  }, [state]);

  const onSuccess = () => {
    updateMinimum({
      ...state,
      amount: parseFloat(amount),
    });
    if (!cardId) {
      addCard();
    }
    props.route.params.onClose();
  };

  const onValueChange = (name: any, change: any) => {
    setState({
      ...state,
      [name]: change,
    } as any);
    setGoNext(Object.keys(state).every((key) => state[key] !== ""));
  };

  return (
    <View style={modalViewBase}>
      <ModalHeader
        rightComponent={<CancelBtn onClick={onClose} />}
        leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={{ paddingBottom: 40 }}>
          <View style={baseHeader}>
            <Text style={modalBaseHeader}>Credit card details</Text>
          </View>
          <View style={styles.view}>
            <View>
              <Text h3>Card number</Text>
              <BlockInput
                name="number"
                placeholder="Card number (e.g. 1234 5678 9876 5432)"
                value={state.number}
                keyboardType="number-pad"
                onChange={onValueChange}
              />
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text h3>Expiration date</Text>
                  <View style={{ flexDirection: "row" }}>
                    <BlockInput
                      name="expireMonth"
                      placeholder="MM"
                      maxLength={2}
                      keyboardType="number-pad"
                      value={state.expireMonth}
                      onChange={onValueChange}
                      style={styles.dateInput}
                    />
                    <BlockInput
                      name="expireYear"
                      placeholder="YY"
                      maxLength={2}
                      keyboardType="number-pad"
                      value={state.expireYear}
                      onChange={onValueChange}
                      style={styles.dateInput}
                    />
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <Text h3>CvC code</Text>
                  <BlockInput
                    name="cvc"
                    placeholder="123"
                    keyboardType="number-pad"
                    value={state.cvc}
                    maxLength={3}
                    onChange={onValueChange}
                    style={styles.cvcInput}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
      >
        <View style={styles.bottomView}>
          <AntDesign
            style={styles.arrow}
            name="lock"
            size={20}
            color={colors.brown}
          />
          <Text style={styles.bottomNavigation}>
            Card details are stored securely
          </Text>
        </View>
        <Button
          type="fluidDark"
          title="NEXT"
          disabled={!goNext}
          onPress={() => {
            props.navigation.navigate("WalletConfirmPin", { onSuccess });
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default WalletMinimumCreditCard;
