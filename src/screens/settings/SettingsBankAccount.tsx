import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Image } from 'react-native-elements';
import { AuthContext } from "src/auth";
import { Header, Dialog, BackBtn, Button } from "src/shared/uielements";
import { underlineHeader, viewBase, dialogViewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

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
		fontWeight: 'bold',
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
	const { completedCustomerVerification } = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [hasBankAccount, setHasBankAccount] = useState<boolean>(false);

	useEffect(() => {
		completedCustomerVerification ? setHasBankAccount(true) : setHasBankAccount(false);
	}, [completedCustomerVerification]);

	const handleRemove = () => {
		setHasBankAccount(false);
		setIsVisible(false);
	}

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
					hasBankAccount && (
						<View style={styles.section}>
							<Image
								source={require('../../../assets/images/bank1.png')}
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
			<View style={styles.bottomView}>
				{
					hasBankAccount && (
						<Button
							type="transparent"
							title={Translation.BUTTON.DELETE_ACCOUNT}
							textStyle={styles.deleteBtn}
							onPress={()=>setIsVisible(true)}
						/>
					)
				}
				{
					!hasBankAccount && (
						<Button
							type="darkGreen"
							title={Translation.BUTTON.LINK_BUSINESS_BANK}
							onPress={()=>navigation.navigate(Routes.SELECT_BANK)}
						/>
					)
				}
			</View>
			{isVisible && (
				<Dialog visible={isVisible} onClose={()=>setIsVisible(false)}>
					<View style={dialogViewBase}>
						<View style={styles.dialogWrap}>
							<Text style={styles.dialogHeader}>{Translation.COMMUNITY_CHEST.REMOVE_BANK_ACCOUNT}</Text>
						</View>
						<View style={styles.dialogBottom}>
							<Button
								type="darkGreen"
								title={Translation.BUTTON.REMOVE}
								onPress={handleRemove}
							/>
						</View>
					</View>
				</Dialog>
			)}
		</View>
	);
}

export default SettingsBankAccount;