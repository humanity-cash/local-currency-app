import React, { useContext } from "react";
import { colors } from "src/theme/colors";
import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import { Button, Modal, ModalHeader } from "src/shared/uielements";
import { viewBase } from "src/theme/elements";
import Translation from "src/translation/en.json";
import { BUTTON_TYPES } from "src/constants";
import { UserContext } from "src/contexts";
import { UserType } from "src/auth/types";

const businessStyles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    lineHeight: 40,
    color: colors.purple,
  },
  imageView: {
    flex: 1,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

const customerStyles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    lineHeight: 40,
  },
  imageView: {
    flex: 1,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

type PaymentRequestSuccessProps = {
  visible: boolean;
  onClose: () => void;
  amount: number;
};

const PaymentRequestSuccess = (
  props: PaymentRequestSuccessProps
): JSX.Element => {
  const { userType } = useContext(UserContext);
  let buttonType = BUTTON_TYPES.DARK_GREEN;
  let styles = customerStyles;

  const isCustomer = userType === UserType.Customer;
  if (!isCustomer) {
    buttonType = BUTTON_TYPES.PURPLE;
    styles = businessStyles;
  }

  return (
    <Modal visible={props.visible}>
      <View style={viewBase}>
        <ModalHeader />
        <View style={{ paddingHorizontal: 10, flex: 1 }}>
          <Text style={styles.headerText}>
            Succeeded! You have received B$ {props.amount.toFixed(2)}.
          </Text>
          <View style={styles.imageView}>
            <Image
              source={require("../../../assets/images/berkkshares_paper_money.png")}
              style={{ justifyContent: "center", width: "100%" }}
              resizeMode="contain"
            />
          </View>
        </View>
        <SafeAreaView style={styles.bottomView}>
          <Button
            type={buttonType}
            title={Translation.BUTTON.CLOSE}
            onPress={props.onClose}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default PaymentRequestSuccess;
