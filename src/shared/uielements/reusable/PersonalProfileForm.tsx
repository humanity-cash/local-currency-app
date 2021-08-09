import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { Text, Image } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { useUserDetails } from "src/hooks";
import { colors } from "src/theme/colors";
import { IMap, PersonalDetailsErrors } from "src/utils/types";
import { validateDetailsForm } from "src/utils/validation";
import BlockInput from "../BlockInput";

interface PersonalProfileState extends IMap {
  avatar: string;
  username: string;
}

interface PersonalProfileProps {
  isValid: (valid: boolean) => void;
  showValidation?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40
  },
  bodyText: {
		color: colors.bodyText
	},
  pickImageView: {
    paddingTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    color: colors.bodyText
  },
  smallLabel: {
    color: colors.bodyText,
    fontSize: 10
  },
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
  imageView: {
    width: 80, 
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 20
  }
});

const PersonalProfileForm = (props: PersonalProfileProps) => {
  const { personalDetails, updatePersonalDetails } = useUserDetails();
  const [validationErrors, setValidationErrors] = useState<PersonalDetailsErrors>({});
  const [state, setState] = useState<PersonalProfileState>({
    avatar: "",
    username: ""
  });
  const { showValidation } = props;

  useEffect(() => {
		(async () => {
		  if (Platform.OS !== 'web') {
			const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
			if (status !== 'granted') {
			  alert('Sorry, we need camera roll permissions to make this work!');
			}
		  }
		})();
	}, []);

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
      username: personalDetails.username
    });
  }, [personalDetails]);

  const onValueChange = (name: any, change: any) => {
    setState({
      ...state,
      [name]: change,
    } as any);
    updatePersonalDetails({ [name]: change });
  };

  const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
	
		if (!result.cancelled) {
		  	onValueChange('avatar', result.uri);
		}
	};

  return (
    <View style={styles.container}>
      <Text style={styles.bodyText}>*Required fields</Text>
      <View style={styles.pickImageView}>
        <TouchableOpacity onPress={pickImage}>
          {state.avatar === '' && 
            <View style={styles.imageView}>
              <Image 
                source={require('../../../../assets/images/camera.png')}
                containerStyle={styles.image} 
              />
            </View>
          }
          {state.avatar !== '' && <Image source={{ uri: state.avatar }} style={styles.imageView} />}
        </TouchableOpacity>
        <Text style={styles.label}>UPLOAD PROFILE PICTURE</Text>
        <Text style={styles.smallLabel}>(Max 200 MB / .jpeg, .jpg, .png)</Text>
      </View>
      <Text style={styles.smallLabel}>USER NAME*</Text>
      <BlockInput
        name="username"
        placeholder="@username"
        value={state.username}
        onChange={onValueChange}
      />
    </View>
  );
};

export default PersonalProfileForm;