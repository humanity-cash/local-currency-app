import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useState } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Image } from 'react-native-elements';
import { Header, BackBtn } from "src/shared/uielements";
import { underlineHeaderB, viewBaseB } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import { FontFamily } from "src/theme/elements";

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
	const [hasBankAccount, setHasBankAccount] = useState<boolean>(true);

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
					hasBankAccount && (
						<View style={styles.section}>
							<Image
								source={require('../../../../../assets/images/bank1.png')}
								containerStyle={styles.image}
							/>
							<View style={styles.inlineView}>
								<Text style={styles.label}>{Translation.LABEL.ACCOUNT_NAME}</Text>
								<Text style={styles.text}>ACCOUNTNAMEOFTHISBANK</Text>
							</View>
							<View style={styles.inlineView}>
								<Text style={styles.label}>{Translation.LABEL.ACCOUNT_TYPE}</Text>
								<Text style={styles.text}>CHECKINGS</Text>
							</View>
							<View style={styles.inlineView}>
								<Text style={styles.label}>{Translation.LABEL.ACCOUNT_NUMBER}</Text>
								<Text style={styles.text}>US-08-CHAS-0686-5892</Text>
							</View>
						</View>
					)
				}
				{
					!hasBankAccount && (
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