import { AntDesign, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/contexts";
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  baseHeader,
  viewBaseB,
  wrappingContainerBase,
  dialogViewBase,
} from "src/theme/elements";
import { Button, CancelBtn, Dialog } from "src/shared/uielements";
import Translation from "src/translation/en.json";
import * as Routes from "src/navigation/constants";
import { BUTTON_TYPES } from "src/constants";
import { styles } from "./style";

type ReturnPaymentDialogProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ReturnPaymentDialog = (props: ReturnPaymentDialogProps) => {
  return (
    <Dialog
      visible={props.visible}
      onClose={() => props.onCancel()}
      backgroundStyle={styles.dialogBg}
    >
      <View style={dialogViewBase}>
        <View style={wrappingContainerBase}>
          <View style={baseHeader}>
            <Text style={styles.headerText}>
              {Translation.PAYMENT.SCAN_RECIPIENTS_QR}
            </Text>
          </View>
          <Text style={styles.detailText}>
            {Translation.PAYMENT.SCAN_RECIPIENTS_QR_DETAIL}
          </Text>
        </View>
        <View>
          <Button
            type={BUTTON_TYPES.PURPLE}
            title="Scan"
            onPress={() => props.onConfirm()}
          />
        </View>
      </View>
    </Dialog>
  );
};

const CashierDashboard = (): JSX.Element => {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isReturn, setIsReturn] = useState<boolean>(false);

  const onLogout = () => {
    setIsVisible(true);
  };

  const onCancel = () => {
    setIsVisible(false);
  };

  const onConfirm = () => {
    setIsVisible(false);
    signOut();
  };

  const onScanConfirm = () => {
    setIsReturn(false);
    navigation.navigate(Routes.CASHIER_RETURN_QRCODE_SCAN);
  };

  const onScanCancel = () => {
    setIsReturn(false);
  };

  return (
    <View style={viewBaseB}>
      <Header
        rightComponent={
          <CancelBtn
            text={Translation.BUTTON.LOGOUT}
            color={colors.purple}
            onClick={onLogout}
          />
        }
      />
      <ScrollView style={wrappingContainerBase}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.itemView}
            onPress={() => navigation.navigate(Routes.CASHIER_REQUEST)}
          >
            <View style={styles.receiveBtn}>
              <Image
                source={require("../../../../assets/images/coin.png")}
                style={styles.image}
              />
              <Text style={styles.text}>Receive payment</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemView}
            onPress={() => navigation.navigate(Routes.CASHIER_TRANSACTIONS)}
          >
            <Feather
              name="server"
              size={20}
              color={colors.purple}
              style={styles.icon}
            />
            <Text style={styles.text}>Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemView}
            onPress={() => setIsReturn(true)}
          >
            <Feather
              name="rotate-ccw"
              size={20}
              color={colors.purple}
              style={styles.icon}
            />
            <Text style={styles.text}>Make a return</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemView}
            onPress={() => navigation.navigate(Routes.REPORT)}
          >
            <AntDesign
              name="profile"
              size={20}
              color={colors.purple}
              style={styles.icon}
            />
            <Text style={styles.text}>Make a report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Button
        type={BUTTON_TYPES.TRANSPARENT}
        title={Translation.BUTTON.NEED_HELP}
        textStyle={styles.text}
        style={styles.bottomBtn}
        onPress={() => navigation.navigate(Routes.CASHIER_HELP)}
      />

      {isVisible && (
        <Dialog
          visible={isVisible}
          onClose={() => onCancel()}
          backgroundStyle={styles.dialogBg}
        >
          <View style={dialogViewBase}>
            <View style={wrappingContainerBase}>
              <View style={baseHeader}>
                <Text style={styles.headerText}>
                  {Translation.CASHIER.LOGOUT_CONFIRM}
                </Text>
              </View>
              <Text style={styles.detailText}>
                {Translation.CASHIER.LOGOUT_CONFIRM_DETAIL}
              </Text>
            </View>
            <View>
              <Button
                type={BUTTON_TYPES.TRANSPARENT}
                title={Translation.BUTTON.LOGOUT}
                textStyle={styles.text}
                onPress={onConfirm}
              />
              <Button
                type={BUTTON_TYPES.PURPLE}
                title={Translation.BUTTON.CANCEL}
                onPress={() => onCancel()}
              />
            </View>
          </View>
        </Dialog>
      )}

      {isReturn && (
        <ReturnPaymentDialog
          visible={isReturn}
          onConfirm={onScanConfirm}
          onCancel={onScanCancel}
        />
      )}
    </View>
  );
};

export default CashierDashboard;
