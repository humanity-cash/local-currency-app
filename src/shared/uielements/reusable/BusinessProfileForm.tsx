import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { Text, Image } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { useUserDetails } from "src/hooks";
import { colors } from "src/theme/colors";
import { IMap, BusinessDetailsErrors } from "src/utils/types";
import { validateBusinessDetailsForm } from "src/utils/validation";
import BlockInput from "../BlockInput";

interface BusinessProfileState extends IMap {
  avatar: string;
  businessname: string;
  businessStory: string;
}

interface BusinessProfileProps {
  isValid: (valid: boolean) => void;
  showValidation?: boolean;
}

const styles = StyleSheet.create({
  inputBg: {
    backgroundColor: colors.white
  },
  container: {
    flex: 1,
    paddingBottom: 40
  },
  bodyText: {
		color: colors.bodyText
	},
  pickImageView: {
    paddingTop: 50,
    paddingBottom: 30,
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
    backgroundColor: colors.white,
    borderRadius: 3,
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
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40
  }
});

const BusinessProfileForm = (props: BusinessProfileProps) => {
  const { businessDetails, updateBusinessDetails } = useUserDetails();
  const [validationErrors, setValidationErrors] = useState<BusinessDetailsErrors>({});
  const [state, setState] = useState<BusinessProfileState>({
    avatar: "",
    businessname: "",
    businessStory: ""
  });
  const { showValidation } = props;

  useEffect(() => {
		(async () => {
		  if (Platform.OS !== 'web') {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
			  alert('Sorry, we need camera roll permissions to make this work!');
			}
		  }
		})();
	}, []);

  useEffect(() => {
    const validation = validateBusinessDetailsForm(businessDetails);
    setValidationErrors(validation.errors);
  }, [businessDetails]);

  useEffect(() => {
    props.isValid(state.username !== "");
  }, [state]);

  useEffect(() => {
    setState({
      avatar: businessDetails.avatar,
      businessname: businessDetails.businessname,
      businessStory: businessDetails.businessStory
    });
  }, [businessDetails]);

  const onValueChange = (name: any, change: any) => {
    setState({
      ...state,
      [name]: change,
    } as any);
    updateBusinessDetails({ [name]: change });
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
                source={require('../../../../assets/images/placeholder4.png')}
                containerStyle={styles.image} 
              />
            </View>
          }
          {state.avatar !== '' && <Image source={{ uri: state.avatar }} style={styles.imageView} />}
        </TouchableOpacity>
        <Text style={styles.label}>Upload profile picture</Text>
        <Text style={styles.smallLabel}>(Max 200 MB / .jpeg, .jpg, .png)</Text>
      </View>
      <Text style={styles.smallLabel}>BUSINESS NAME - THIS NAME WILL BE PUBLIC*</Text>
      <BlockInput
        name="businessname"
        placeholder="Business name"
        value={state.businessname}
        onChange={onValueChange}
        style={styles.inputBg}
      />

      <Text style={styles.smallLabel}>TELL US YOUR STORY (50 WORDS MAX)</Text>
      <TextInput
        placeholder="Tell the world about your business. What gives you joy as an entrepreneur? What do you love about the Berkshires?"
        value={state.businessStory}
        multiline={true}
        onChangeText={newValue => onValueChange("businessStory", newValue)}
        style={styles.storyText}
        numberOfLines={6}
      />
    </View>
  );
};

export default BusinessProfileForm;