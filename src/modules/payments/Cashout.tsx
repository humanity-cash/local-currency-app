import { useNavigation } from "@react-navigation/core";
import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  SafeAreaView,
  TouchableOpacity
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
  viewBaseB,
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
  const buttonStyle =
    userType === UserType.Business
      ? BUTTON_TYPES.PURPLE
      : BUTTON_TYPES.DARK_GREEN;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [maxAmount, setMaxAmount] = useState<string>("5.00");
  const [exceed, setExceed] = useState(false);
  const [fee, setFee] = useState(0)
  const isCustomer = userType === UserType.Customer;

  const [state, setState] = useState<CashoutState>({
    amount: "",
    costs: "",
  });

  const [goNext, setGoNext] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isTooMuch, setIsTooMuch] = useState(false);
  const [isTooLow, setIsTooLow] = useState(false);
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    setGoNext(Boolean(state.costs));
    setExceed(+state.costs > +maxAmount || +state.costs < 0.5);
  }, [state]);

  useEffect(() => {
    if(userType === UserType.Customer ) {
      if(walletData?.availableBalance >= 5) {
        setIsTooMuch(true)
      } else if (walletData?.availableBalance <= 0.5) {
        setIsTooLow(true)
      }
      // uncomment when the donate feature is implemented.
      // else {
      //   setIsEligible(true)
      // }
    }

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
    let amount = change.replace(",", ".");
    if(+amount != +((+amount).toFixed(2))) {
      amount = (+amount).toFixed(2)
    }

    let fee = (Math.ceil(+amount*1.5)/100).toFixed(2)
    if(+fee < 0.5) {
      fee = "0.50"
    }

    setFee(+fee)

    setState({
      amount: amount,
      costs: amount,
    } as CashoutState);
  };

  const viewConfirm = () => {
    setIsConfirm(true);
  };

  const onClose = () => {
    setState({ amount: "", costs: "" });
    setIsTooMuch(false)
    setIsConfirm(false)
    setIsTooLow(false)
    setIsEligible(false)

    navigation.goBack()
  }

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
    setIsConfirm(false);
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
      {...(Platform.OS === "ios" && { behavior: "padding" })}
      style={isCustomer ? viewBase : viewBaseB}
    >
      <LoadingPage visible={isLoading} isPayment={true} />
      <Header
        rightComponent={
          <CancelBtn text={"Close"} onClick={onClose} />
        }
      />
      <ScrollView style={wrappingContainerBase}>
        <View style={underlineHeader}>
          <Text style={styles.headerText}>{Translation.PAYMENT.CASH_OUT}</Text>
        </View>
        <View>
          <Text
            style={{ color: isCustomer ? colors.darkGreen : colors.purple }}
          >
            {isCustomer
              ? Translation.PAYMENT.CASH_OUT_DETAIL
              : Translation.PAYMENT.MERCHANT_CASH_OUT_DETAIL}
          </Text>
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
            style={{
              backgroundColor: isCustomer ? colors.inputBg : colors.lightBg,
            }}
            borderColor={goNext && exceed ? colors.mistakeRed : null}
          />
          {goNext && exceed && (
            <Text style={styles.errorBalance}>
              {Translation.PAYMENT.PERSONAL_EXCEED_BALANCE}
            </Text>
          )}
          <View style={styles.resultView}>
            <Text style={styles.resultText}>
              {Translation.PAYMENT.REDEMPTION_FEE} (1.5%)
            </Text>
            <Text style={styles.resultText}>
              {Translation.COMMON.USD}{" "}
              {fee.toFixed(2)}
            </Text>
          </View>
          <View style={styles.resultView}>
            <Text style={{ ...styles.resultText, fontWeight: "bold" }}>
              {Translation.PAYMENT.NET_CASH_OUT}
            </Text>
            <Text style={{ ...styles.resultText, fontWeight: "bold" }}>
              {Translation.COMMON.USD}{" "}
              {(+state.amount-fee).toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type={isCustomer ? "darkGreen" : "purple"}
          disabled={
            !goNext ||
            exceed ||
            (userType === UserType.Customer &&
              walletData?.availableBalance < 5) ||
            !walletData ||
            !userId
          }
          title={Translation.BUTTON.CONFIRM}
          onPress={viewConfirm}
        />
      </SafeAreaView>

      {isConfirm && (
        <Dialog visible={isConfirm} onClose={() => setIsConfirm(false)}>
          <View style={dialogViewBase}>
            <View style={styles.dialogWrap}>
              <Text style={styles.dialogHeader}>
                {Translation.PAYMENT.CASH_OUT_CONFIRM}
              </Text>
              <Text>{`You will redeem B$ ${Number(state.amount).toFixed(
                2
              )} for USD $${(+state.amount-fee).toFixed(
                2
              )} after a $${fee} fee.`}</Text>
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
      {isTooMuch && (
        <Dialog visible={isTooMuch} onClose={onClose}>
          <View style={dialogViewBase}>
            <View style={styles.dialogWrap}>
              <Text style={styles.dialogHeader}>
                {Translation.PAYMENT.CASH_OUT_NOT_AVAILABLE}
              </Text>
              <Text>{Translation.PAYMENT.CASH_OUT_TOO_MUCH}</Text>
            </View>
            <View style={styles.dialogBottom}>
              <Button
                type={buttonStyle}
                title={Translation.BUTTON.OK}
                onPress={onClose}
              />
            </View>
          </View>
        </Dialog>
      )}
      {isTooLow && (
        <Dialog visible={isTooLow} onClose={onClose}>
          <View style={dialogViewBase}>
            <View style={styles.dialogWrap}>
              <Text style={styles.dialogHeader}>
                {Translation.PAYMENT.CASH_OUT_NOT_AVAILABLE}
              </Text>
              <Text>{Translation.PAYMENT.CASH_OUT_TOO_LOW}</Text>
            </View>
            <View style={styles.dialogBottom}>
              {/* <TouchableOpacity style={{alignSelf: 'center', paddingBottom: 12}} onPress={onClose}>
                <Text style={{textDecorationLine: 'underline'}}>No thanks</Text>
              </TouchableOpacity> */}
              <Button
                type={buttonStyle}
                title={Translation.BUTTON.OK}
                // title={Translation.BUTTON.DONATE_MY_BERKSHARES}  // donate should be implemented later
                onPress={onClose}
              />
            </View>
          </View>
        </Dialog>
      )}
      {isEligible && (
        <Dialog visible={isEligible} onClose={() => setIsEligible(false)}>
          <View style={dialogViewBase}>
            <View style={styles.dialogWrap}>
              <Text style={styles.dialogHeader}>
                {Translation.PAYMENT.CASH_OUT_AVAILABLE}
              </Text>
              <Text>{Translation.PAYMENT.CASH_OUT_ELIGIBLE}</Text>
            </View>
            <View style={styles.dialogBottom}>
              <TouchableOpacity style={{alignSelf: 'center', paddingBottom: 12}} onPress={() => setIsEligible(false)}>
                <Text style={{textDecorationLine: 'underline'}}>{Translation.BUTTON.CASH_ME_OUT}</Text>
              </TouchableOpacity>
              <Button
                type={buttonStyle}
                title={Translation.BUTTON.DONATE_MY_BERKSHARES}
                onPress={onClose}
              />
            </View>
          </View>
        </Dialog>
      )}
    </KeyboardAvoidingView>
  );
};

export default CashoutAmount;
