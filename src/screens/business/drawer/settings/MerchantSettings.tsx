import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/contexts";
import { Button, Header, BackBtn, Dialog } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { underlineHeaderB, viewBaseB, dialogViewBase } from "src/theme/elements";
import * as Routes from 'src/navigation/constants';
import Translation from 'src/translation/en.json';
import { BUTTON_TYPES } from 'src/constants';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		color: colors.purple,
		lineHeight: 40
	},
	container: {
		flex: 1, 
		padding: 10
	},
	settingsView: {
		padding: 10
	},
	settingItem: {
		borderWidth: 1,
		marginTop: 20,
		borderColor: colors.purple
	},
	signOutView: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		left: 0,
		marginBottom: 40
	},
	btnText: {
		color: colors.purple
	},
	signOutButton: {
		color: colors.darkRed,
		textDecorationLine: 'underline'
	},
	dialogBg: {
		backgroundColor: colors.overlayPurple
	},
	dialogWrap: {
		paddingHorizontal: 10
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

export const MerchantSettings = (): JSX.Element => {
	const navigation = useNavigation();
	const { signOut } = useContext(AuthContext);
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const handleDelete = () => {
		setIsVisible(false);
		signOut();
	}
	
	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn text="Home" onClick={() => navigation.goBack()} color={colors.purple} />}
			/>
			<ScrollView style={styles.container}>
				<View style={ underlineHeaderB }>
					<Text style={styles.headerText}>{Translation.OTHER.SETTING}</Text>
				</View>
				<View style={styles.settingsView}>
					<Button
						type={BUTTON_TYPES.TRANSPARENT}
						title={Translation.BUTTON.MY_PROFILE}
						style={styles.settingItem}
						textStyle={styles.btnText}
						onPress={()=>navigation.navigate(Routes.MERCHANT_SETTINGS_PROFILE)}
					/>
					<Button
						type={BUTTON_TYPES.TRANSPARENT}
						title={Translation.BUTTON.BANK_ACCOUNT}
						style={styles.settingItem}
						textStyle={styles.btnText}
						onPress={()=>navigation.navigate(Routes.MERCHANT_SETTINGS_BANK_ACCOUNT)}
					/>
					<Button
						type={BUTTON_TYPES.TRANSPARENT}
						title={Translation.BUTTON.STATIC_QR}
						style={styles.settingItem}
						textStyle={styles.btnText}
						onPress={()=>navigation.navigate(Routes.MERCHANT_SETTINGS_STATIC_QR)}
					/>
					<Button
						type={BUTTON_TYPES.TRANSPARENT}
						title={Translation.BUTTON.LEGAL}
						style={styles.settingItem}
						textStyle={styles.btnText}
						onPress={()=>navigation.navigate(Routes.MERCHANT_SETTINGS_LEGAL)}
					/>
					<Button
						type={BUTTON_TYPES.TRANSPARENT}
						title={Translation.BUTTON.SECURITY}
						style={styles.settingItem}
						textStyle={styles.btnText}
						onPress={()=>navigation.navigate(Routes.MERCHANT_SETTINGS_SECURITY)}
					/>
				</View>
			</ScrollView>
			{isVisible && (
				<Dialog visible={isVisible} onClose={()=>setIsVisible(false)} backgroundStyle={styles.dialogBg}>
					<View style={dialogViewBase}>
						<View style={styles.dialogWrap}>
							<Text style={styles.dialogHeader}>{Translation.COMMUNITY_CHEST.CONFIRM_DELETE_ACCOUNT}</Text>
						</View>
						<View style={styles.dialogBottom}>
							<Button
								type={BUTTON_TYPES.PURPLE}
								title={Translation.BUTTON.DELETE_ACCOUNT}
								onPress={handleDelete}
							/>
						</View>
					</View>
				</Dialog>
			)}
		</View>
	);
}

export default MerchantSettings;