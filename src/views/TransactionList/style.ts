import { colors } from "src/theme/colors";
import { FontFamily } from "src/theme/elements";
import { StyleSheet } from "react-native";

export const mListstyles = StyleSheet.create({
  listView: {},
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5
  },
  selectedItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    alignSelf: "center",
    width: 60,
    height: 60,
    borderRadius: 30
  },
  detailView: {
    paddingLeft: 8
  },
  timeText: {
    fontSize: 10,
    color: colors.darkGreen
  },
  minusText: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    color: colors.darkRed
  },
  plusText: {
    fontFamily: FontFamily.bold,
    fontSize: 18,
    color: colors.darkGreen
  }
});

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 100
  },
  headerText: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 35
  },
  totalAmountView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGreen
  },
  amountText: {
    fontFamily: FontFamily.bold,
    fontWeight: "bold",
    fontSize: 18
  },
  filterView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  filterInput: {
    flex: 1,
    marginRight: 10
  },
  filterBtn: {
    width: 55,
    height: 55,
    marginTop: 8,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  selectedFilterBtn: {
    width: 55,
    height: 55,
    marginTop: 8,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center"
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
  qrIcon: {
    width: 24,
    height: 24,
    marginRight: 20
  },
  headerView: {
    marginTop: 20,
    marginBottom: 40
  },
  detailView: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  detailText: {
    fontSize: 12,
    marginHorizontal: 10,
    color: colors.bodyText
  },
  returnText: {
    color: colors.darkRed
  },
  minusText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 32,
    color: colors.darkRed,
    textAlign: "center"
  },
  plusText: {
    fontFamily: FontFamily.bold,
    fontSize: 16,
    lineHeight: 32,
    color: colors.darkGreen,
    textAlign: "center"
  },
  dialogHeight: {
    height: 300
  },
  underlineText: {
    textDecorationLine: "underline",
    flex: 1
  }
});
