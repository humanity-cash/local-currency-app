import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Text } from "react-native-elements";
import {
  Header,
  Button,
  CancelBtn,
  BorderedInput,
  ToggleButton,
} from "src/shared/uielements";
import {
  baseHeader,
  viewBase,
  wrappingContainerBase,
} from "src/theme/elements";
import { colors } from "src/theme/colors";
import PaymentRequestSuccess from "./PaymentRequestSuccess";
import Translation from "src/translation/en.json";
import * as Routes from "src/navigation/constants";
import BankLinkDialog from "src/shared/uielements/BankLinkDialog";
import { WalletContext, UserContext } from "src/contexts";
import { PaymentsModule } from "src/modules";
import { CustomerScanQrCodeStyle } from "src/style";
import { UserType } from "src/auth/types";

type AmountState = {
  amount: string;
  cost: string;
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 40,
  },
  switchView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  contentView: {
    marginTop: 5,
  },
  label: {
    marginTop: 20,
    color: colors.text,
    fontSize: 12,
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  openBtn: {
    marginBottom: 10,
  },
  switch: {
    borderColor: colors.darkGreen,
  },
  switchText: {
    color: colors.darkGreen,
  },
});

const PaymentRequest = (): JSX.Element => {
  const navigation = useNavigation();
  const [state, setState] = useState<AmountState>({
    amount: "",
    cost: "",
  });
  const [goNext, setGoNext] = useState<boolean>(false);
  const [receivedAmount, setReceivedAmount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRequestSuccess, setIsRequestSuccess] = useState<boolean>(false);
  const [isOpenAmount, setIsOpenAmount] = useState<boolean>(false);
  const [bankDialogInfo, setBankDialogInfo] = useState<any>({
    isVisible: false,
    title: "",
    detail: "",
    buttonTitle: "",
  });

  const { user, customerDwollaId } = useContext(UserContext);
  const { customerWalletData } = useContext(WalletContext);
  const personalFundingSource = customerWalletData?.availableFundingSource?.visible;
  const availableBalance = customerWalletData?.availableBalance;
  const { userType } = useContext(UserContext);
  const isCustomer = userType === UserType.Customer;

  useEffect(() => {
    setState({ amount: "", cost: "" });
  }, []);

  useEffect(() => {
    setGoNext(Number(state.amount) > 0);
  }, [state]);

  const onValueChange = (name: string, change: string) => {
    const costs = change.replace(",", ".");
    setState((pv) => ({
      ...state,
      [name]: costs,
      costs: costs,
    }));
  };

  const openAmount = () => {
    setIsOpenAmount(true);
    setIsVisible(true);
  };

  const requestAmount = () => {
    setIsOpenAmount(false);
    setIsVisible(true);
  };

  const onSuccess = (amount: number) => {
    setReceivedAmount(amount);
    setIsVisible(false);
    setIsRequestSuccess(true);
  };

  const onConfirm = () => {
    setIsRequestSuccess(false);
    navigation.navigate(Routes.DASHBOARD);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const onPressPay = () => {
    if (availableBalance && availableBalance > 0) {
      navigation.navigate(Routes.QRCODE_SCAN, {
        senderId: customerDwollaId,
        walletData: customerWalletData,
        username: user?.customer?.tag,
        styles: CustomerScanQrCodeStyle,
        recieveRoute: Routes.PAYMENT_REQUEST,
        cancelRoute: Routes.DASHBOARD,
      });
      return;
    }

    if (personalFundingSource) {
      setBankDialogInfo({
        ...bankDialogInfo,
        isVisible: true,
        title: Translation.PAYMENT.PAYMENT_NO_BANK_TITLE,
        detail: Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL,
        buttonTitle: Translation.BUTTON.LOAD_UP_BERKSHARES,
      });
    } else {
      setBankDialogInfo({
        ...bankDialogInfo,
        isVisible: true,
        title: Translation.PAYMENT.PAYMENT_NO_BANK_TITLE,
        detail: Translation.PAYMENT.PAYMENT_NO_BANK_DETAIL,
        buttonTitle: Translation.BUTTON.LINK_PERSONAL_BANK,
      });
    }
  };

  const onBankDialogConfirm = () => {
    onBankDialogCancel();

    if (personalFundingSource) {
      navigation.navigate(Routes.LOAD_UP, { userId: customerDwollaId });
    } else {
      navigation.navigate(Routes.SELECT_BANK);
    }
  };

  const onBankDialogCancel = () => {
    setBankDialogInfo({
      ...bankDialogInfo,
      isVisible: false,
    });
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === "ios" && { behavior: "padding" })}
      style={viewBase}
    >
      <Header
        rightComponent={
          <CancelBtn
            text={Translation.BUTTON.CLOSE}
            onClick={() => navigation.navigate(Routes.DASHBOARD)}
          />
        }
      />
      <View style={wrappingContainerBase}>
        <View style={baseHeader}>
          <View style={styles.switchView}>
            <ToggleButton
              value={false}
              onChange={onPressPay}
              activeText="Pay"
              inActiveText="Receive"
              style={styles.switch}
              textStyle={styles.switchText}
            />
          </View>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.label}>{Translation.LABEL.AMOUNT}</Text>
          <BorderedInput
            label="Amount"
            name="amount"
            keyboardType="decimal-pad"
            placeholder="Amount"
            prefix="B$"
            value={state.amount}
            style={{
              backgroundColor: isCustomer ? colors.inputBg : colors.lightBg,
            }}
            onChange={onValueChange}
          />
        </View>
      </View>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type="transparent"
          title={Translation.BUTTON.OPEN_AMOUNT}
          style={styles.openBtn}
          onPress={openAmount}
        />
        <Button
          type="darkGreen"
          disabled={!goNext}
          title={Translation.BUTTON.NEXT}
          onPress={requestAmount}
        />
      </SafeAreaView>
      {isVisible && (
        <PaymentsModule.Request
          visible={isVisible}
          onSuccess={onSuccess}
          onClose={onClose}
          isOpenAmount={isOpenAmount}
          amount={Number(state.amount)}
          ownerName={user?.customer?.tag || ""}
        />
      )}
      {isRequestSuccess && (
        <PaymentRequestSuccess
          visible={isRequestSuccess}
          onClose={onConfirm}
          amount={receivedAmount}
        />
      )}

      <BankLinkDialog
        visible={bankDialogInfo.isVisible}
        title={bankDialogInfo.title}
        description={bankDialogInfo.detail}
        buttonTitle={bankDialogInfo.buttonTitle}
        onConfirm={onBankDialogConfirm}
        onCancel={onBankDialogCancel}
      />
    </KeyboardAvoidingView>
  );
};

export default PaymentRequest;
