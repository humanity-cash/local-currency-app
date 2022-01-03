
import { StyleSheet } from 'react-native';
import { colors } from "src/theme/colors";
import { FontFamily } from "src/theme/elements";

export const styles = StyleSheet.create({
	mainTextColor: {
		color: colors.purple,
	},
	inlineView: { flexDirection: 'row' },
	headerText: {
		color: colors.purple,
		fontSize: 40,
		fontWeight: '400',
		lineHeight: 40
	},
	amountView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	balanceText: {
		color: colors.purple,
		fontSize: 18,
		fontFamily: FontFamily.bold,
		paddingLeft: 5,
		paddingRight: 5
	},
	alignRight: {
		fontSize: 10,
		textAlign: 'right',
		color: colors.purple,
		paddingRight: 5
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	dialog: {
		backgroundColor: colors.overlayPurple
	},
	infoView: {
		paddingHorizontal: 5,
		paddingTop: 20
	},
	detailView: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	detailText: {
		fontSize: 10,
		marginHorizontal: 10,
		color: colors.bodyText
	},
	minusText: {
		color: colors.darkRed,
		textAlign: 'center',
		fontSize: 10
	},
	plusText: {
		color: colors.purple,
		textAlign: 'center',
		fontSize: 10
	},
	amountText: {
		fontFamily: FontFamily.bold,
		fontSize: 32,
		lineHeight: 35
	},
	dialogHeight: {
		height: 270
	}
});

