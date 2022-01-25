import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useContext } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from 'react-native-elements';
import { Header, BackBtn } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import { FontFamily } from "src/theme/elements";
import { WalletContext } from "src/contexts";

const styles = StyleSheet.create({
	content: {
		flex: 1, 
		padding: 10
	},
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		color: colors.purple,
		lineHeight: 40
	},
	section: {
		paddingHorizontal: 20,
		paddingVertical: 30,
		backgroundColor: colors.white
	},
	noAccount: {
		paddingHorizontal: 20,
		paddingTop: 40
	},
	noAccountText: {
		textAlign: 'center',
		fontSize: 16,
		color: colors.purple
	},
	image: {
		width: 115,
		height: 70,
		alignSelf: 'center',
		marginBottom: 40
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 40
	},
	inlineView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	label: {
		color: colors.bodyText,
		fontSize: 10
	},
	bankNameLabel: {
		color: colors.bodyText,
		fontFamily: FontFamily.bold,
		fontSize: 18,
		alignSelf: 'center',
		paddingBottom: 24
	},
	text: {
		color: colors.bodyText,
		fontFamily: FontFamily.bold,
		fontSize: 10
	},
	deleteBtn: {
		color: colors.darkRed
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
		lineHeight: 35,
		color: colors.purple,
		marginTop: 20,
		marginBottom: 10,
	},
	dialogBottom: {
		marginTop: 20,
	}
});

export const MerchantSettingsBankAccount = (): ReactElement => {
	const navigation = useNavigation();
	const { businessWalletData } = useContext(WalletContext);
	const bank = businessWalletData.availableFundingSource?.bank

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} color={colors.purple} />}
			/>
			<ScrollView style={styles.content}>
				<View style={ underlineHeaderB }>
					<Text style={styles.headerText}>{Translation.BANK_ACCOUNT.BANK_ACCOUNT}</Text>
				</View>
				{
					bank && (
						<View style={styles.section}>
							<Text style={styles.bankNameLabel}>{bank.bankName}</Text>
							<View style={styles.inlineView}>
								<Text style={styles.label}>{Translation.LABEL.ACCOUNT_NAME}</Text>
								<Text style={styles.text}>{bank.name}</Text>
							</View>
							<View style={styles.inlineView}>
								<Text style={styles.label}>{Translation.LABEL.ACCOUNT_TYPE}</Text>
								<Text style={styles.text}>{bank.bankAccountType.toUpperCase()}</Text>
							</View>
							<View style={styles.inlineView}>
								<Text style={styles.label}>{Translation.LABEL.ACCOUNT_CREATED_DATE}</Text>
								<Text style={styles.text}>{bank.createdAt}</Text>
							</View>
						</View>
					)
				}
				{
					!bank && (
						<View style={styles.noAccount}>
							<Text style={styles.noAccountText}>{Translation.COMMUNITY_CHEST.NO_BANK_ACCOUNT}</Text>
						</View>
					)
				}
			</ScrollView>
		</View>
	);
}

export default MerchantSettingsBankAccount;