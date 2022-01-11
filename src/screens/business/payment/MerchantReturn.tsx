import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView
} from "react-native";
import { Text } from "react-native-elements";
import { BUTTON_TYPES } from "src/constants";
import * as Routes from "src/navigation/constants";
import {
  BackBtn,
  BorderedInput,
  Button,
  CancelBtn,
  Header
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  underlineHeaderB,
  viewBaseB,
  wrappingContainerBase
} from "src/theme/elements";
import Translation from "src/translation/en.json";

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 40,
    color: colors.purple
  },
  switchView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentView: {
    marginTop: 5
  },
  label: {
    marginTop: 20,
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
    marginBottom: 20
  }
});

const MerchantReturn = (): JSX.Element => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState<string>("");
  const [goNext, setGoNext] = useState<boolean>(false);

  useEffect(() => {
    setGoNext(Boolean(amount));
  }, [amount]);

  const onValueChange = (name: string, change: string) => {
    setAmount(change.replace(",", "."));
  };

  const onReturn = () => {
    navigation.navigate(Routes.MERCHANT_PAYMENT_PENDING);
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' && { behavior: 'padding' })}
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
            onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)}
          />
        }
      />
      <ScrollView style={wrappingContainerBase}>
        <View style={underlineHeaderB}>
          <Text style={styles.headerText}>
            {Translation.PAYMENT.SEND_RETURN}
          </Text>
        </View>
        <View style={styles.contentView}>
          <Text style={styles.label}>{Translation.LABEL.RETURN_AMOUNT}</Text>
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

export default MerchantReturn;
