import { Entypo } from "@expo/vector-icons";
import React, { ReactElement, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";
import { FontFamily } from "src/theme/elements";
import { AccordionEntry } from "src/utils/types";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.inputBg,
    padding: 20,
    marginBottom: 5
  },
  header: {
    flexDirection: "row",
    backgroundColor: colors.inputBg
  },
  headerText: {
    flex: 1,
    fontFamily: FontFamily.bold,
    fontSize: 16
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "center"
  },
  headerActive: {
    transform: [{ rotate: "180deg" }]
  },
  textContainer: {
    marginTop: 15,
    paddingHorizontal: 10
  },
  contentText: {
    fontSize: 10,
    lineHeight: 14,
    color: colors.bodyText
  }
});

const AccordionCard = (props: AccordionEntry): ReactElement => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <View
      style={{
        ...styles.container,
        ...props.style
      }}
    >
      <TouchableWithoutFeedback onPress={() => setIsExpanded(!isExpanded)}>
        <View style={styles.header}>
          <Text
            style={{
              ...styles.headerText,
              ...props.style
            }}
          >
            {props.title}
          </Text>
          <View
            style={{
              ...styles.headerIcon,
              ...props.style
            }}
          >
            <Entypo
              style={isExpanded ? styles.headerActive : {}}
              name="chevron-down"
              size={16}
              color={props.textColor ? props.textColor : colors.text}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {isExpanded && (
        <View style={styles.textContainer}>
          <Text style={styles.contentText}>{props.content}</Text>
        </View>
      )}
    </View>
  );
};

export default AccordionCard;
