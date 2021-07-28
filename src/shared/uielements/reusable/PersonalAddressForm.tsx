import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import countries from "src/mocks/countries";
import { colors } from "src/theme/colors";
import { IMap, PersonalAddressErrors } from "src/utils/types";
import { validateAddressForm } from "src/utils/validation";
import BlockInput from "../BlockInput";
import SelectModal, { SelectionProps } from "../SelectModal";

const MAIN_COUNTRY = "swiss";

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
}

const PersonalAddressForm = (props: PersonalAddressProps) => {
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

  const onValueChange = (name: any, change: any) => {
    setState({
      ...state,
      [name]: change,
    } as any);
    updatePersonalDetails({ [name]: change });
  };

  return (
    <View>
      <View
        style={{
        borderTopColor: colors.darkRed,
        borderTopWidth: 1,
        marginBottom: 20
        }}>
          <Text style={{color: colors.darkRed}}>We use your personal details to set up your BerkShares Wallet. Don't worry. This information is not shared publicly!</Text>
      </View>
      <Text h3>ADDRESS 1</Text>
      {showValidation && validationErrors.addressLine && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.addressLine}
        </Text>
      )}
      <BlockInput
        name="addressLine"
        placeholder="Street number, street name"
        value={state.addressLine}
        onChange={onValueChange}
        style={{backgroundColor: colors.azure}}
      />
      <Text h3>ADDRESS 2</Text>
      {showValidation && validationErrors.addressLine2 && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.addressLine2}
        </Text>
      )}
      <BlockInput
        name="addressLine2"
        placeholder="Apt."
        value={state.addressLine2}
        onChange={onValueChange}
        style={{backgroundColor: colors.azure}}
      />
      
      <Text h3>CITY</Text>
      {showValidation && validationErrors.city && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.city}
        </Text>
      )}
      <BlockInput
        name="city"
        placeholder="City"
        value={state.city}
        onChange={onValueChange}
        style={{backgroundColor: colors.azure}}
      />
      <Text h3>STATE</Text>
      {showValidation && validationErrors.country && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.country}
        </Text>
      )}
      <SelectModal
        name="country"
        value={state.country}
        onChange={onValueChange}
        modalHeader="Select your country"
        modalDescription="Sorry, your country is not supported yet if it is not listed here."
        modalMainOption={countries.find(
          (country: SelectionProps) => country.value === MAIN_COUNTRY
        )}
        modalList={countries.filter(
          (country: SelectionProps) => country.value !== MAIN_COUNTRY
        )}
        modalListLabel="other"
        style={{backgroundColor: colors.azure}}
      />
      <Text h3>POSTAL CODE</Text>
      {showValidation && validationErrors.zipCode && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.zipCode}
        </Text>
      )}
      <BlockInput
        name="zipCode"
        placeholder="00000"
        keyboardType="number-pad"
        value={state.zipCode}
        onChange={onValueChange}
        style={{backgroundColor: colors.azure}}
      />
    </View>
  );
};

export default PersonalAddressForm;