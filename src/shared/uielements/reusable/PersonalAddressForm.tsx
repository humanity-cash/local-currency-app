import React, { useEffect, useState, ReactElement } from "react";
import { View, StyleSheet, Picker } from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import countries from "src/mocks/countries";
import { colors } from "src/theme/colors";
import { IMap, PersonalAddressErrors } from "src/utils/types";
import { validateAddressForm } from "src/utils/validation";
import BlockInput from "../BlockInput";

interface PersonalAddressState extends IMap {
  addressLine: string;
  addressLine2: string;
  zipCode: string;
  city: string;
  country: string;
}

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
  const { personalDetails, updatePersonalDetails } = useUserDetails();
  const [
    validationErrors,
    setValidationErrors,
  ] = useState<PersonalAddressErrors>({});
  const [state, setState] = useState<PersonalAddressState>({
    addressLine: "",
    addressLine2: "",
    zipCode: "",
    city: "",
    country: "",
  });
  const { showValidation } = props;

  useEffect(() => {
    const validation = validateAddressForm(personalDetails);
    setValidationErrors(validation.errors);
  }, [personalDetails]);

  useEffect(() => {
    props.isValid(
      Object.keys(state).every(
        (key) => state[key] !== "" || key === "addressLine2"
      )
    );
  }, [state]);

  useEffect(() => {
    setState({
      addressLine: personalDetails.addressLine,
      addressLine2: personalDetails.addressLine2,
      zipCode: personalDetails.zipCode,
      city: personalDetails.city,
      country: personalDetails.country,
    });
  }, [personalDetails]);

  const onValueChange = (name: string, change: string) => {
    setState({
      ...state,
      [name]: change,
    } as PersonalAddressState);
    updatePersonalDetails({ [name]: change });
  };

  return (
    <View>
      <View style={styles.container}>
          <Text style={styles.bodyText}>We use your personal details to set up your BerkShares Wallet. Don't worry. This information is not shared publicly!</Text>
      </View>
      <Text style={styles.label}>ADDRESS 1</Text>
      {showValidation && validationErrors.addressLine && (
        <Text style={styles.errorLabel}>
          {validationErrors.addressLine}
        </Text>
      )}
      <BlockInput
        name="addressLine"
        placeholder="Street number, street name"
        value={state.addressLine}
        onChange={onValueChange}
        style={props.style}
      />
      <Text style={styles.label}>ADDRESS 2</Text>
      {showValidation && validationErrors.addressLine2 && (
        <Text style={styles.errorLabel}>
          {validationErrors.addressLine2}
        </Text>
      )}
      <BlockInput
        name="addressLine2"
        placeholder="Apt."
        value={state.addressLine2}
        onChange={onValueChange}
        style={props.style}
      />
      
      <View style={styles.inlineView}>
        <View style={styles.cityView}>
          <Text style={styles.label}>CITY</Text>
          {showValidation && validationErrors.city && (
            <Text style={styles.errorLabel}>
              {validationErrors.city}
            </Text>
          )}
          <BlockInput
            name="city"
            placeholder="City"
            value={state.city}
            onChange={onValueChange}
            style={props.style}
          />
        </View>
        <View style={styles.stateView}>
          <Text style={styles.label}>STATE</Text>
          {showValidation && validationErrors.country && (
            <Text style={styles.errorLabel}>
              {validationErrors.country}
            </Text>
          )}
          <Picker
            selectedValue={state.country}
            style={styles.picker}
            onValueChange={(itemValue) => onValueChange("country", itemValue)}
          >
            {
              countries.map((country: string, idx: number) => <Picker.Item label={country} value={country} key={idx} />)
            }
          </Picker>
        </View>
      </View>
      
      <Text style={styles.label}>POSTAL CODE</Text>
      {showValidation && validationErrors.zipCode && (
        <Text style={styles.errorLabel}>
          {validationErrors.zipCode}
        </Text>
      )}
      <BlockInput
        name="zipCode"
        placeholder="00000"
        keyboardType="number-pad"
        value={state.zipCode}
        onChange={onValueChange}
        style={props.style}
      />
    </View>
  );
};

export default PersonalAddressForm;