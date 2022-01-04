import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native-elements";
import {
  Header,
  Button,
  CancelBtn,
  BackBtn,
  BorderedInput,
} from "src/shared/uielements";
import {
  baseHeader,
  viewBaseB,
  wrappingContainerBase,
} from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from "src/translation/en.json";
import * as Routes from "src/navigation/constants";
import { useNavigation } from "@react-navigation/core";
import { BUTTON_TYPES } from "src/constants";

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 40,
    color: colors.purple,
  },
  text: {
    color: colors.bodyText,
  },
  switchView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentView: {
    marginTop: 5,
  },
  label: {
    marginTop: 20,
    color: colors.bodyText,
    fontSize: 12,
  },
  transactionDetail: {
    backgroundColor: colors.white,
    borderRadius: 3,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  amountText: {
    fontSize: 32,
    lineHeight: 32,
    textAlign: "center",
    color: colors.purple,
  },
  detailView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailText: {
    fontSize: 10,
    color: colors.bodyText,
  },
  input: {
    backgroundColor: colors.white,
    color: colors.purple,
  },
  inputText: {
    color: colors.purple,
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

const transactionInfo = {
  id: "015741EEFD444",
  amount: 14.34,
  type: "CUSTOMER SALE",
  date: "4:22, JUN 17, 2021",
};

const CashierReturn = (): JSX.Element => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState<string>("");
  const [goNext, setGoNext] = useState<boolean>(false);

  useEffect(() => {
    setGoNext(Number(amount) > 0);
  }, [amount]);

  const onValueChange = (name: string, change: string) => {
    setAmount(change.replace(",", "."));
  };

  const onReturn = () => {
    navigation.navigate(Routes.CASHIER_PAYMENT_PENDING);
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
            {Translation.CASHIER.MAKE_RETURN}
          </Text>
          <Text style={styles.text}>
            {Translation.CASHIER.MAKE_RETURN_DETAIL}
          </Text>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.label}>
            {Translation.LABEL.TRANSACTION_DETAILS}
          </Text>
          <View style={styles.transactionDetail}>
            <Text h1 style={styles.amountText}>
              B$ {transactionInfo.amount.toFixed(2)}
            </Text>
            <View style={styles.detailView}>
              <Text style={styles.detailText}>
                {Translation.PAYMENT.TRANSACTION_ID}
              </Text>
              <Text style={styles.detailText}>{transactionInfo.id}</Text>
            </View>
            <View style={styles.detailView}>
              <Text style={styles.detailText}>{Translation.COMMON.TYPE}</Text>
              <Text style={styles.detailText}>{transactionInfo.type}</Text>
            </View>
            <View style={styles.detailView}>
              <Text style={styles.detailText}>{Translation.COMMON.DATE}</Text>
              <Text style={styles.detailText}>{transactionInfo.date}</Text>
            </View>
          </View>

          <Text style={styles.label}>{Translation.LABEL.RETURN_AMOUNT}</Text>
          <BorderedInput
            label="Amount"
            name="amount"
            keyboardType="decimal-pad"
            placeholder="Amount"
            placeholderTextColor={colors.greyedPurple}
            prefix="B$"
            style={styles.input}
            textStyle={styles.inputText}
            value={amount}
            onChange={onValueChange}
          />
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type={BUTTON_TYPES.PURPLE}
          disabled={!goNext}
          title={Translation.BUTTON.RETURN_AMOUNT}
          onPress={onReturn}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CashierReturn;
