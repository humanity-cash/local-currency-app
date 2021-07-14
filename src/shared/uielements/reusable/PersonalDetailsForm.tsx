import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import countries from "src/mocks/countries";
import { colors } from "src/theme/colors";
import { IMap, PersonalDetailsErrors } from "src/utils/types";
import { validateDetailsForm } from "src/utils/validation";
import BlockInput from "../BlockInput";
import SelectModal, { SelectionProps } from "../SelectModal";

const MAIN_COUNTRY = "swiss";

interface PersonalDetailsState extends IMap {
  firstname: string;
  lastname: string;
  nationality: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
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
    nationality: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
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
      nationality: personalDetails.nationality,
      birthDay: personalDetails.dateOfBirth.day,
      birthMonth: personalDetails.dateOfBirth.month,
      birthYear: personalDetails.dateOfBirth.year,
    });
  }, [personalDetails]);

  const onValueChange = (name: any, change: any) => {
    setState({
      ...state,
      [name]: change,
    } as any);
    if (name === "day" || name === "month" || name === "year") {
      updatePersonalDetails({
        dateOfBirth: { ...personalDetails.dateOfBirth, [name]: change },
      });
      return;
    }
    updatePersonalDetails({ [name]: change });
  };

  return (
    <View>
      <Text h3>first name as in passport</Text>
      {showValidation && validationErrors.firstname && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.firstname}
        </Text>
      )}
      <BlockInput
        name="firstname"
        placeholder="First name (as in passport)"
        value={state.firstname}
        onChange={onValueChange}
      />
      <Text h3>last name as in passport</Text>
      {showValidation && validationErrors.lastname && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.lastname}
        </Text>
      )}
      <BlockInput
        name="lastname"
        placeholder="Last name (as in passport)"
        value={state.lastname}
        onChange={onValueChange}
      />
      <Text h3>nationality</Text>
      {showValidation && validationErrors.nationality && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.nationality}
        </Text>
      )}
      <SelectModal
        name="nationality"
        value={state.nationality}
        onChange={onValueChange}
        modalHeader="Select your nationality"
        modalMainOption={countries.find(
          (country: SelectionProps) => country.value === MAIN_COUNTRY
        )}
        modalList={countries.filter(
          (country: SelectionProps) => country.value !== MAIN_COUNTRY
        )}
        modalListLabel="other"
      />
      <Text h3>Date of birth</Text>
      {showValidation && validationErrors.dateOfBirth && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.dateOfBirth}
        </Text>
      )}
      <View
        style={{
          flexDirection: "row",
          width: "60%",
        }}
      >
        <BlockInput
          style={{ flex: 1, textAlign: "center" }}
          placeholder="DD"
          keyboardType="number-pad"
          name="day"
          maxLength={2}
          value={state.birthDay}
          onChange={onValueChange}
        />
        <BlockInput
          style={{ marginLeft: 5, flex: 1, textAlign: "center" }}
          placeholder="MM"
          keyboardType="number-pad"
          name="month"
          maxLength={2}
          value={state.birthMonth}
          onChange={onValueChange}
        />
        <BlockInput
          style={{ marginLeft: 5, flex: 2, textAlign: "center" }}
          placeholder="YYYY"
          keyboardType="number-pad"
          name="year"
          maxLength={4}
          value={state.birthYear}
          onChange={onValueChange}
        />
      </View>
    </View>
  );
};

export default PersonalDetailsForm;