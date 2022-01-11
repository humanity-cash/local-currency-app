import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TouchableOpacity
} from "react-native";
import { Text } from "react-native-elements";
import {
  BackBtn,
  BorderedInput,
  Button,
  Header,
  CancelBtn
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  underlineHeader,
  viewBase,
  wrappingContainerBase
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import * as Routes from "src/navigation/constants";
import { BUTTON_TYPES } from "src/constants";
import { TransactionsAPI } from "src/api";
import { showToast } from "src/utils/common";
import { ToastType } from "src/utils/types";
import { LoadingPage } from "src/views";
import { SafeAreaView } from "react-native";
import { CustomerLoadUp, BusinessLoadUp } from "src/style";
import { UserContext } from "src/contexts";
import { UserType } from "src/auth/types";

const MAX_AMOUNT = 2000;
const MIN_AMOUNT = 1;

interface LoadUpProps {
  route: {
    params: {
      styles: any;
      userId: string;
    };
  };
}

const LoadUp = (props: LoadUpProps): JSX.Element => {
  const { userId } = props?.route?.params;
  const stylesSelection = props?.route?.params?.styles;
  const styles =
    stylesSelection === "business" ? BusinessLoadUp : CustomerLoadUp;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>("");
  const [goNext, setGoNext] = useState(false);
  const homeRoute =
    stylesSelection === "business" ? Routes.MERCHANT_DASHBOARD : Routes.TABS;
  const { userType } = useContext(UserContext);
  const isCustomer = userType === UserType.Customer;

  useEffect(() => {
    setAmount("");
  }, []);

  useEffect(() => {
    setGoNext(Number(amount) >= MIN_AMOUNT && Number(amount) <= MAX_AMOUNT);
  }, [amount]);

  const onValueChange = (name: string, change: string) => {
    setAmount(change.replace(",", "."));
  };

  const onLoadUp = async () => {
    if (!userId) {
      showToast(
        ToastType.ERROR,
        "Whoops, something went wrong.",
        "Connection failed."
      );
      return;
    }
    setIsLoading(true);
    const response = await TransactionsAPI.deposit(userId, { amount: amount });

    if (response.data) {
      navigation.navigate(Routes.LOADUP_SUCCESS, { homeRoute });
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
      {...(Platform.OS === 'ios' && { behavior: 'padding' })}
      style={viewBase}
    >
      <LoadingPage visible={isLoading} isPayment={true} />
      <Header
        leftComponent={
          <BackBtn text="Home" onClick={() => navigation.goBack()} />
        }
        rightComponent={
          <CancelBtn
            text={Translation.BUTTON.CLOSE}
            onClick={() => navigation.navigate(homeRoute)}
          />
        }
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={styles.container}>
          <View style={underlineHeader}>
            <Text style={styles.headerText}>{Translation.BUTTON.LOAD_UP}</Text>
          </View>
          <View style={styles.view}>
            <Text>{Translation.LOAD_UP.LOAD_UP_DETAIL}</Text>

            <Text style={{ ...styles.text, ...styles.amountText }}>
              {Translation.LABEL.AMOUNT}
            </Text>
            <View style={styles.defaultAmountView}>
              <TouchableOpacity
                style={
                  amount == "50"
                    ? styles.selectedAmountItem
                    : styles.defaultAmountItem
                }
                onPress={() => onValueChange("amount", "50")}
              >
                <Text>B$ 50</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  amount == "100"
                    ? styles.selectedAmountItem
                    : styles.defaultAmountItem
                }
                onPress={() => onValueChange("amount", "100")}
              >
                <Text>B$ 100</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  amount == "200"
                    ? styles.selectedAmountItem
                    : styles.defaultAmountItem
                }
                onPress={() => onValueChange("amount", "200")}
              >
                <Text>B$ 200</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.maxBView}>
              <Text style={styles.text}>{Translation.LABEL.AMOUNT}</Text>
              <Text style={styles.text}>MAX. B$ 2.000</Text>
            </View>
            <BorderedInput
              label="Amount"
              name="amount"
              keyboardType="decimal-pad"
              placeholder="Amount"
              prefix="B$"
              value={amount}
              style={{
                backgroundColor: isCustomer ? colors.inputBg : colors.lightBg
              }}
              onChange={onValueChange}
            />

            <View style={styles.totalView}>
              <Text h2 style={{ color: colors.text }}>
                {Translation.LOAD_UP.TOTAL_COSTS}
              </Text>
              <Text h2 style={{ color: colors.text }}>
                {Translation.COMMON.USD} {amount === "" ? "-" : amount}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type={BUTTON_TYPES.DARK_GREEN}
          title={Translation.BUTTON.LOAD_UP}
          disabled={!goNext}
          onPress={onLoadUp}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default LoadUp;
