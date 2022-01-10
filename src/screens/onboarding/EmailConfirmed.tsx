import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/contexts";
import { BUTTON_TYPES } from "src/constants";
import { BackBtn, Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
  baseHeader,
  viewBase,
  wrappingContainerBase
} from "src/theme/elements";
import { LoadingPage } from "src/views";

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    color: colors.darkGreen,
    lineHeight: 35
  },
  bodyText: {
    color: colors.bodyText
  },
  bottomNavigation: {
    justifyContent: "center"
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20
  },
  image: {
    alignSelf: "center",
    width: 280,
    height: 280
  },
  imageView: {
    justifyContent: "center",
    textAlignVertical: "center",
    flex: 1
  }
});

const EmailConfirmed = (): JSX.Element => {
  const navigation = useNavigation();
  const { signUpDetails, signIn, signInDetails } = useContext(AuthContext);
  const [isLoading, setLoading] = useState<boolean>(false);
  const email = signUpDetails?.email || signInDetails?.email;
  const password = signUpDetails?.password || signInDetails?.password;

  const onNext = async () => {
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
  };

  return (
    <View style={viewBase}>
      <LoadingPage visible={isLoading} isData={true} />
      <Header leftComponent={<BackBtn onClick={() => navigation.goBack()} />} />
      <View style={wrappingContainerBase}>
        <View style={baseHeader}>
          <Text style={styles.headerText}>Mail address confirmed!</Text>
        </View>
        <Text style={styles.bodyText}>
          Your email address {email} is confirmed.
        </Text>
      </View>
      <SafeAreaView style={styles.bottomView}>
        <Button type={BUTTON_TYPES.DARK_GREEN} title="NEXT" onPress={onNext} />
      </SafeAreaView>
    </View>
  );
};

export default EmailConfirmed;
