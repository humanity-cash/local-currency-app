import React from "react";
import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
import { Text } from "react-native-elements";
import { Header, Button, BackBtn } from "src/shared/uielements";
import {
  baseHeader,
  viewBaseB,
  wrappingContainerBase
} from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from "src/translation/en.json";
import { useNavigation } from "@react-navigation/core";
import { BUTTON_TYPES } from "src/constants";

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 40,
    color: colors.purple
  },
  text: {
    color: colors.bodyText
  },
  contentView: {
    paddingBottom: 40
  },
  inlineView: {
    flexDirection: "row"
  },
  lastView: {
    marginTop: 20
  },
  bottomView: {
    marginHorizontal: 20,
    marginBottom: 20
  }
});

const CashierHowToWork = (): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View style={viewBaseB}>
      <Header
        leftComponent={
          <BackBtn color={colors.purple} onClick={() => navigation.goBack()} />
        }
      />
      <ScrollView style={wrappingContainerBase}>
        <View style={baseHeader}>
          <Text style={styles.headerText}>
            {Translation.CASHIER.HOW_TO_WORK}
          </Text>
          <Text style={styles.text}>
            {Translation.CASHIER.HOW_TO_WORK_DETAIL}{" "}
          </Text>
        </View>
        <View style={styles.contentView}>
          <View style={styles.inlineView}>
            <Text>1. </Text>
            <Text style={styles.text}>{Translation.CASHIER.HOW_TO_WORK_1}</Text>
          </View>
          <View style={styles.inlineView}>
            <Text>2. </Text>
            <Text style={styles.text}>{Translation.CASHIER.HOW_TO_WORK_2}</Text>
          </View>
          <View style={styles.inlineView}>
            <Text>3. </Text>
            <Text style={styles.text}>{Translation.CASHIER.HOW_TO_WORK_3}</Text>
          </View>
          <View style={styles.inlineView}>
            <Text>4. </Text>
            <Text style={styles.text}>{Translation.CASHIER.HOW_TO_WORK_4}</Text>
          </View>
          <View style={styles.inlineView}>
            <Text>5. </Text>
            <Text style={styles.text}>{Translation.CASHIER.HOW_TO_WORK_5}</Text>
          </View>

          <View style={styles.lastView}>
            <Text style={styles.text}>{Translation.CASHIER.HOW_TO_WORK_6}</Text>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView style={styles.bottomView}>
        <Button
          type={BUTTON_TYPES.PURPLE}
          title={Translation.BUTTON.GOT_IT}
          onPress={() => navigation.goBack()}
        />
      </SafeAreaView>
    </View>
  );
};

export default CashierHowToWork;
