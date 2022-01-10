import { StyleSheet } from "react-native";
import { colors } from "src/theme/colors";

export const styles = StyleSheet.create({
  container: {
    marginVertical: 80
  },
  itemView: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 3,
    padding: 20,
    marginVertical: 5
  },
  receiveBtn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 18
  },
  image: {
    width: 45,
    height: 45,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    color: colors.purple
  },
  icon: {
    marginTop: 4,
    marginRight: 10
  },
  bottomBtn: {
    marginBottom: 45
  },
  dialogBg: {
    backgroundColor: colors.overlayPurple
  },
  headerText: {
    fontSize: 32,
    lineHeight: 35,
    color: colors.purple
  },
  detailText: {
    fontSize: 16,
    color: colors.bodyText
  }
});
