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
	section: {
		paddingVertical: 60,
	},
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 40
	}
});

export const SettingsBankAccount = () => {
	const navigation = useNavigation();

	const handleClose = () => {
		navigation.navigate("Teaser");
	}

	return (
		<View style={viewBase}>
			<ScrollView style={styles.content}>
				<View style={ styles.section }>
					<Text style={styles.headerText}>Sad to see you leave. Your account has been deleted. Hope to see you back soon.</Text>
				</View>
			</ScrollView>
			<View style={styles.bottomView}>
				<Button
					type="darkGreen"
					title="Close"
					onPress={handleClose}
				/>
			</View>
		</View>
	);
}

export default SettingsBankAccount;