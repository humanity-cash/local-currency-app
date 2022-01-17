import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from "react-native";
import { Text } from "react-native-elements";
import { useCameraPermission } from "src/hooks";
import { colors } from "src/theme/colors";
import { BarCodeScanner } from "expo-barcode-scanner";
import Translation from "src/translation/en.json";
import * as Routes from "src/navigation/constants";
import { useNavigation } from "@react-navigation/core";
import {
  modalViewBase,
  wrappingContainerBase,
  underlineHeaderB,
  viewBase
} from "src/theme/elements";
import {
  Header,
  CancelBtn,
  BackBtn,
  Modal,
  ModalHeader,
  BorderedInput,
  Button
} from "src/shared/uielements";
import {
  QRCodeEntry,
  SECURITY_ID,
  PaymentMode,
  ToastType
} from "src/utils/types";
import { isQRCodeValid } from "src/utils/validation";
import { TransactionsAPI } from "src/api";
import { ITransactionRequest } from "src/api/types";
import { showToast } from "src/utils/common";
import { BUTTON_TYPES } from "src/constants";
import moment from "moment";
import { UserContext } from "src/contexts";
import { LoadingPage } from "src/views";

type HandleScaned = {
  type: string;
  data: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  toggleView: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 200,
    backgroundColor: "rgba(0,0,0,0.8)"
  },
  headerText: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 40,
    color: colors.purple
  },
  contentView: {
    marginTop: 5
  },
  label: {
    color: colors.text,
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
    marginVertical: 20
  },
  transactionDetailView: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 3,
    backgroundColor: colors.white
  },
  transactionDetailAmount: {
    fontSize: 32,
    color: colors.purple,
    marginVertical: 20,
    fontWeight: "bold",
    lineHeight: 32,
    textAlign: "center"
  },
  inlineView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  maxBView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  exceedLabel: {
    fontSize: 10,
    color: colors.mistakeRed
  }
});

const CashierReturnQRCodeScan = (): JSX.Element => {
  const navigation = useNavigation();
  const hasPermission = useCameraPermission();
  const { businessDwollaId } = useContext(UserContext);
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReturnModal, setIsReturnModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [goNext, setGoNext] = useState<boolean>(false);
  const [state, setState] = useState<QRCodeEntry>({
    securityId: SECURITY_ID,
    to: "",
    amount: 0,
    mode: PaymentMode.SELECT_AMOUNT
  });
  const [exceed, setExceed] = useState(false);

  useEffect(() => {
    setIsScanned(false);
  });

  useEffect(() => {
    setGoNext(Number(amount) > 0);
    setExceed(+amount > state.amount);
  }, [amount]);

  const handleBarCodeScanned = (data: HandleScaned) => {
    if (isQRCodeValid(data.data)) {
      const qrcodeData = JSON.parse(data.data) as QRCodeEntry;
      if (qrcodeData.transactionHash === "") {
        showToast(
          ToastType.ERROR,
          "Whoops, something went wrong.",
          "Invalid QRCode"
        );
        return;
      }
      setIsScanned(true);
      setState(qrcodeData);
      setIsReturnModal(true);
    } else {
      showToast(
        ToastType.ERROR,
        "Whoops, something went wrong.",
        "Invalid QRCode"
      );
    }
  };

  if (hasPermission === false) {
    return <Text>{Translation.OTHER.NO_CAMERA_PERMISSION}</Text>;
  }

  const onReturn = async () => {
    if (businessDwollaId) {
      const request: ITransactionRequest = {
        toUserId: state.to,
        amount: amount.toString(),
        comment: ""
      };

      setIsLoading(true);
      const response = await TransactionsAPI.transferTo(
        businessDwollaId,
        request
      );
      navigation.navigate(Routes.CASHIER_DASHBOARD);
      if (response.data) {
        setIsLoading(false);
        setIsReturnModal(false);
        showToast(ToastType.SUCCESS, "Success", `You have sent B$ ${amount}.`);
      } else {
        showToast(ToastType.ERROR, "Failed", "Whoops, something went wrong.");
        setIsLoading(false);
        setIsReturnModal(false);
      }
    } else {
      showToast(ToastType.ERROR, "Failed", "Whoops, something went wrong.");
      navigation.navigate(Routes.CASHIER_DASHBOARD);
    }
    setIsLoading(false);
  };

  const onValueChange = (name: string, change: string) => {
    setAmount(change.replace(",", "."));
  };

  const onModalClose = () => {
    setIsReturnModal(false);
    navigation.navigate(Routes.CASHIER_DASHBOARD);
  };

  return (
    <View style={viewBase}>
      {!isLoading && !isReturnModal && (
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={isScanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      )}
      <View style={styles.toggleView}>
        <Header
          rightComponent={
            <CancelBtn
              text={Translation.BUTTON.CLOSE}
              color={colors.white}
              onClick={() => navigation.navigate(Routes.CASHIER_DASHBOARD)}
            />
          }
        />
      </View>
      {isReturnModal && (
        <Modal visible={isReturnModal}>
          <KeyboardAvoidingView
            {...(Platform.OS === 'ios' && { behavior: 'padding' })}
            style={modalViewBase}
          >
            <ModalHeader
              leftComponent={
                <BackBtn
                  color={colors.purple}
                  onClick={() => setIsReturnModal(false)}
                />
              }
              rightComponent={<CancelBtn text="Close" onClick={onModalClose} />}
            />
            <ScrollView style={wrappingContainerBase}>
              <View style={underlineHeaderB}>
                <Text style={styles.headerText}>
                  {Translation.CASHIER.MAKE_RETURN}
                </Text>
              </View>
              <View style={styles.contentView}>
                <Text style={styles.label}>
                  {Translation.LABEL.TRANSACTION_DETAILS}
                </Text>
                <View style={styles.transactionDetailView}>
                  <Text style={styles.transactionDetailAmount}>
                    B$ {state.amount.toFixed(2)}
                  </Text>
                  <View style={styles.inlineView}>
                    <Text style={styles.label}>TRANSACTION ID</Text>
                    <Text style={styles.label}>{state.transactionHash}</Text>
                  </View>
                  <View style={styles.inlineView}>
                    <Text style={styles.label}>TYPE</Text>
                    <Text style={styles.label}>CUSTOMER SALE</Text>
                  </View>
                  <View style={styles.inlineView}>
                    <Text style={styles.label}>DATE</Text>
                    <Text style={styles.label}>
                      {moment(state.transactionDate).format(
                        "HH:mm, MMM D, YYYY"
                      )}
                    </Text>
                  </View>
                </View>

                <View style={styles.maxBView}>
                  <Text style={styles.label}>
                    {Translation.LABEL.RETURN_AMOUNT}
                  </Text>
                  {exceed && (
                    <Text style={styles.exceedLabel}>
                      MAX. TOTAL TRANSACTION AMOUNT
                    </Text>
                  )}
                </View>
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
                  borderColor={exceed ? colors.mistakeRed : null}
                />
              </View>
            </ScrollView>
            <SafeAreaView style={styles.bottomView}>
              <Button
                type={BUTTON_TYPES.PURPLE}
                disabled={!goNext || exceed}
                title={Translation.BUTTON.RETURN_AMOUNT}
                onPress={onReturn}
              />
            </SafeAreaView>
            <LoadingPage visible={isLoading} isPayment={true} />
          </KeyboardAvoidingView>
        </Modal>
      )}
    </View>
  );
};

export default CashierReturnQRCodeScan;
