import React, { ReactElement, useContext, createRef } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Text } from "react-native-elements";
import { UserContext } from "src/contexts";
import { colors } from "src/theme/colors";
import Translation from "src/translation/en.json";
import BlockInput from "../BlockInput";

interface PersonalDetailsProps {
  style?: any;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  bodyText: {
    color: colors.bodyText,
  },
  label: {
    color: colors.bodyText,
    fontSize: 10,
  },
});

const BasicInputWithLabel = ({
  inputStyle,
  labelStyle,
  label,
  onInputChange,
  inputValue,
  placeHolder,
  name,
  inputRef,
  returnKeyType,
  onSubmitEditing,
}: any) => {
  return (
    <>
      <Text style={labelStyle}>{label}</Text>
      <BlockInput
        inputRef={inputRef}
        name={name}
        placeholder={placeHolder}
        value={inputValue}
        onChange={onInputChange}
        style={inputStyle}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    </>
  );
};

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.bodyText}>
        {Translation.PROFILE.PERSIONAL_DETAILS_BODY}
      </Text>
    </View>
  );
};

export const BusinessOwnerDetailsForm = (
  props: PersonalDetailsProps
): ReactElement => {
  const { user, updateBusinessData } = useContext(UserContext);
  const business = user?.business;
  const onValueChange = (name: string, change: string) => {
    updateBusinessData({
      owner: { change },
    });
  };

  return (
    <View>
      <Header />
      <BasicInputWithLabel
        labelStyle={styles.label}
        inputStyle={props.style}
        label={Translation.LABEL.FIRST_NAME}
        name="firstName"
        placeHolder="First Name"
        value={business?.owner.firstName}
        onInputChange={onValueChange}
      />
      <BasicInputWithLabel
        labelStyle={styles.label}
        inputStyle={props.style}
        label={Translation.LABEL.LAST_NAME}
        name="lastName"
        placeHolder="Last Name"
        value={business?.owner.lastName}
        onInputChange={onValueChange}
      />
    </View>
  );
};

const PersonalDetailsForm = (props: PersonalDetailsProps): ReactElement => {
  const { user, updateCustomerData } = useContext(UserContext);
  const customer = user?.customer;
  const firstName = customer?.firstName;
  const lastName = customer?.lastName;

  const lastNameRef = createRef<TextInput>();

  const onValueChange = (name: string, change: string) => {
    updateCustomerData({
      [name]: change,
    });
  };

  return (
    <View>
      <Header />
      <BasicInputWithLabel
        labelStyle={styles.label}
        inputStyle={props.style}
        label={Translation.LABEL.FIRST_NAME}
        name="firstName"
        placeHolder="First Name"
        inputValue={firstName}
        onInputChange={onValueChange}
        returnKeyType="next"
        onSubmitEditing={() => {
          lastNameRef.current?.focus();
        }}
      />
      <BasicInputWithLabel
        inputRef={lastNameRef}
        labelStyle={styles.label}
        inputStyle={props.style}
        label={Translation.LABEL.LAST_NAME}
        name="lastName"
        placeHolder="Last Name"
        inputValue={lastName}
        onInputChange={onValueChange}
      />
    </View>
  );
};

export default PersonalDetailsForm;
