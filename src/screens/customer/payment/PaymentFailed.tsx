import React from "react";
import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import { Header, Button, CancelBtn } from "src/shared/uielements";
import {
  baseHeader,
  viewBase,
  wrappingContainerBase,
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import * as Routes from "src/navigation/constants";
import { useNavigation } from "@react-navigation/core";
import { BUTTON_TYPES } from "src/constants";
import { colors } from "src/theme/colors";

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 40,
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  errorText: {
    color: colors.errorText,
  },
});

const PaymentFailed = (): JSX.Element => {
  const navigation = useNavigation();
  return (
    <View style={viewBase}>
      <Header
        rightComponent={
          <CancelBtn
            text="Close"
            onClick={() => navigation.goBack()}
          />
        }
      />
      <ScrollView style={wrappingContainerBase}>
        <View style={baseHeader}>
          <Text style={styles.headerText}>{Translation.PAYMENT.WRONG}</Text>
        </View>
        <Text style={styles.errorText}>Connection failed</Text>
      </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type={BUTTON_TYPES.DARK_GREEN}
          title={Translation.BUTTON.TRY_AGAIN}
          onPress={() => navigation.goBack()}
        />
      </SafeAreaView>
    </View>
  );
};

export default PaymentFailed;
