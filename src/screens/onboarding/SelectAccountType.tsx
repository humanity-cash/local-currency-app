import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from "react-native";
import { Text, CheckBox } from "react-native-elements";
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
    viewBaseWhite,
    wrappingContainerBase
} from "src/theme/elements";
import { IMap } from "src/utils/types";
import { colors } from "src/theme/colors";

const MAIN_COUNTRY = "swiss";
const MAIN_PHONE_COUNTRY = "+41";

interface CreateAccountState extends IMap {
  email: string;
}

type CreateAccountProps = {
  navigation?: any;
  route?: any;
};

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
    color: colors.darkRed,
    lineHeight: 30
	},
  bottomView: {
		padding: 20,
	},
  checkbox: {
    alignSelf: "center",
    color: colors.darkRed,
    marginLeft: 10,
    marginRight: 10
  },
});

const CreateAccountView = (props: CreateAccountProps) => {
  const { personalDetails, updatePersonalDetails } = useUserDetails();
  const [isSelected, setSelection] = useState(false);
  const [state, setState] = useState<CreateAccountState>({
    email: "",
  });
  const [goNext, setGoNext] = useState(false);

  useEffect(() => {
    setGoNext(Object.keys(state).every((key) => state[key] !== "") && isSelected);
  }, [state, isSelected]);

  // useEffect(() => {
  //   setState({
  //     email: personalDetails.username,
  //   });
  // }, [personalDetails]);

  const onValueChange = (name: any, change: any) => {
    setState({
      ...state,
      [name]: change,
    } as any);
    updatePersonalDetails({ [name]: change });
  };

  return (
    <View style={viewBaseWhite}>
      <Header
        leftComponent={<BackBtn onClick={() => props.navigation.goBack()} color={colors.darkRed} />}
      />

      <ScrollView style={wrappingContainerBase}>
        <View style={{ paddingBottom: 40 }}>
          <View style={baseHeader}>
            <Text style={styles.headerText}>Create account</Text>
          </View>
          <View
            style={{
              borderBottomColor: colors.darkRed,
              borderBottomWidth: 1,
            }}
          />
          <View>
            <Text style={{color: colors.darkRed}}>Hello! Tell us how to reach you. We will send a Verification code to your email.</Text>
            <Text style={{color: colors.darkRed, fontSize: 14, fontWeight: '400', marginTop: 40}}>Email Address</Text>
            <BlockInput
              name="email"
              placeholder="myname@mail.com"
              value={state.email}
              onChange={onValueChange}
              style={{backgroundColor: colors.azure}}
              placeholderTextColor={colors.darkRed}
            />
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.bottomView}>
          <CheckBox
            checked={isSelected}
            title="I'VE READ AND ACCEPT THE TERMS & CONDITIONS AND PRIVACY POLICY"
            textStyle={{color: colors.darkRed, fontSize: 14, fontWeight: '400'}}
            containerStyle={{borderWidth: 0, backgroundColor: 'none'}}
            onPress={()=>setSelection(!isSelected)}
          />
          <Button
            type="darkRed"
            title="NEXT"
            disabled={!goNext}
            onPress={() => props.navigation.navigate("Verification")}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const CreateAccount = (props: CreateAccountProps) => {
  const navigation = useNavigation();
  return <CreateAccountView {...props} navigation={navigation} />;
};
export default CreateAccount;
