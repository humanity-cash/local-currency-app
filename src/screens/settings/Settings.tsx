import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { Button, Header, BackBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { underlineHeader, viewBase } from "src/theme/elements";

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
		fontFamily: 'IBMPlexSansSemiBold',
		color: colors.darkRed
	}
});

export const Settings = () => {
	const navigation = useNavigation();
	
	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={styles.container}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>Setting</Text>
				</View>
				<View style={styles.settingsView}>
					<Button
						type="transparent"
						title="My profile"
						style={styles.settingItem}
						onPress={()=>navigation.navigate("SettingsPersonalProfile")}
					/>
					<Button
						type="transparent"
						title="Bank account"
						style={styles.settingItem}
						onPress={()=>navigation.navigate("SettingsPersonalProfile")}
					/>
					<Button
						type="transparent"
						title="Security"
						style={styles.settingItem}
						onPress={()=>navigation.navigate("SettingsPersonalProfile")}
					/>
					<Button
						type="transparent"
						title="Legal"
						style={styles.settingItem}
						onPress={()=>navigation.navigate("SettingsTermsAndConditions")}
					/>
				</View>
			</ScrollView>
			<View style={styles.signOutView}>
				<Button
					type="transparent"
					title="Delete account"
					textStyle={styles.signOutButton}
					onPress={()=>navigation.navigate("SettingsPersonalProfile")}
				/>
			</View>
		</View>
	);
}

export default Settings;