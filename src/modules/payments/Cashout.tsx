import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  SafeAreaView,
} from "react-native";
import { Text } from "react-native-elements";
import { TransactionsAPI } from "src/api";
import * as Routes from "src/navigation/constants";
import { LoadingPage } from "src/views";
import {
  BorderedInput,
  Button,
  CancelBtn,
  Dialog,
  Header,
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  dialogViewBase,
  underlineHeader,
  viewBase,
  wrappingContainerBase,
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { IMap } from "src/utils/types";
import { showToast } from "src/utils/common";
import { ToastType } from "src/utils/types";
import { CustomerCashOut, BusinessCashOut } from "src/style";
import { UserContext } from "src/contexts";
import { BUTTON_TYPES } from "src/constants";
import { UserType } from "src/auth/types";

interface CashoutState extends IMap {
  amount: string;
  costs: string;
}

interface CashOutInput {
  route: {
    params: {
      userId: string;
      walletData: { availableBalance: number };
    };
  };
}

const CashoutAmount = (props: CashOutInput): JSX.Element => {
  const { walletData, userId } = props?.route?.params;
  const { userType } = useContext(UserContext);
  const styles =
    userType === UserType.Business ? BusinessCashOut : CustomerCashOut;
  const buttonStyle = userType === UserType.Business ? BUTTON_TYPES.PURPLE : BUTTON_TYPES.DARK_GREEN;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxAmount, setMaxAmount] = useState<string>("5.00");
  const [exceed, setExceed] = useState(false);

  const [state, setState] = useState<CashoutState>({
    amount: "",
    costs: "",
  });

  const [goNext, setGoNext] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setState({ amount: "", costs: "" });
  }, []);

  useEffect(() => {
    setGoNext(Boolean(state.costs));
    setExceed(+state.costs > +maxAmount);
  }, [state]);

  useEffect(() => {
    if (userType === UserType.Business) {
      setMaxAmount(`${walletData?.availableBalance}`);
      return;
    }
    if (walletData && walletData?.availableBalance < 5) {
      setMaxAmount(`${walletData?.availableBalance}`);
    } else {
      setMaxAmount("5.00");
    }
  }, [walletData]);

  const onValueChange = (_: string, change: string) => {
    const amount = change.replace(",", ".");
    setState({
      amount: amount,
      costs: amount,
    } as CashoutState);
  };

  const viewConfirm = () => {
    setIsVisible(true);
  };

  const doCashout = async () => {
    const { amount } = state;
    if (!userId || !amount) {
      showToast(
        ToastType.ERROR,
        "Whoops, something went wrong.",
        "Connection failed."
      );

      return;
    }
    setIsVisible(false);
    setIsLoading(true);
    const response = await TransactionsAPI.withdraw(userId, {
      amount,
    });
    setIsLoading(false);

    if (response.data) {
      navigation.navigate(Routes.CASHOUT);
    } else {
      showToast(
        ToastType.ERROR,
        "Whoops, something went wrong.",
        "Connection failed."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={viewBase}
    >
      <LoadingPage visible={isLoading} isPayment={true} />
      <Header
        rightComponent={
          <CancelBtn text={"Close"} onClick={() => navigation.goBack()} />
        }
      />
      <ScrollView style={wrappingContainerBase}>
        <View style={underlineHeader}>
          <Text style={styles.headerText}>{Translation.PAYMENT.CASH_OUT}</Text>
        </View>
        <View>
          <Text>{Translation.PAYMENT.CASH_OUT_DETAIL}</Text>
          <View style={styles.formLabel}>
            <Text style={styles.labelText}>{Translation.LABEL.AMOUNT}</Text>
            <Text
              style={styles.labelText}
            >{`${Translation.LABEL.MAX_BERKSHARES} ${maxAmount}`}</Text>
          </View>
          <BorderedInput
            label="Amount"
            name="amount"
            keyboardType="decimal-pad"
            placeholder="Amount"
            prefix="B$"
            value={state.amount}
            onChange={onValueChange}
            borderColor={exceed ? colors.mistakeRed : null}
          />
          {exceed && (
            <Text style={styles.errorBalance}>
              {walletData?.availableBalance <= 5
                ? Translation.PAYMENT.PERSONAL_EXCEED_BALANCE
                : Translation.PAYMENT.PERSONAL_EXCEED_$5}
            </Text>
          )}
          <View style={styles.resultView}>
            <Text style={styles.resultText}>
              {Translation.PAYMENT.REDEMPTION_FEE} (1.5%)
            </Text>
            <Text style={styles.resultText}>
              {Translation.COMMON.USD}{" "}
              {(Number(state.amount) * 0.015).toFixed(2)}
            </Text>
          </View>
          <View style={styles.resultView}>
            <Text style={{ ...styles.resultText, fontWeight: "bold" }}>
              {Translation.PAYMENT.NET_CASH_OUT}
            </Text>
            <Text style={{ ...styles.resultText, fontWeight: "bold" }}>
              {Translation.COMMON.USD}{" "}
              {(Number(state.amount) * 0.985).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type="darkGreen"
          disabled={
            !goNext ||
            exceed ||
            (userType === UserType.Customer &&
              walletData?.availableBalance > 5) ||
            !walletData ||
            !userId
          }
          title={Translation.BUTTON.CONFIRM}
          onPress={viewConfirm}
        />
      </SafeAreaView>

      {isVisible && (
        <Dialog visible={isVisible} onClose={() => setIsVisible(false)}>
          <View style={dialogViewBase}>
            <View style={styles.dialogWrap}>
              <Text style={styles.dialogHeader}>
                {Translation.PAYMENT.CASH_OUT_CONFIRM}
              </Text>
              <Text>{`You will redeem ${Number(state.amount).toFixed(
                2
              )} BerkShares for USD ${(Number(state.amount) * 0.985).toFixed(
                2
              )} after a 1.5% fee.`}</Text>
            </View>
            <View style={styles.dialogBottom}>
              <Button
                type={buttonStyle}
                title={Translation.BUTTON.CASH_OUT}
                onPress={doCashout}
              />
            </View>
          </View>
        </Dialog>
      )}

    </KeyboardAvoidingView>
  );
};

export default CashoutAmount;
