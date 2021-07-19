import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { TextInput, StyleSheet } from 'react-native';
import { useUserDetails } from "src/hooks";
import { colors } from "src/theme/colors";
import { IMap, PersonalDetailsErrors } from "src/utils/types";
import { validateDetailsForm } from "src/utils/validation";
import BlockInput from "../BlockInput";

const MAIN_COUNTRY = "swiss";

interface PersonalProfileState extends IMap {
  avatar: string;
  username: string;
  story: string;
}

interface PersonalProfileProps {
  isValid: (valid: boolean) => void;
  showValidation?: boolean;
}

const styles = StyleSheet.create({
  storyText: {
    fontSize: 16,
    backgroundColor: colors.azure,
    borderRadius: 2,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 8,
    borderWidth: 0,
    color: colors.text,
  },
});

const PersonalProfileForm = (props: PersonalProfileProps) => {
  const { personalDetails, updatePersonalDetails } = useUserDetails();
  const [
    validationErrors,
    setValidationErrors,
  ] = useState<PersonalDetailsErrors>({});
  const [state, setState] = useState<PersonalProfileState>({
    avatar: "",
    username: "",
    story: "",
  });
  const { showValidation } = props;

  useEffect(() => {
    const validation = validateDetailsForm(personalDetails);
    setValidationErrors(validation.errors);
  }, [personalDetails]);

  useEffect(() => {
    props.isValid(state.username !== "");
  }, [state]);

  useEffect(() => {
    setState({
      avatar: personalDetails.avatar,
      username: personalDetails.username,
      story: personalDetails.story,
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
          <Text h3 style={{color: colors.darkRed}}>*REQUIRED FIELDS</Text>
      </View>
      <Text h3>USER HANDLE*</Text>
      {showValidation && validationErrors.username && (
        <Text h3 style={{ marginTop: 5, color: colors.textError }}>
          {validationErrors.username}
        </Text>
      )}
      <BlockInput
        name="username"
        placeholder="@username"
        value={state.username}
        onChange={onValueChange}
        style={{backgroundColor: colors.azure}}
      />
      <Text h3>TELL US YOUR STORY (50 WORDS MAX)</Text>
      <TextInput
        multiline={true}
        numberOfLines={5}
        placeholder=":)"
        value={state.story}
        onChangeText={newValue => onValueChange("story", newValue)}
        style={styles.storyText}
      />
    </View>
  );
};

export default PersonalProfileForm;