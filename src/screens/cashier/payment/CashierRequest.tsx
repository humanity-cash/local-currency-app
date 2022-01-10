import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView
} from "react-native";
import { Text } from "react-native-elements";
import {
  Header,
  Button,
  CancelBtn,
  BackBtn,
  BorderedInput
} from "src/shared/uielements";
import {
  baseHeader,
  viewBaseB,
  wrappingContainerBase
} from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from "src/translation/en.json";
import * as Routes from "src/navigation/constants";
import { BUTTON_TYPES } from "src/constants";
import { PaymentsModule } from "src/modules";
import { UserContext, WalletContext } from "src/contexts";
import { PaymentRequestSuccess } from "src/views";

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    fontWeight: "400",
    color: colors.purple,
    lineHeight: 40
  },
  switchView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentView: {
    marginTop: 5
  },
  label: {
    marginTop: 20,
    color: colors.bodyText,
    fontSize: 12
  },
  input: {
    backgroundColor: colors.white,
    color: colors.purple
  },
  text: {
    color: colors.purple
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20
  }
});

const CashierRequest = (): JSX.Element => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState<string>("");
  const [goNext, setGoNext] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [receivedAmount, setReceivedAmount] = useState<number>(0);
  const [isRequestSuccess, setIsRequestSuccess] = useState<boolean>(false);
  const { businessDwollaId, user } = useContext(UserContext);
  const { updateBusinessWalletData } = useContext(WalletContext);

  useEffect(() => {
    const timerId = setInterval(async () => {
      if (businessDwollaId) {
        updateBusinessWalletData(businessDwollaId);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [businessDwollaId]);

  useEffect(() => {
    setAmount("");
  }, []);

  useEffect(() => {
    setGoNext(Number(amount) > 0);
  }, [amount]);

  const onValueChange = (_: string, change: string) => {
    setAmount(change.replace(",", "."));
  };

  const requestAmount = () => {
    setIsVisible(true);
  };

  const onSuccess = (amount: number) => {
    setReceivedAmount(amount);
    setIsVisible(false);
    setIsRequestSuccess(true);
  };

  const onConfirm = () => {
    setIsRequestSuccess(false);
    navigation.navigate(Routes.CASHIER_DASHBOARD);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={viewBaseB}
    >
      <Header
        leftComponent={
          <BackBtn color={colors.purple} onClick={() => navigation.goBack()} />
        }
        rightComponent={
          <CancelBtn
            color={colors.purple}
            text={Translation.BUTTON.CLOSE}
            onClick={() => navigation.navigate(Routes.CASHIER_DASHBOARD)}
          />
        }
      />
      <ScrollView style={wrappingContainerBase}>
        <View style={baseHeader}>
          <Text style={styles.headerText}>
            {Translation.CASHIER.RECEIVE_PAYMENT}
          </Text>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.label}>{Translation.LABEL.AMOUNT1}</Text>
          <BorderedInput
            label="Amount"
            name="amount"
            keyboardType="decimal-pad"
            placeholder="Amount"
            placeholderTextColor={colors.greyedPurple}
            prefix="B$"
            style={styles.input}
            textStyle={styles.text}
            value={amount}
            onChange={onValueChange}
          />
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type={BUTTON_TYPES.TRANSPARENT}
          title={Translation.BUTTON.HOW_TO_WORK}
          textStyle={styles.text}
          onPress={() => navigation.navigate(Routes.CASHIER_HOW_TO_WORK)}
        />
        <Button
          type={BUTTON_TYPES.PURPLE}
          disabled={!goNext}
          title="Next"
          onPress={requestAmount}
        />
      </SafeAreaView>
      {isVisible && (
        <PaymentsModule.Request
          visible={isVisible}
          onSuccess={onSuccess}
          onClose={onClose}
          isOpenAmount={false}
          amount={Number(amount)}
          ownerName={user?.business?.tag || ""}
        />
      )}
      {isRequestSuccess && (
        <PaymentRequestSuccess
          visible={isRequestSuccess}
          onClose={onConfirm}
          amount={receivedAmount}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default CashierRequest;
