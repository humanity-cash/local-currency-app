import { colors } from "src/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    lineHeight: 35,
    color: colors.purple
  },
  drawerWrap: {
    flex: 1,
    backgroundColor: colors.greyedPurple,
    paddingVertical: 30
  },
  closeBtnView: {
    paddingLeft: 15,
    paddingBottom: 10,
    flexDirection: "row"
  },
  closeBtnText: {
    fontSize: 18,
    marginLeft: 10,
    color: colors.bodyText
  },
  imageView: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white
  },
  image: {
    width: "70%",
    height: "70%",
    borderRadius: 20
  },
  infoView: {
    paddingVertical: 10
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  usernameView: {
    paddingHorizontal: 10
  },
  fadeText: {
    color: colors.purple
  },
  berkAmount: {
    fontSize: 32,
    color: colors.lightBg,
    paddingHorizontal: 15,
    paddingTop: 10
  },
  bottomSection: {
    paddingBottom: 10
  },
  inlineView: {
    flexDirection: "row"
  },
  detailText: {
    fontSize: 16,
    color: colors.bodyText
  },
  dialogBg: {
    backgroundColor: colors.overlayPurple
  }
});
