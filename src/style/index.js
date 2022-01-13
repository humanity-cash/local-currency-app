import { colors } from "src/theme/colors";
import { StyleSheet } from 'react-native';
import { FontFamily } from "src/theme/elements";

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
		fontFamily: FontFamily.bold,
		fontSize: 18,
		paddingVertical: 10,
		lineHeight: 24,
		color: colors.purple
	},
	headerText: {
		marginTop: 10,
		fontFamily: FontFamily.bold,
		fontSize: 32,
		lineHeight: 32,
		paddingTop: 20,
		color: colors.purple
	},
	view: {
		paddingVertical: 10,
		alignItems: 'center',
		marginBottom: 20
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
	},
	amount: {
        alignSelf: 'center',
        marginTop: 10,
		fontFamily: FontFamily.bold,
        fontSize: 32,
        lineHeight: 32,
		paddingTop: 20,
		color: colors.purple
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
	dialogBg: {
		backgroundColor: colors.pDialogBg,
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
		fontFamily: FontFamily.bold,
		fontSize: 18,
		paddingVertical: 10,
		lineHeight: 24,
		color: colors.darkGreen
	},
	headerText: {
		marginTop: 10,
		fontSize: 32,
		lineHeight: 40,
		paddingTop: 20,
	},
	description: {
		color: colors.bodyText,
		fontSize: 10,
		textAlign: 'center',
		marginTop: 10
	},
	view: {
		paddingVertical: 10,
		alignItems: 'center',
		marginBottom: 20
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
	},
	amount: {
        alignSelf: 'center',
        marginTop: 10,
		fontFamily: FontFamily.bold,
        fontSize: 32,
        lineHeight: 32,
		paddingTop: 20,
		color: colors.darkGreen
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


export const CustomerCashOut = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	formLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20
	},
	labelText: {
		marginTop: 5,
		color: colors.text,
		fontSize: 12
	},
	resultView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	resultText: {
		fontSize: 16,
		lineHeight: 20,
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20
	},
	dialogWrap: {
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
	},
	dialogHeader: {
		fontSize: 30,
		lineHeight: 32,
		marginTop: 20,
		marginBottom: 10,
	},
	errorBalance: {
		color: colors.mistakeRed,
		fontSize: 10,
		lineHeight: 10
	},
	dialogBottom: {
		paddingTop: 20,
	}
});

export const BusinessCashOut = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
		color: colors.purple
	},
	formLabel: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20
	},
	bodyText: {
		marginTop: 5,
		color: colors.bodyText,
		fontSize: 16
	},
	errorBalance: {
		color: colors.mistakeRed,
		fontSize: 10,
		lineHeight: 10
	},
	labelText: {
		marginTop: 5,
		color: colors.bodyText,
		fontSize: 12
	},
	input: {
		backgroundColor: colors.white,
		color: colors.purple
	},
	text: {
		color: colors.purple
	},
	resultView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	resultText: {
		fontSize: 16,
		lineHeight: 20,
		color: colors.purple
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20
	},
	dialogBg: {
		backgroundColor: colors.overlayPurple
	},
	dialogWrap: {
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
	},
	dialogHeader: {
		fontSize: 30,
		lineHeight: 32,
		marginTop: 20,
		marginBottom: 10,
		color: colors.purple
	},
	dialogBottom: {
		paddingTop: 20,
	}
});

export const BusinessTxFiltersStyle =  StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20
    },
    mainText: {
        color: colors.purple
    },
    placeholder: {
        color: colors.greyedPurple
    },
    inlineView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        alignItems: 'center'
    },
    dateView: {
        flex: 1,
    },
    date: {
        height: 55,
        marginVertical: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        backgroundColor: colors.white
    },
    separator: {
        width: 15,
        height: 1,
        marginHorizontal: 10,
        marginTop: 15,
        backgroundColor: colors.purple
    },
    label: {
        fontSize: 10,
        lineHeight: 14,
        color: colors.bodyText
    },
    typeView: {
        marginTop: 7
    },
    pickerText: {
        color: colors.purple,
        textAlign: 'center'
    },
    selectItem: {
        width: '100%',
        height: 55,
        backgroundColor: colors.white,
    },
    dropdownContainer: { marginTop: -20 },
    clearFilter: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.purple
    },
    clearText: {
        textAlign: "center",
        color: colors.purple
    }
});

export const CustomerTxFiltersStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20
    },
    inlineView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
        alignItems: 'center'
    },
    dateView: {
        flex: 1,
    },
    date: {
        height: 55,
        marginVertical: 7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        backgroundColor: colors.inputBg
    },
    separator: {
        width: 15,
        height: 1,
        marginHorizontal: 10,
        marginTop: 15,
        backgroundColor: colors.darkGreen
    },
    label: {
		fontSize: 10,
		lineHeight: 14,
		color: colors.bodyText
	},
    typeView: {
        flex: 1,
        height: 55,
        justifyContent: 'center',
        marginTop: 7,
        backgroundColor: colors.inputBg
    },
    pickerText: {
        color: colors.darkGreen,
        textAlign: 'center'
    },
    selectItem: {
        width: '100%',
        height: 55,
        backgroundColor: colors.inputBg,
    },
    dropdownContainer: {marginTop: -20},
    placeholder: {
        color: colors.lightGreen
    },
    clearFilter: {
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: colors.darkGreen
	},
    clearText: {
        textAlign: "center"
    }
});


export const BusinessTransactionItem = StyleSheet.create({
	transactionType: {
		color: colors.purple,
		fontFamily: FontFamily.bold,
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 80,
		paddingHorizontal: 20,
		marginVertical: 5,
		backgroundColor: colors.white
	},
	selectedItem: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 80,
		paddingHorizontal: 20,
		marginVertical: 2,
		borderRadius: 3,
		backgroundColor: colors.lightPurple
	},
	timeText: {
		fontSize: 10,
		color: colors.purple
	},
	amountText: {
		fontFamily: FontFamily.bold,
		fontSize: 18,
		color: colors.darkRed
	},
	plusText: {
		fontFamily: FontFamily.bold,
		fontSize: 18,
		color: colors.purple
	},
});