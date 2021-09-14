import * as ImagePicker from 'expo-image-picker';
import React, { ReactElement, useContext } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Image, Text } from "react-native-elements";
import { AuthContext } from "src/auth";
import { IAuth } from "src/auth/types";
import { useMediaLibraryPermission } from "src/hooks";
import { colors } from "src/theme/colors";
import BlockInput from "../BlockInput";

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
    color: colors.purple,
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

const BusinessProfileForm = (): ReactElement => {
  const { buisnessBasicVerification, setBuisnessBasicVerification } =
		useContext(AuthContext);

  useMediaLibraryPermission();

  const onValueChange = (name: string, change: string) => {
    setBuisnessBasicVerification((pv: IAuth) => ({ ...pv, [name]: change }));
  };

  const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
	
		if (!result.cancelled) {
		  	onValueChange('profilePicture', result.uri);
		}
	};

  return (
		<View style={styles.container}>
			<Text style={styles.bodyText}>*Required fields</Text>
			<View style={styles.pickImageView}>
				<TouchableOpacity onPress={pickImage}>
					{buisnessBasicVerification.profilePicture === "" && (
						<View style={styles.imageView}>
							<Image
								source={require("../../../../assets/images/placeholder4.png")}
								containerStyle={styles.image}
							/>
						</View>
					)}
					{buisnessBasicVerification.profilePicture !== "" && (
						<Image
							source={{ uri: buisnessBasicVerification.profilePicture }}
							style={styles.imageView}
						/>
					)}
				</TouchableOpacity>
				<Text style={styles.label}>Upload profile picture</Text>
				<Text style={styles.smallLabel}>
					(Max 200 MB / .jpeg, .jpg, .png)
				</Text>
			</View>
			<Text style={styles.smallLabel}>
				BUSINESS NAME - THIS NAME WILL BE PUBLIC*
			</Text>
			<BlockInput
				name="businessname"
				placeholder="Business name"
				placeholderTextColor={colors.greyedPurple}
				value={buisnessBasicVerification.tag}
				onChange={onValueChange}
				style={styles.inputBg}
			/>

			<Text style={styles.smallLabel}>
				TELL US YOUR STORY (50 WORDS MAX)
			</Text>
			<TextInput
				placeholder="Tell the world about your business. What gives you joy as an entrepreneur? What do you love about the Berkshires?"
				value={buisnessBasicVerification.story}
				multiline={true}
				onChangeText={(newValue) =>
					onValueChange("story", newValue)
				}
				style={styles.storyText}
				numberOfLines={6}
			/>
		</View>
  );
};

export default BusinessProfileForm;