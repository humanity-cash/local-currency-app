import { colors } from "src/theme/colors";
import { StyleSheet } from 'react-native';

export const BusinessScanQrCodeStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	toggleView: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: 200,
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	dialog: {
		height: 450
	},
	dialogBg: {
		backgroundColor: colors.overlayPurple
	},
	dialogWrap: {
		position: 'relative',
		paddingHorizontal: 10,
		paddingTop: 70,
		height: "100%",
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	ownerInfo: {
		position: 'absolute',
		top: -60,
		borderRadius: 40,
		alignItems: 'center'
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 40
	},
	ownerName: {
		fontWeight: 'bold',
		fontSize: 18,
		paddingVertical: 10,
		color: colors.purple
	},
	headerText: {
		marginTop: 10,
		fontWeight: 'bold',
		fontSize: 32,
		lineHeight: 32,
		paddingTop: 20,
		color: colors.purple
	},
	view: {
		paddingVertical: 10,
		alignItems: 'center'
	},
	transparentBtn: {
		backgroundColor: colors.white,
		color: colors.purple,
		borderWidth: 1,
		marginTop: 20,
		marginBottom: 10,
		borderColor: colors.purple
	},
	detailText: {
		fontSize: 14,
		color: colors.purple,
		textAlign: 'center'
	},
	switchView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	roundBtn: {
		marginBottom: 10,
		borderWidth: 1,
		borderColor: colors.purple
	},
	description: {
		color: colors.bodyText,
		fontSize: 10,
		textAlign: 'center',
		marginTop: 10
	},
	switch: {
		borderColor: colors.purple,
	},
	switchText: {
		color: colors.purple
	},
	toggleBg: {
		backgroundColor: colors.overlayPurple
	},
	label: {
		color: colors.bodyText,
		fontSize: 12,
		paddingTop: 10
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 45
	}
});


export const CustomerScanQrCodeStyle = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	toggleView: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: 200,
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	dialog: {
		height: 450
	},
	dialogWrap: {
		position: 'relative',
		paddingHorizontal: 10,
		paddingTop: 70,
		height: "100%",
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	ownerInfo: {
		position: 'absolute',
		top: -60,
		borderRadius: 40,
		alignItems: 'center'
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 40
	},
	ownerName: {
		fontWeight: 'bold',
		fontSize: 18,
		paddingVertical: 10
	},
	headerText: {
		marginTop: 10,
		fontSize: 32,
		lineHeight: 40,
		paddingTop: 20
	},
	description: {
		color: colors.bodyText,
		fontSize: 10,
		textAlign: 'center',
		marginTop: 10
	},
	view: {
		paddingVertical: 10,
		alignItems: 'center'
	},
	transparentBtn: {
		backgroundColor:
			colors.white,
		borderWidth: 1,
		marginTop: 20,
		marginBottom: 10
	},
	detailView: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	detailText: {
		fontSize: 14,
	},
	switchView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	switch: {
		borderColor: colors.darkGreen,
	},
	switchText: {
		color: colors.darkGreen
	},
	label: {
		color: colors.text,
		fontSize: 12,
		paddingTop: 10
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20
	}
});

export const CustomerLoadUp = StyleSheet.create({
	container: {
		paddingBottom: 40
	},
	headerText: {
		paddingBottom: 10,
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	view: {
		marginTop: 10,
	},
	text: {
		color: colors.text,
		fontSize: 12
	},
	amountText: {
		marginTop: 30
	},
	defaultAmountView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingTop: 5,
	},
	defaultAmountItem: {
		width: 100,
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: colors.darkGreen,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 8,
	},
	selectedAmountItem: {
		width: 100,
		height: 40,
		backgroundColor: colors.lightGreen,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 8,
	},
	maxBView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15
	},
	totalView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 40,
		padding: 10
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20
	},
});

export const BusinessLoadUp = StyleSheet.create({
	headerText: {
		paddingBottom: 10,
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
		color: colors.purple
	},
	container: {
		paddingBottom: 40
	},
	content: {
		marginTop: 10,
	},
	bodyView: {
		marginBottom: 30
	},
	bodyText: {
		color: colors.bodyText,
		fontSize: 16
	},
	text: {
		color: colors.bodyText,
		fontSize: 12
	},
	defaultAmountView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingTop: 5,
	},
	defaultAmountItem: {
		width: 100,
		height: 40,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: colors.purple,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 8,
	},
	selectedAmountItem: {
		width: 100,
		height: 40,
		backgroundColor: colors.purple,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 8,
	},
	amountText: {
		color: colors.purple
	},
	selectedAmountText: {
		color: colors.white
	},
	maxBView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15
	},
	totalView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 40,
		padding: 10
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20
	},
});
