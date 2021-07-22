import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import { colors } from "src/theme/colors";
import { IMap, PersonalDetailsErrors } from "src/utils/types";
import { validateDetailsForm } from "src/utils/validation";
import BlockInput from "../BlockInput";

interface PersonalDetailsState extends IMap {
  firstname: string;
  lastname: string;
}

interface PersonalDetailsProps {
  isValid: (valid: boolean) => void;
  showValidation?: boolean;
}

const PersonalDetailsForm = (props: PersonalDetailsProps) => {
  const { personalDetails, updatePersonalDetails } = useUserDetails();
  const [
    validationErrors,
    setValidationErrors,
  ] = useState<PersonalDetailsErrors>({});
  const [state, setState] = useState<PersonalDetailsState>({
    firstname: "",
    lastname: "",
  });
  const { showValidation } = props;

  useEffect(() => {
    const validation = validateDetailsForm(personalDetails);
    setValidationErrors(validation.errors);
  }, [personalDetails]);

  useEffect(() => {
    props.isValid(Object.keys(state).every((key) => state[key] !== ""));
  }, [state]);

  useEffect(() => {
    setState({
      firstname: personalDetails.firstname,
      lastname: personalDetails.lastname,
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
      <Text h3>FIRST NAME</Text>
      {showValidation && validationErrors.firstname && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.firstname}
        </Text>
      )}
      <BlockInput
        name="firstname"
        placeholder="First name"
        value={state.firstname}
        onChange={onValueChange}
        style={{backgroundColor: colors.azure}}
      />
      <Text h3>LAST NAME</Text>
      {showValidation && validationErrors.lastname && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.lastname}
        </Text>
      )}
      <BlockInput
        name="lastname"
        placeholder="Last name"
        value={state.lastname}
        onChange={onValueChange}
        style={{backgroundColor: colors.azure}}
      />
    </View>
  );
};

export default PersonalDetailsForm;