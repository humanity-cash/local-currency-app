import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView } from "react-native";
import { Text } from 'react-native-elements';
import { WalletContext } from "src/contexts";
import { Header, BackBtn, Button } from "src/shared/uielements";
import { underlineHeader, viewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import { FontFamily } from "src/theme/elements";
import { BUTTON_TYPES } from "src/constants";
import { DwollaDialog } from "src/views";
import { IBank } from '../../../../api/types';

const styles = StyleSheet.create({
	content: {
		flex: 1, 
		padding: 10
	},
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	section: {
		paddingHorizontal: 20,
		paddingVertical: 30,
		backgroundColor: colors.card
	},
	noAccount: {
		paddingHorizontal: 20,
		paddingTop: 40
	},
	noAccountText: {
		textAlign: 'center',
		fontSize: 16
	},
	image: {
		width: 115,
		height: 70,
		alignSelf: 'center',
		marginBottom: 40
	},
	bottomView: {
		marginHorizontal: 20,
    	marginBottom: 20,
	},
	inlineView: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	bankNameLabel: {
		color: colors.bodyText,
		fontFamily: FontFamily.bold,
		fontSize: 18,
		alignSelf: 'center',
		paddingBottom: 24
	},
	label: {
		color: colors.bodyText,
		fontSize: 10
	},
	text: {
		color: colors.bodyText,
		fontFamily: FontFamily.bold,
		fontSize: 10
	},
	deleteBtn: {
		color: colors.darkRed
	},
	dialogWrap: {
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
	},
	dialogHeader: {
		fontSize: 30,
		lineHeight: 35,
		marginTop: 20,
		marginBottom: 10,
	},
	dialogBottom: {
		marginTop: 20,
	}
});

export const SettingsBankAccount = (): JSX.Element => {
	const navigation = useNavigation();
	const { customerWalletData } = useContext(WalletContext);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [bank, setBank] = useState<IBank | undefined>(undefined)
	const [needVerify, setNeedVerify] = useState<boolean>(false)

	useEffect(() => {
		setBank(customerWalletData.availableFundingSource?.bank)
		setNeedVerify(!!customerWalletData.availableFundingSource?.needMicroDeposit)
	}, [customerWalletData.availableFundingSource?.bank])

	const selectBank = async () => {
		setIsVisible(true);
	};
	
	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={styles.content}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>{Translation.BANK_ACCOUNT.BANK_ACCOUNT}</Text>
				</View>
				{
					bank && !needVerify && (
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
					(!bank || needVerify) && (
						<View style={styles.noAccount}>
							<Text style={styles.noAccountText}>{Translation.COMMUNITY_CHEST.NO_BANK_ACCOUNT}</Text>
						</View>
					)
				}
			</ScrollView>
			{
				(!bank || needVerify) && (
					<SafeAreaView style={styles.bottomView}>
						<Button
							type={BUTTON_TYPES.DARK_GREEN}
							title={Translation.BUTTON.LINK_PERSONAL_BANK}
							onPress={selectBank}
						/>
					</SafeAreaView>
				)
			}
			{isVisible && (
				<DwollaDialog
					title={Translation.BANK_ACCOUNT.USE_DWOLLA_PERSONAL}
					visible={isVisible}
					onClose={() => setIsVisible(false)}
				/>
			)}
		</View>
	);
}

export default SettingsBankAccount;