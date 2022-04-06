import { IDBUser } from "@humanity.cash/types";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-elements";
import { UserAPI } from "src/api";
import { UserType } from "src/auth/types";
import { BUTTON_TYPES } from "src/constants";
import { AuthContext, UserContext } from "src/contexts";
import { NavigationViewContext, ViewState } from "src/contexts/navigation";
import { LoadingPage } from "src/views";
import {
  BackBtn,
  Button,
  CancelBtn,
  Header,
  PersonalAddressForm,
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  underlineHeader,
  viewBase,
  wrappingContainerBase,
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { isSuccessResponse } from "src/utils/http";
import { buildImageFormData } from 'src/utils/common';
import { purgeImgix, uploadImageToS3 } from "src/api/profilePicture";

const styles = StyleSheet.create({
  content: {
    paddingBottom: 40,
  },
  headerText: {
    fontSize: 32,
    color: colors.darkGreen,
    lineHeight: 35,
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

const PersonalAddress = (): React.ReactElement => {
  const { user, updateUserData, updateUserType } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signOut, userEmail } = useContext(AuthContext);
  const { updateSelectedView } = useContext(NavigationViewContext);
  const navigation = useNavigation();

  const availableNext = () => {
    return (
      user &&
      user.customer &&
      Boolean(user.customer.address1) &&
      Boolean(user.customer.city) &&
      Boolean(user.customer.postalCode) &&
      Boolean(user.customer.state)
    );
  };

  const onNextPress = async () => {
    if (!user || !user?.customer) return;
    setIsLoading(true);
    user.email = userEmail;
    const response = await UserAPI.createCustomer(user);
    if (isSuccessResponse(response)) {
      const newUser: IDBUser = response?.data;
      const dwollaId = newUser.customer?.dwollaId
      const avatar = user.customer?.avatar
      if(dwollaId && avatar) {
        newUser.customer!.avatar = avatar
        uploadProfilePicture(dwollaId, avatar)
      }
      updateUserData(newUser);
      updateUserType(UserType.Customer, newUser.email);
      updateSelectedView(ViewState.CustomerLinkBank);
    }
    setIsLoading(false);
  };

  const uploadProfilePicture = async (dwollaId: string, avatar: string) => {
    const data = await buildImageFormData(avatar, dwollaId);
    await uploadImageToS3(data, dwollaId)
    await purgeImgix(dwollaId);
  }

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === "ios" && { behavior: "padding" })}
      style={viewBase}
    >
      <LoadingPage visible={isLoading} isData={true} />
      <Header
        leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
        rightComponent={
          <CancelBtn text={Translation.BUTTON.LOGOUT} onClick={signOut} />
        }
      />

      <View style={wrappingContainerBase}>
        <View style={underlineHeader}>
          <Text style={styles.headerText}>
            {Translation.PROFILE.PERSIONAL_DETAILS}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.content}>
            <PersonalAddressForm userType={UserType.Customer} />
          </View>
        </ScrollView>
      </View>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type={BUTTON_TYPES.DARK_GREEN}
          title={Translation.BUTTON.NEXT}
          disabled={!availableNext()}
          onPress={onNextPress}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PersonalAddress;
