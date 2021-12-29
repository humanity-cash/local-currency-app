import { useNavigation } from "@react-navigation/native";
import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text } from "react-native-elements";
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseB, wrappingContainerBase, baseHeader, FontFamily } from "src/theme/elements";
import { CancelBtn } from "src/shared/uielements";
import Translation from 'src/translation/en.json';
import { WalletContext, UserContext } from "src/contexts";
import { TransactionList } from "src/views"

const styles = StyleSheet.create({
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

const CashierTransactions = (): JSX.Element => {
	const navigation = useNavigation();
	const { businessDwollaId } = useContext(UserContext)
	const { businessWalletData } = useContext(WalletContext)

	return (
		<View style={viewBaseB}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View>
					<View style={baseHeader}>
						<Text style={styles.headerText}>{Translation.CASHIER.TRANSACTIONS}</Text>
					</View>
					<View style={styles.amountView}>
						<View></View>
						<View>
							<Text style={styles.alignRight}>{Translation.CASHIER.BALANCE}</Text>
							<Text style={styles.balanceText}>B$ {businessWalletData?.availableBalance.toFixed(2)}</Text>
						</View>
					</View>
					<TransactionList userId={businessDwollaId} />
				</View>
			</ScrollView>
		</View>
	);
}

export default CashierTransactions