import { colors } from "src/theme/colors";
import { FontFamily } from "src/theme/elements";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  mainTextColor: {
    color: colors.purple,
  },
  content: { paddingBottom: 100 },
  inlineView: { flexDirection: "row" },
  headerText: {
    color: colors.purple,
    fontSize: 40,
    lineHeight: 45,
  },
  amountView: {
    borderBottomColor: colors.purple,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 2,
    marginBottom: 10,
  },
  amountTxt: {
    color: colors.purple,
    fontSize: 18,
    fontFamily: FontFamily.bold,
    paddingLeft: 5,
    paddingRight: 5,
  },
  alertView: {
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
  alertIcon: {
    color: colors.alert,
    fontWeight: "bold",
  },
  alertText: {
    color: colors.black,
    width: "90%",
  },
  bodyText: {
    paddingVertical: 10,
  },
  filterView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterInput: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    backgroundColor: colors.white,
    color: colors.purple,
  },
  dialog: {
    backgroundColor: colors.overlayPurple,
  },
  dialogWrap: {
    paddingHorizontal: 10,
  },
  dialogHeader: {
    fontSize: 30,
    lineHeight: 32,
    marginTop: 20,
    marginBottom: 10,
    color: colors.purple,
  },
  dialogBottom: {
    paddingTop: 20,
  },
  filterBtn: {
    width: 55,
    height: 55,
    marginTop: 8,
    borderRadius: 3,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedFilterBtn: {
    width: 55,
    height: 55,
    marginTop: 8,
    borderRadius: 3,
    backgroundColor: colors.purple,
    alignItems: "center",
    justifyContent: "center",
  },
  qrIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  scanButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 55,
    position: "absolute",
    bottom: 45,
    color: colors.white,
    backgroundColor: colors.purple,
    alignSelf: "center",
    borderRadius: 30,
  },
  scanBtnText: {
    color: colors.white,
  },
  infoView: {
    paddingHorizontal: 5,
    paddingTop: 30,
  },
  detailView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailText: {
    fontSize: 10,
    marginHorizontal: 10,
    color: colors.bodyText,
  },
  minusText: {
    color: colors.darkRed,
    textAlign: "center",
    fontSize: 10,
  },
  plusText: {
    color: colors.purple,
    textAlign: "center",
    fontSize: 10,
  },
  amountText: {
    fontFamily: FontFamily.bold,
    fontSize: 32,
    lineHeight: 35,
  },
  dialogHeight: {
    height: 270,
  },
});
