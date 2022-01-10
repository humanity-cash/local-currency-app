import * as ImagePicker from "expo-image-picker";
import React, { ReactElement, useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image, Text } from "react-native-elements";
import { UserContext } from "src/contexts";
import { useMediaLibraryPermission } from "src/hooks";
import { colors } from "src/theme/colors";
import BlockInput from "../BlockInput";
import { prefixCustomerName } from "../../../utils/common";

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
    justifyContent: "center",
    alignItems: "center"
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
    color: colors.text
  },
  imageView: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.inputBg
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40
  }
});

const PersonalProfileForm = (): ReactElement => {
  const { user, updateCustomerData } = useContext(UserContext);
  const customer = user?.customer;
  const tag = customer?.tag;
  const avatar = customer?.avatar;

  // useMediaLibraryPermission();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.cancelled) {
      updateCustomerData({ avatar: result.uri });
    }
  };

  const onValueChange = (name: string, change: string) => {
    updateCustomerData({ tag: change });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bodyText}>*Required fields</Text>
      <View style={styles.pickImageView}>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.imageView}>
            {avatar === "" && (
              <Image
                source={require("../../../../assets/images/placeholder5.png")}
                containerStyle={styles.image}
              />
            )}
            {avatar !== "" && (
              <Image
                source={{
                  uri: avatar
                }}
                style={styles.image}
              />
            )}
          </View>
        </TouchableOpacity>
        <Text style={styles.label}>UPLOAD PROFILE PICTURE</Text>
        <Text style={styles.smallLabel}>(Max 200 MB / .jpeg, .jpg, .png)</Text>
      </View>
      <Text style={styles.smallLabel}>USER NAME*</Text>
      <BlockInput
        name="tag"
        placeholder="@username"
        value={prefixCustomerName(tag ?? "")}
        onChange={onValueChange}
      />
    </View>
  );
};

export default PersonalProfileForm;
