import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useContext } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import { Header, Button, CancelBtn } from "src/shared/uielements";
import {
  baseHeader,
  modalViewBase,
  wrappingContainerBase
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import * as Routes from "src/navigation/constants";
import { UserContext } from "src/contexts";
import { BUTTON_TYPES } from "src/constants";
import { UserType } from "src/auth/types";

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 40
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20
  }
});

const RedemptionInProgress = (): ReactElement => {
  const { userType } = useContext(UserContext);
  const homeRoute =
    userType === UserType.Business
      ? Routes.MERCHANT_DASHBOARD
      : Routes.DASHBOARD;
  const navigation = useNavigation();
  const buttonStyle =
    userType === UserType.Business
      ? BUTTON_TYPES.PURPLE
      : BUTTON_TYPES.DARK_GREEN;

  return (
    <View style={modalViewBase}>
      <Header
        rightComponent={
          <CancelBtn
            text={Translation.BUTTON.CLOSE}
            onClick={() => navigation.navigate(homeRoute)}
          />
        }
      />
      <ScrollView style={wrappingContainerBase}>
        <View style={baseHeader}>
          <Text style={styles.headerText}>
            {Translation.PAYMENT.REDEMPTION_PROCESS}
          </Text>
        </View>
        <View>
          <Text>{Translation.PAYMENT.REDEMPTION_PROCESS_DETAIL}</Text>
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type={buttonStyle}
          title={Translation.BUTTON.GO_BACK_HOME}
          onPress={() => navigation.navigate(homeRoute)}
        />
      </SafeAreaView>
    </View>
  );
};

export default RedemptionInProgress;
