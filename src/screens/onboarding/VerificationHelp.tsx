import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { BackBtn, Header } from "src/shared/uielements";
import {
  baseHeader,
  viewBase,
  wrappingContainerBase
} from "src/theme/elements";
import { colors } from "src/theme/colors";

type VerificationHelpProps = {
  navigation?: any;
};

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
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    alignSelf: "center",
    width: 200,
    height: 200
  },
  imageView: {
    justifyContent: "center",
    textAlignVertical: "center",
    flex: 1
  }
});

const VerificationHelpView = (props: VerificationHelpProps) => {
  return (
    <View style={{ ...viewBase }}>
      <Header
        leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
      />

      <View style={wrappingContainerBase}>
        <View style={baseHeader}>
          <Text style={styles.headerText}>Need help?</Text>
        </View>
        <View>
          <Text style={styles.bodyText}>
            If you need help, have questions, complaints, remarks, or just like
            to chat, please send an email to berkshares@humanitycash.com{" "}
          </Text>
        </View>
      </View>
    </View>
  );
};

const VerificationHelp = (props: VerificationHelpProps) => {
  const navigation = useNavigation();
  return <VerificationHelpView {...props} navigation={navigation} />;
};
export default VerificationHelp;
