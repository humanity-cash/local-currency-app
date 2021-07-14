import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform, ScrollView, StyleSheet, View
} from "react-native";
import { Text } from "react-native-elements";
import { usePaymentDetails } from "src/hooks";
import { BackBtn, BorderedInput, Button, Header, NextBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
    baseHeader,
    viewBase,
    wrappingContainerBase
} from "src/theme/elements";
import { IMap } from "src/utils/types";

interface AddCashState extends IMap {
  amount: string;
}

type AddCashProps = {
  navigation?: any;
  route?: any;
};

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    lineHeight: 60,
    marginRight: 10,
    fontFamily: "IBMPlexSansSemiBold",
  },
  input: {
    flex: 1,
    marginVertical: 0,
  },
});

const AddCashView = (props: AddCashProps) => {
  const { update } = usePaymentDetails();
  const [state, setState] = useState<AddCashState>({
    amount: "1000",
  });
  const [goNext, setGoNext] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    update({ amount: state.amount });
  }, []);

  useEffect(() => {
    setGoNext(Object.keys(state).every((key) => state[key] !== ""));
  }, [state]);

  const onValueChange = (name: any, change: any) => {
    setState({
      ...state,
      [name]: change,
    } as any);
    update({ [name]: change });
  };

  return (
    <View style={viewBase}>
      <Header
        leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
        rightComponent={
          <NextBtn
            text="Skip"
            onClick={() =>
              props.navigation.navigate("OnboardingSteps", { step: 5 })
            }
          />
        }
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={{ paddingBottom: 40 }}>
          <View style={baseHeader}>
            <Text h1>Add cash</Text>
          </View>
          <View style={styles.view}>
            {showError && (
              <Text h3 style={{ marginTop: 5, color: colors.textError }}>
                Minimum amount is CHF 1'000
              </Text>
            )}
            <BorderedInput
              label="Amount"
              keyboardType="number-pad"
              name="amount"
              prefix="CHF"
              value={state.amount}
              onChange={onValueChange}
            />
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Button
          type="fluidDark"
          title="NEXT"
          disabled={!goNext}
          onPress={() => {
            if (parseFloat(state.amount) < 1000) {
              setShowError(true);
              return;
            }
            props.navigation.navigate("SelectPayment");
          }}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const AddCash = (props: AddCashProps) => {
  const navigation = useNavigation();
  return <AddCashView {...props} navigation={navigation} />;
};
export default AddCash;
