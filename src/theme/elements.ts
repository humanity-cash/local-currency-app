import { colors } from "./colors";
import { Dimensions } from 'react-native';

const dialogWidth = Dimensions.get('screen').width * 0.9;

export const viewBase: any = {
	flex: 1,
	justifyContent: 'space-between',
	backgroundColor: colors.lightBg
}

export const viewBaseWhite: any = {
	...viewBase,
	backgroundColor: colors.white
}

export const modalViewBase: any = {
	...viewBase,
	backgroundColor: colors.background
}

export const dialogViewBase: any = {
	...viewBase,
	width: dialogWidth,
	borderTopStartRadius: 20,
	borderTopEndRadius: 20,
}

export const viewDashboardBase: any = {
	flex: 1,
	justifyContent: 'space-between',
	backgroundColor: colors.text,
	position: 'relative'
}

export const buttonBase: any = {
	justifyContent: 'space-between',
	backgroundColor: colors.button
}

export const wrappingContainerBase: any = {
	padding: 10,
	flex: 1
}

export const baseHeader: any = {
	marginTop: 0,
	paddingTop: 10,
	marginBottom: 10
}

export const underlineHeader: any = {
	marginTop: 0,
	paddingTop: 10,
	marginBottom: 10,
	borderBottomWidth: 1,
	borderBottomColor: colors.darkGreen,
}

export const modalBaseHeader: any = {
	fontFamily: 'IBMPlexSansBold',
	fontSize: 20,
	paddingBottom: 10
}

export const dashboardHeader: any = {
	backgroundColor: colors.text,
	color: colors.white,
	height: 150,
	paddingTop: 50,
	padding: 10
}

export const walletHeader: any = {
	backgroundColor: colors.gold,
	color: colors.white,
	height: 150,
	paddingTop: 50,
	padding: 10
}

