import React, { ReactElement, useContext } from "react";
import { Picker, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/auth";
import countries from "src/mocks/countries";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import BlockInput from "../BlockInput";

interface PersonalAddressProps {
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
  },
  errorLabel: {
    color: colors.bodyText,
    fontSize: 10,
    marginTop: 5
  },
  inlineView: {
    flex: 1,
    flexDirection: 'row'
  },
  cityView: {
    width: '70%'
  },
  stateView: {
    width: '30%'
  },
  picker: {
		height: 55,
		borderRadius: 3,
    marginTop: 8,
    marginLeft: 5,
		color: colors.purple,
		backgroundColor: colors.white
	}
});

const PersonalAddressForm = (props: PersonalAddressProps): ReactElement => {
  const { signUpDetails, setSignUpDetails } = useContext(AuthContext);

  const onValueChange = (name: string, change: string) => {
    setSignUpDetails((pv: any) => ({
      ...pv,
      [name]: change,
    }));
  };

  return (
    <View>
      <View style={styles.container}>
          <Text style={styles.bodyText}>{Translation.PROFILE.PERSIONAL_DETAILS_BODY}</Text>
      </View>
      <Text style={styles.label}>{Translation.LABEL.ADDRESS1}</Text>
      {/* {showValidation && validationErrors.addressLine && (
        <Text style={styles.errorLabel}>
          {validationErrors.addressLine}
        </Text>
      )} */}
      <BlockInput
        name="addressLine"
        placeholder="Street number, street name"
        value={signUpDetails.addressLine}
        onChange={onValueChange}
        style={props.style}
      />
      {/* <Text style={styles.label}>{Translation.LABEL.ADDRESS2}</Text>
      {showValidation && validationErrors.addressLine2 && (
        <Text style={styles.errorLabel}>
          {validationErrors.addressLine2}
        </Text>
      )} */}
      <BlockInput
        name="addressLine2"
        placeholder="Apt."
        value={signUpDetails.addressLine2}
        onChange={onValueChange}
        style={props.style}
      />
      
      <View style={styles.inlineView}>
        <View style={styles.cityView}>
          <Text style={styles.label}>{Translation.LABEL.CITY}</Text>
          {/* {showValidation && validationErrors.city && (
            <Text style={styles.errorLabel}>
              {validationErrors.city}
            </Text>
          )} */}
          <BlockInput
            name="city"
            placeholder="City"
            value={signUpDetails.city}
            onChange={onValueChange}
            style={props.style}
          />
        </View>
        <View style={styles.stateView}>
          <Text style={styles.label}>{Translation.LABEL.STATE}</Text>
          {/* {showValidation && validationErrors.country && (
            <Text style={styles.errorLabel}>
              {validationErrors.country}
            </Text>
          )} */}
          <Picker
            selectedValue={signUpDetails.state}
            style={styles.picker}
            onValueChange={(itemValue) => onValueChange("country", itemValue)}
          >
            {
              countries.map((country: string, idx: number) => <Picker.Item label={country} value={country} key={idx} />)
            }
          </Picker>
        </View>
      </View>
      
      <Text style={styles.label}>{Translation.LABEL.POSTAL_CODE}</Text>
      {/* {showValidation && validationErrors.zipCode && (
        <Text style={styles.errorLabel}>
          {validationErrors.zipCode}
        </Text>
      )} */}
      <BlockInput
        name="postalCode"
        placeholder="00000"
        keyboardType="number-pad"
        value={signUpDetails.postalCode}
        onChange={onValueChange}
        style={props.style}
      />
    </View>
  );
};

export default PersonalAddressForm;