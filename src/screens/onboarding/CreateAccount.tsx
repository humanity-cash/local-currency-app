import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from "react-native";
import { Text, CheckBox } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import BlockInput from "src/shared/uielements/BlockInput";
import Button from "src/shared/uielements/Button";
import BackBtn from "src/shared/uielements/header/BackBtn";
import Header from "src/shared/uielements/header/Header";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { IMap } from "src/utils/types";
import { colors } from "src/theme/colors";

interface CreateAccountState extends IMap {
  email: string;
}

type CreateAccountProps = {
  navigation?: any;
  route?: any;
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40
  },
	headerText: {
		fontSize: 32,
    color: colors.darkGreen,
    lineHeight: 35
	},
  bodyText: {
    color: colors.bodyText
  },
  form: {
    marginTop: 30
  },
  label: {
    fontSize: 10
  },
  bottomView: {
		paddingHorizontal: 20,
    paddingBottom: 50
	},
  checkboxView: {
    fontWeight: '400',
    color: colors.darkGreen, 
    fontSize: 14
  },
  checkboxContainer: {
    borderWidth: 0, 
    backgroundColor: 'transparent'
  }
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
        <View style={ styles.container }>
          <View style={baseHeader}>
            <Text style={styles.headerText}>Create account</Text>
          </View>
          <Text style={styles.bodyText}>Hello! Tell us how to reach you. We will send a Verification code to your email.</Text>
          <View style={styles.form}>
            <Text style={styles.label}>Email Address</Text>
            <BlockInput
              name="email"
              placeholder="myname@mail.com"
              value={state.email}
              onChange={onValueChange}
              placeholderTextColor={colors.lightGreen}
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
            title="I've read and accept the Terms & Conditions and Privacy Policy"
            textStyle={styles.checkboxView}
            containerStyle={styles.checkboxContainer}
            onPress={()=>setSelection(!isSelected)}
          />
          <Button
            type="darkGreen"
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
