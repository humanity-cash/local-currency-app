import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import countries from "src/mocks/countries";
import phoneCountries from "src/mocks/phoneCountries";
import BlockInput from "src/shared/uielements/BlockInput";
import Button from "src/shared/uielements/Button";
import BackBtn from "src/shared/uielements/header/BackBtn";
import Header from "src/shared/uielements/header/Header";
import SelectModal, { SelectionProps } from "src/shared/uielements/SelectModal";
import {
    baseHeader,
    viewBase,
    wrappingContainerBase
} from "src/theme/elements";
import { IMap } from "src/utils/types";

const MAIN_COUNTRY = "swiss";
const MAIN_PHONE_COUNTRY = "+41";

interface CreateAccountState extends IMap {
  countryOfResidence: string;
  username: string;
  phoneCountry: string;
  phoneNumber: string;
}

type CreateAccountProps = {
  navigation?: any;
  route?: any;
};

const CreateAccountView = (props: CreateAccountProps) => {
  const { personalDetails, updatePersonalDetails } = useUserDetails();
  const [state, setState] = useState<CreateAccountState>({
    countryOfResidence: "swiss",
    username: "",
    phoneCountry: "+41",
    phoneNumber: "",
  });
  const [goNext, setGoNext] = useState(false);

  useEffect(() => {
    setGoNext(Object.keys(state).every((key) => state[key] !== ""));
  }, [state]);

  useEffect(() => {
    setState({
      countryOfResidence: personalDetails.countryOfResidence,
      username: personalDetails.username,
      phoneNumber: personalDetails.phoneNumber,
      phoneCountry: personalDetails.phoneCountry,
    });
  }, [personalDetails]);

  const onValueChange = (name: any, change: any) => {
    setState({
      ...state,
      [name]: change,
    } as any);
    updatePersonalDetails({ [name]: change });
  };

  return (
    <View style={viewBase}>
      <Header
        leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={{ paddingBottom: 40 }}>
          <View style={baseHeader}>
            <Text h1>Create account</Text>
          </View>
          <View>
            <Text h3>Your COUNTRY OF RESIDENCE</Text>
            <SelectModal
              name="countryOfResidence"
              value={state.countryOfResidence}
              onChange={onValueChange}
              modalHeader="Select your country of residence"
              modalDescription="Sorry, your country is not supported yet if it is not listed here."
              modalMainOption={countries.find(
                (country: SelectionProps) => country.value === MAIN_COUNTRY
              )}
              modalList={countries.filter(
                (country: SelectionProps) => country.value !== MAIN_COUNTRY
              )}
              modalListLabel="other"
            />
            <Text h3>how you would like to be addressed</Text>
            <BlockInput
              name="username"
              placeholder="Your name (or username)"
              value={state.username}
              onChange={onValueChange}
            />
            <Text h3>Phone number</Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <SelectModal
                name="phoneCountry"
                value={state.phoneCountry}
                style={{ width: 126 }}
                onChange={onValueChange}
                modalHeader="Select your phone directive"
                modalMainOption={phoneCountries.find(
                  (country: SelectionProps) =>
                    country.value === MAIN_PHONE_COUNTRY
                )}
                modalList={phoneCountries.filter(
                  (country: SelectionProps) =>
                    country.value !== MAIN_PHONE_COUNTRY
                )}
                modalListLabel="other"
              />
              <BlockInput
                style={{ marginLeft: 5, flex: 1 }}
                placeholder="12345678"
                keyboardType="number-pad"
                name="phoneNumber"
                value={state.phoneNumber}
                onChange={onValueChange}
              />
            </View>
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
          onPress={() => props.navigation.navigate("Verification")}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const CreateAccount = (props: CreateAccountProps) => {
  const navigation = useNavigation();
  return <CreateAccountView {...props} navigation={navigation} />;
};
export default CreateAccount;
