import { IDBUser } from "@humanity.cash/types";
import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useContext, useEffect, useState } from "react";
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
import { AuthContext, UserContext } from "src/contexts";
import { NavigationViewContext, ViewState } from "src/contexts/navigation";
import { LoadingPage } from "src/views";
import {
  BackBtn,
  BusinessAddressForm,
  Button,
  CancelBtn,
  Header,
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  underlineHeaderB,
  viewBaseB,
  wrappingContainerBase,
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { isSuccessResponse } from "src/utils/http";

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    lineHeight: 32,
    color: colors.purple,
  },
  bodyView: {
    paddingTop: 50,
    paddingHorizontal: 17,
  },
  bodyText: {
    color: colors.bodyText,
    marginBottom: 20,
  },
  label: {
    marginTop: 30,
    color: colors.bodyText,
    fontSize: 10,
  },
  input: {
    color: colors.purple,
    backgroundColor: colors.white,
  },
  formView: {
    paddingBottom: 120,
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

const BusinessAddress = (): ReactElement => {
  const [goNext, setGoNext] = useState<boolean>(false);
  const { signOut, userEmail } = useContext(AuthContext);
  const navigation = useNavigation();
  const { user, updateUserData, updateUserType } = useContext(UserContext);
  const business = user?.business;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const address1 = business?.address1;
  const city = business?.city;
  const postalCode = business?.postalCode;
  const phoneNumber = business?.phoneNumber;
  const state = business?.state;
  const { updateSelectedView } = useContext(NavigationViewContext);

  useEffect(() => {
    const allInputsFilled =
      Boolean(address1) &&
      Boolean(city) &&
      Boolean(state) &&
      Boolean(postalCode);

    setGoNext(allInputsFilled);
  }, [address1, city, postalCode, state, phoneNumber]);

  const onNextPress = async () => {
    if (!user) return;
    setIsLoading(true);
    user.email = userEmail;
    const response = await UserAPI.createBusiness(user);
    if (isSuccessResponse(response)) {
      const newUser: IDBUser = response?.data;
      updateUserData(newUser);
      updateUserType(UserType.Business, newUser.email);
      setIsLoading(false);
      updateSelectedView(ViewState.BusinessLinkBank);
      return;
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === "ios" && { behavior: "padding" })}
      style={viewBaseB}
    >
      <LoadingPage visible={isLoading} isData={true} />
      <Header
        leftComponent={
          <BackBtn color={colors.purple} onClick={() => navigation.goBack()} />
        }
        rightComponent={
          <CancelBtn
            color={colors.purple}
            text={Translation.BUTTON.LOGOUT}
            onClick={signOut}
          />
        }
      />
      <View style={wrappingContainerBase}>
        <View style={underlineHeaderB}>
          <Text style={styles.headerText}>
            {Translation.PROFILE.BUSINESS_INFORMATION}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.formView}>
            <Text style={styles.bodyText}>Where can customers find you?</Text>
            <BusinessAddressForm style={styles.input} />
          </View>
        </ScrollView>
      </View>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type="purple"
          title={Translation.BUTTON.NEXT}
          disabled={!goNext}
          onPress={onNextPress}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default BusinessAddress;
