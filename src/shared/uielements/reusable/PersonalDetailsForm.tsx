import React, { ReactElement, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/auth";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import { IMap } from "src/utils/types";
import BlockInput from "../BlockInput";


interface PersonalDetailsState extends IMap {
  firstname: string;
  lastname: string;
}

interface PersonalDetailsProps {
  isValid: (valid: boolean) => void;
  showValidation?: boolean;
  style?: any;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  bodyText: {
    color: colors.bodyText
  },
  label: {
    color: colors.bodyText,
    fontSize: 10
  }
});

const PersonalDetailsForm = (props: PersonalDetailsProps): ReactElement => {
  const { customerBasicVerificationDetails, setCustomerBasicVerificationDetails } = useContext(AuthContext);

  const onValueChange = (name: string, change: string) => {
		setCustomerBasicVerificationDetails((pv: any) => ({
			...pv,
			[name]: change,
		}));
  };

  return (
    <View>
      <View
        style={styles.container}>
          <Text style={styles.bodyText}>{Translation.PROFILE.PERSIONAL_DETAILS_BODY}</Text>
      </View>
      <Text style={styles.label}>{Translation.LABEL.FIRST_NAME}</Text>
      {/* {false && validationErrors.firstname && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.firstname}
        </Text>
      )} */}
      <BlockInput
        name="firstname"
        placeholder="First name"
        value={customerBasicVerificationDetails.firstName}
        onChange={onValueChange}
        style={props.style}
      />
      <Text style={styles.label}>{Translation.LABEL.LAST_NAME}</Text>
      {/* {false && validationErrors.lastname && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.lastname}
        </Text>
      )} */}
      <BlockInput
        name="lastname"
        placeholder="Last name"
        value={customerBasicVerificationDetails.lastName}
        onChange={onValueChange}
        style={props.style}
      />
    </View>
  );
};

export default PersonalDetailsForm;

  // useEffect(() => {
  //   const validation = validateDetailsForm(personalDetails);
  //   setValidationErrors(validation.errors);
  // }, [personalDetails]);

  // useEffect(() => {
  //   props.isValid(Object.keys(state).every((key) => state[key] !== ""));
  // }, [state]);
