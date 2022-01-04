import React, { useEffect, useState, useContext } from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-elements";
import QRCode from "react-native-qrcode-svg";
import { UserContext, WalletContext } from "src/contexts";
import { useBrightness } from "src/hooks";
import { Dialog } from "src/shared/uielements";
import { dialogViewBase } from "src/theme/elements";
import { PaymentMode, SECURITY_ID } from "src/utils/types";
import { UserType } from "src/auth/types";
import { CustomerScanQrCodeStyle, BusinessScanQrCodeStyle } from "src/style";

type RequestPaymentInput = {
  visible: boolean;
  onClose: () => void;
  onSuccess: (amount: number) => void;
  isOpenAmount: boolean;
  amount?: number;
  ownerName: string;
};

const useWalletData = () => {
  const {
    customerWalletData,
    businessWalletData,
    updateBusinessWalletData,
    updateCustomerWalletData,
  } = useContext(WalletContext);
  const { userType, customerDwollaId, businessDwollaId } =
    useContext(UserContext);
  if (userType === UserType.Customer) {
    return {
      walletData: customerWalletData,
      userId: customerDwollaId,
      updateWalletData: updateCustomerWalletData,
    };
  } else {
    return {
      walletData: businessWalletData,
      userId: businessDwollaId,
      updateWalletData: updateBusinessWalletData,
    };
  }
};

const RequestPayment = (props: RequestPaymentInput): JSX.Element => {
  const { walletData, userId } = useWalletData();
  const { hasPermission, setMaxBrightness, setDefaultBrightness } =
    useBrightness();
  const { userType } = useContext(UserContext);
  const styles =
    userType === UserType.Customer
      ? CustomerScanQrCodeStyle
      : BusinessScanQrCodeStyle;
  const [initBalance] = useState<number>(walletData?.availableBalance);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const addressStr = JSON.stringify({
    securityId: SECURITY_ID,
    to: userId,
    amount: props.amount,
    mode: props.isOpenAmount
      ? PaymentMode.OPEN_AMOUNT
      : PaymentMode.SELECT_AMOUNT,
  });

  useEffect(() => {
    if (hasPermission) {
      setMaxBrightness();
    }
  }, [hasPermission]);

  useEffect(() => {
    if (walletData?.availableBalance) {
      if (walletData?.availableBalance > initBalance) {
        onSuccess();
      }
    }
  }, [walletData?.availableBalance]);

  const onClose = () => {
    setDefaultBrightness();
    props.onClose();
  };

  const onSuccess = async () => {
    if (!isSuccess) {
      setIsSuccess(true);
      setDefaultBrightness();
      props.onSuccess(walletData?.availableBalance - initBalance);
    }
  };

  return (
    <Dialog
      visible={props.visible}
      onClose={onClose}
      backgroundStyle={styles.dialogBg}
      style={styles.dialog}
    >
      <View style={dialogViewBase}>
        <View style={styles.dialogWrap}>
          <View style={styles.ownerInfo}>
            <Image
              source={require("../../../assets/images/feed1.png")}
              style={styles.image}
            />
            <Text style={styles.ownerName}>{props?.ownerName}</Text>
          </View>
          <QRCode value={addressStr} size={200} />
          {!props.isOpenAmount && (
            <Text style={styles.amount}>B$ {props?.amount?.toFixed(2)}</Text>
          )}
        </View>
      </View>
    </Dialog>
  );
};

export default RequestPayment;
