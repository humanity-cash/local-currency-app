import { colors } from "./colors";

export const FontFamily = {
  default: "IBMPlexSans",
  bold: "IBMPlexSansBold",
};

export const viewBase: any = {
  flex: 1,
  justifyContent: "space-between",
  backgroundColor: colors.background,
};

export const viewBaseWhite: any = {
  ...viewBase,
  backgroundColor: colors.white,
};

export const viewBaseB: any = {
  flex: 1,
  justifyContent: "space-between",
  backgroundColor: colors.highlightPurple,
};

export const modalViewBase: any = {
  justifyContent: "space-between",
  backgroundColor: colors.lightBg,
};

export const dialogViewBase: any = {
  padding: 20,
  backgroundColor: colors.background,
  borderRadius: 20,
};

export const viewDashboardBase: any = {
  flex: 1,
  justifyContent: "space-between",
  backgroundColor: colors.text,
  position: "relative",
};

export const buttonBase: any = {
  justifyContent: "space-between",
  backgroundColor: colors.button,
};

export const wrappingContainerBase: any = {
  padding: 10,
  marginBottom: 20,
  flex: 1
};

export const dialogWrap: any = {
  padding: 10,
  marginBottom: 20
};

export const baseHeader: any = {
  marginTop: 0,
  paddingTop: 10,
  marginBottom: 10,
};

export const underlineHeader: any = {
  marginTop: 0,
  paddingTop: 10,
  paddingBottom: 10,
  marginBottom: 10,
  borderBottomWidth: 1,
  borderBottomColor: colors.darkGreen,
};

export const underlineHeaderB: any = {
  marginTop: 0,
  paddingTop: 10,
  paddingBottom: 10,
  marginBottom: 10,
  borderBottomWidth: 1,
  borderBottomColor: colors.purple,
};

export const modalBaseHeader: any = {
  fontFamily: FontFamily.bold,
  fontSize: 20,
  paddingBottom: 10,
};

export const dashboardHeader: any = {
  backgroundColor: colors.text,
  color: colors.white,
  height: 150,
  paddingTop: 50,
  padding: 10,
};

export const walletHeader: any = {
  backgroundColor: colors.gold,
  color: colors.white,
  height: 150,
  paddingTop: 50,
  padding: 10,
};
