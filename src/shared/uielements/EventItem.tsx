import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { colors } from "src/theme/colors";
import { IEvent } from "../../api/types";
import { AntDesign } from "@expo/vector-icons";

type EventItemProps = {
  event: IEvent;
  onDelete: any;
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.inputBg,
    marginVertical: 8,
    paddingHorizontal: 15,
  },
  infoView: {
    borderLeftWidth: 5,
    borderRadius: 4,
    borderLeftColor: colors.info,
    backgroundColor: colors.white,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  infoIcon: {
    color: colors.info,
    fontWeight: "bold",
  },
  warningView: {
    borderLeftWidth: 5,
    borderRadius: 4,
    borderLeftColor: colors.alert,
    backgroundColor: colors.white,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  warningIcon: {
    color: colors.alert,
    fontWeight: "bold",
  },
  errorView: {
    borderLeftWidth: 5,
    borderRadius: 4,
    borderLeftColor: colors.error,
    backgroundColor: colors.white,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  errorIcon: {
    color: colors.error,
    fontWeight: "bold",
  },
  notificationText: {
    marginLeft: 16,
    color: colors.black,
    flex: 1,
  },
});

const EventItem = (props: EventItemProps) => {
  return (
    <TouchableOpacity
      onPress={props.onDelete}
      style={
        props.event.level === "INFO"
          ? styles.infoView
          : props.event.level === "WARN"
          ? styles.warningView
          : styles.errorView
      }
    >
      <AntDesign
        name={
          props.event.level === "INFO"
            ? "checkcircleo"
            : props.event.level === "WARN"
            ? "exclamationcircleo"
            : "closecircleo"
        }
        size={18}
        style={
          props.event.level === "INFO"
            ? styles.infoIcon
            : props.event.level === "WARN"
            ? styles.warningIcon
            : styles.errorIcon
        }
      />
      <Text style={styles.notificationText}>{props.event.message} &nbsp;</Text>
      {/* <TouchableOpacity onPress={props.onDelete}>
				<AntDesign
					name='closecircleo'
					size={18}
					style={styles.errorIcon}
				/>
			</TouchableOpacity> */}
    </TouchableOpacity>
  );
};

export default EventItem;
