import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Image } from 'react-native-elements';
import { Header, Dialog, BackBtn, Button } from "src/shared/uielements";
import { underlineHeader, viewBase, dialogViewBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

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

export const SettingsBankAccount = () => {
	const navigation = useNavigation();

	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [hasBankAccount, setHasBankAccount] = useState<boolean>(true);

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
					<Text style={styles.headerText}>Bank account</Text>
				</View>
				{
					hasBankAccount && (
						<View style={styles.section}>
							<Image
								source={require('../../../assets/images/salisbury_bank.png')}
								containerStyle={styles.image}
							/>
							<View style={styles.inlineView}>
								<Text style={styles.label}>ACCOUNT NAME</Text>
								<Text style={styles.text}>ACCOUNTNAMEOFTHISBANK</Text>
							</View>
							<View style={styles.inlineView}>
								<Text style={styles.label}>ACCOUNT TYPE</Text>
								<Text style={styles.text}>CHECKINGS</Text>
							</View>
							<View style={styles.inlineView}>
								<Text style={styles.label}>ACCOUNT NUMBER</Text>
								<Text style={styles.text}>US-08-CHAS-0686-5892</Text>
							</View>
						</View>
					)
				}
				{
					!hasBankAccount && (
						<View style={styles.noAccount}>
							<Text style={styles.noAccountText}>You do not have a bank account linked. Link your bank account in order to enable buying new BerkShares and/or cash out to USD.</Text>
						</View>
					)
				}
			</ScrollView>
			<View style={styles.bottomView}>
				{
					hasBankAccount && (
						<Button
							type="transparent"
							title="Delete account"
							textStyle={styles.deleteBtn}
							onPress={()=>setIsVisible(true)}
						/>
					)
				}
				{
					!hasBankAccount && (
						<Button
							type="darkGreen"
							title="Link my business bank account"
							onPress={()=>navigation.navigate("")}
						/>
					)
				}
			</View>
			{isVisible && (
				<Dialog visible={isVisible} onClose={()=>setIsVisible(false)}>
					<View style={dialogViewBase}>
						<View style={styles.dialogWrap}>
							<Text style={styles.dialogHeader}>Are you sure you want to remove this bank account?</Text>
						</View>
						<View style={styles.dialogBottom}>
							<Button
								type="darkGreen"
								title="Remove"
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