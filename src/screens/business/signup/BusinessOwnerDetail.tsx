import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-elements";
import { AuthContext, UserContext } from "src/contexts";
import * as Routes from "src/navigation/constants";
import { BackBtn, Button, CancelBtn, Header } from "src/shared/uielements";
import { BusinessOwnerDetailsForm } from "src/shared/uielements/reusable";
import { colors } from "src/theme/colors";
import {
  underlineHeaderB,
  viewBaseB,
  wrappingContainerBase,
} from "src/theme/elements";
import Translation from "src/translation/en.json";

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
    paddingBottom: 40,
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

const BusinessOwnerDetail = (): JSX.Element => {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);
  const [goNext, setGoNext] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const business = user?.business;

  useEffect(() => {
    setGoNext(
      Boolean(business?.owner?.firstName) && Boolean(business?.owner?.lastName)
    );
  }, [business?.owner?.firstName, business?.owner?.lastName]);

  const onNextPress = () => {
    navigation.navigate(Routes.BUSINESS_OWNER_ADDRESS);
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === "ios" && { behavior: "padding" })}
      style={viewBaseB}
    >
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
      <ScrollView style={wrappingContainerBase}>
        <View style={underlineHeaderB}>
          <Text style={styles.headerText}>
            {Translation.PROFILE.BUSINESS_OWNER}
          </Text>
        </View>
        <View style={styles.formView}>
          <BusinessOwnerDetailsForm style={styles.input} />
        </View>
      </ScrollView>
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

export default BusinessOwnerDetail;
