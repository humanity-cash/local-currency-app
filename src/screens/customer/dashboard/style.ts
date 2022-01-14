import { colors } from "src/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  fitImage: {
    borderRadius: 20,
    height: 100,
    width: 30,
  },
  content: { paddingBottom: 80 },
  inlineView: { flexDirection: "row" },
  headerText: {
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 40
  },
  amountView: {
    borderBottomColor: colors.darkGreen,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 2,
    marginBottom: 10
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 5
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
    marginBottom: 10
  },
  alertIcon: {
    color: colors.alert,
    fontWeight: "bold"
  },
  alertText: {
    color: colors.black,
    width: "90%"
  },
  feedView: {
    backgroundColor: colors.card,
    padding: 10,
    marginVertical: 5,
    borderRadius: 2
  },
  feedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10
  },
  bodyText: {
    paddingVertical: 10
  },
  image: {
    alignItems: "center",
    width: "100%",
    height: 300,
    marginRight: 20,
    borderRadius: 5
  },
  qrIcon: {
    width: 24,
    height: 24,
    marginRight: 20
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
    backgroundColor: colors.darkGreen,
    alignSelf: "center",
    borderRadius: 30
  },
  scanBtnText: {
    color: colors.white
  },
  topupButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.darkGreen
  },
  topupText: { 
    color: colors.white, 
    fontSize: 16
  },
  dialog: {
    height: 320
  },
  dialogWrap: {
    paddingHorizontal: 10,
    flex: 1
  },
  dialogHeader: {
    fontSize: 30,
    lineHeight: 32,
    marginTop: 20,
    marginBottom: 10
  },
  dialogBottom: {
    paddingTop: 20
  }
});
