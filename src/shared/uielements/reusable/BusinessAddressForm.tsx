import React, { useEffect, useState } from "react";
import { View, StyleSheet, Picker } from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import countries from "src/mocks/countries";
import { colors } from "src/theme/colors";
import { IMap, BusinessAddressErrors } from "src/utils/types";
import { validateBusinessAddressForm } from "src/utils/validation";
import BlockInput from "../BlockInput";

interface BusinessAddressState extends IMap {
  addressLine: string;
  addressLine2: string;
  zipCode: string;
  city: string;
  country: string;
}

interface BusinessAddressProps {
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

const BusinessAddressForm = (props: BusinessAddressProps) => {
  const { businessDetails, updateBusinessDetails } = useUserDetails();
  const [
    validationErrors,
    setValidationErrors,
  ] = useState<BusinessAddressErrors>({});
  const [state, setState] = useState<BusinessAddressState>({
    addressLine: "",
    addressLine2: "",
    zipCode: "",
    city: "",
    country: "",
    phoneNumber: "",
  });
  const { showValidation } = props;

  useEffect(() => {
    const validation = validateBusinessAddressForm(businessDetails);
    setValidationErrors(validation.errors);
  }, [businessDetails]);

  useEffect(() => {
    props.isValid(
      Object.keys(state).every(
        (key) => state[key] !== "" || key === "addressLine2" || key === "phoneNumber"
      )
    );
  }, [state]);

  useEffect(() => {
    setState({
      addressLine: businessDetails.addressLine,
      addressLine2: businessDetails.addressLine2,
      zipCode: businessDetails.zipCode,
      city: businessDetails.city,
      country: businessDetails.country,
      phoneNumber: businessDetails.phoneNumber
    });
  }, [businessDetails]);

  const onValueChange = (name: any, change: any) => {
    setState({
      ...state,
      [name]: change,
    } as any);
    updateBusinessDetails({ [name]: change });
  };

  return (
    <View>
      <View style={styles.container}>
          <Text style={styles.bodyText}>Where can customers find you?</Text>
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

      <Text style={styles.label}>PHONE NUMBER - OPTIONAL</Text>
      <BlockInput
        name="phoneNumber"
        placeholder="+00 0987 6543 21"
        value={state.phoneNumber}
        onChange={onValueChange}
        style={props.style}
      />
    </View>
  );
};

export default BusinessAddressForm;