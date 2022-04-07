import * as ImagePicker from "expo-image-picker";
import React, { ReactElement, useContext, createRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Image, Text } from "react-native-elements";
import { UserContext } from "src/contexts";
import { colors } from "src/theme/colors";
import BlockInput from "../BlockInput";
import { buildImageFormData, imagePickerConfig } from 'src/utils/common';

const styles = StyleSheet.create({
  inputBg: {
    color: colors.purple,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  bodyText: {
    color: colors.bodyText,
  },
  pickImageView: {
    paddingTop: 10,
    paddingBottom: 30,
    alignItems: 'center'
  },
  label: {
    color: colors.bodyText,
  },
  smallLabel: {
    color: colors.bodyText,
    fontSize: 10,
  },
  storyText: {
    backgroundColor: colors.white,
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 8,
    borderWidth: 0,
    color: colors.purple,
    alignItems: "flex-start",
    textAlignVertical: "top",
  },
  imageView: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: -40,
    backgroundColor: colors.lightPurple
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
	bannerImageView: {
    width: "100%",
		backgroundColor: colors.greyedPurple,
		borderRadius: 5,
		height: 220
	},
	bannerImage: {
    width: "100%",
		borderRadius: 5,
		height: 220,
	},
});

const BusinessProfileForm = (): ReactElement => {
  const { user, updateBusinessData } = useContext(UserContext);
  const business = user?.business;

  const storyRef = createRef<TextInput>();

  const onValueChange = (name: string, change: string) => {
    updateBusinessData({ [name]: change });
  };

  const pickImage = async (name: string) => {
    const result = await ImagePicker.launchImageLibraryAsync(imagePickerConfig);
    if(result.cancelled) return;
    if(name === "banner") {
      onValueChange("banner", result.uri);
    } else if (name === "avatar") {
      onValueChange("avatar", result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bodyText}>*Required fields</Text>
      <View style={styles.pickImageView}>
        <View style={styles.bannerImageView}>
          <TouchableOpacity onPress={() => pickImage("banner")}>
            <Image
                source={{ uri: business?.banner }}
                style={styles.bannerImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageView}>
          <TouchableOpacity
            onPress={() => pickImage("avatar")}>
            <Image
                source={{ uri: business?.avatar }}
                style={styles.image}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.label}>Upload profile picture</Text>
        <Text style={styles.smallLabel}>(MAX 200 MB / .JPEG, .JPG, .PNG)</Text>
      </View>
      <Text style={styles.smallLabel}>
        BUSINESS NAME - THIS NAME WILL BE PUBLIC*
      </Text>
      <BlockInput
        name="tag"
        placeholder="Business name"
        placeholderTextColor={colors.greyedPurple}
        value={business?.tag}
        onChange={onValueChange}
        style={styles.inputBg}
        returnKeyType="next"
        onSubmitEditing={() => {
          storyRef.current?.focus();
        }}
      />

      <Text style={styles.smallLabel}>TELL US YOUR STORY (50 WORDS MAX)*</Text>
      <TextInput
        ref={storyRef}
        placeholder="Tell the world about your business. What gives you joy as an entrepreneur? What do you love about the Berkshires?"
        value={business?.story}
        multiline={true}
        onChangeText={(newValue) => onValueChange("story", newValue)}
        style={styles.storyText}
        numberOfLines={6}
        autoCapitalize="none"
        autoCorrect={false}
        scrollEnabled={false}
      />
    </View>
  );
};

export default BusinessProfileForm;
