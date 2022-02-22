import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { Text } from "react-native-elements";
import {
  BorderedInput,
  Button,
  Header,
  CancelBtn,
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  underlineHeader,
  viewBase,
  viewBaseB,
  wrappingContainerBase,
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { BUTTON_TYPES } from "src/constants";
import { LoadingPage } from "src/views";
import { SafeAreaView } from "react-native";
import { CustomerLoadUp, BusinessLoadUp } from "src/style";
import { UserContext } from "src/contexts";
import { UserType } from "src/auth/types";
import { IMicroDepositRequest } from 'src/api/types';
import { DwollaAPI } from "src/api";
import { showToast } from "src/utils/common";
import { ToastType } from "src/utils/types";

const MicroDepositBank = (): JSX.Element => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [request, setRequest] = useState<IMicroDepositRequest>({
    amount1: "",
    amount2: ""
  })
  const [goNext, setGoNext] = useState(true);
  const { userType, customerDwollaId, businessDwollaId } = useContext(UserContext);
  const isCustomer = userType === UserType.Customer;
  const styles = isCustomer ? CustomerLoadUp : BusinessLoadUp;
  const userId = isCustomer ? customerDwollaId : businessDwollaId;

  useEffect(() => {
    setRequest({
      amount1: "",
      amount2: ""
    });
  }, []);

  useEffect(() => {
    setGoNext( Boolean(request.amount1) && Boolean(request.amount2));
  }, [request]);

  const onValueChange = (name: string, change: string) => {
    setRequest((pv: IMicroDepositRequest) => ({
      ...pv,
      [name]: change,
    }));
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const response = await DwollaAPI.micro_deposit(userId, request);

    if (response.data) {
      navigation.goBack();
    } else {
      showToast(
        ToastType.ERROR,
        "Whoops, something went wrong.",
        "Connection failed."
      );
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === "ios" && { behavior: "padding" })}
      style={isCustomer ? viewBase : viewBaseB}
    >
      <LoadingPage visible={isLoading} isPayment={true} />
      <Header
        rightComponent={
          <CancelBtn
            text={Translation.BUTTON.CLOSE}
            onClick={() => navigation.goBack()}
          />
        }
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={styles.container}>
          <View style={underlineHeader}>
            <Text style={styles.headerText}>{Translation.BANK_ACCOUNT.BANK_ACCOUNT}</Text>
          </View>
          <View style={styles.view}>
            <Text
              style={{ color: isCustomer ? colors.darkGreen : colors.purple }}
            >
              {Translation.BANK_ACCOUNT.MICRO_DEPOSIT_DETAIL}
            </Text>

            <View style={styles.maxBView}>
              <Text style={styles.text}>{Translation.LABEL.AMOUNT} 1</Text>
            </View>
            <BorderedInput
              label="Amount"
              name="amount1"
              keyboardType="decimal-pad"
              placeholder="Amount"
              prefix="$"
              value={request.amount1}
              style={{
                backgroundColor: isCustomer ? colors.inputBg : colors.lightBg,
                color: isCustomer ? colors.darkGreen : colors.purple,
              }}
              textStyle={{
                color: isCustomer ? colors.darkGreen : colors.purple,
              }}
              onChange={onValueChange}
            />

            <View style={styles.maxBView}>
              <Text style={styles.text}>{Translation.LABEL.AMOUNT} 2</Text>
            </View>
            <BorderedInput
              label="Amount"
              name="amount2"
              keyboardType="decimal-pad"
              placeholder="Amount"
              prefix="$"
              value={request.amount2}
              style={{
                backgroundColor: isCustomer ? colors.inputBg : colors.lightBg,
                color: isCustomer ? colors.darkGreen : colors.purple,
              }}
              textStyle={{
                color: isCustomer ? colors.darkGreen : colors.purple,
              }}
              onChange={onValueChange}
            />
          </View>
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type={isCustomer ? BUTTON_TYPES.DARK_GREEN : BUTTON_TYPES.PURPLE}
          title={Translation.BUTTON.SUBMIT}
          disabled={!goNext}
          onPress={onSubmit}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default MicroDepositBank;
;
