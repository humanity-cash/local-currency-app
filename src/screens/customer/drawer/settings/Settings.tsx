import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView } from 'react-native';
import { Text } from "react-native-elements";
import { Button, Header, BackBtn, } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { underlineHeader, viewBase, FontFamily } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { API_URL, IAV_LINK } from 'src/config/env';
import app from '../../../../../app.json'

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
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
		marginTop: 20
	},
	signOutView: {
		width: '100%',
		position: 'absolute',
		bottom: 0,
		left: 0,
		marginBottom: 40
	},
	signOutButton: {
		fontFamily: FontFamily.bold,
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
	},
	linkText: {
		fontSize: 14
	}
});

export const Settings = (): ReactElement => {
	const navigation = useNavigation();

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn text="Home" onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={styles.container}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>{Translation.OTHER.SETTING}</Text>
				</View>
				<View style={styles.settingsView}>
					<Button
						type="transparent"
						title={Translation.BUTTON.MY_PROFILE}
						style={styles.settingItem}
						onPress={()=>navigation.navigate(Routes.SETTING_PERSONAL_PROFILE)}
					/>
					<Button
						type="transparent"
						title={Translation.BUTTON.BANK_ACCOUNT}
						style={styles.settingItem}
						onPress={()=>navigation.navigate(Routes.SETTING_BANK_ACCOUNT)}
					/>
					<Button
						type="transparent"
						title={Translation.BUTTON.SECURITY}
						style={styles.settingItem}
						onPress={()=>navigation.navigate(Routes.SETTING_SECURITY)}
					/>
					<Button
						type="transparent"
						title={Translation.BUTTON.LEGAL}
						style={styles.settingItem}
						onPress={()=>navigation.navigate(Routes.SETTING_TERMS_CONDITIONS)}
					/>
				</View>
			</ScrollView>
			<SafeAreaView style={{marginHorizontal: 24}}>
				<Text style={styles.linkText}>API: {API_URL}</Text>
				<Text style={styles.linkText}>IAV: {IAV_LINK}</Text>
				<Text style={styles.linkText}>Version Number: {app.expo.version}</Text>
			</SafeAreaView>
		</View>
	);
}

export default Settings;