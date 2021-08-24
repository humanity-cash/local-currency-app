import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from 'react-native-elements';
import { Button } from "src/shared/uielements";
import { viewBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

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

export const SettingsBankAccount = (): ReactElement => {
	const navigation = useNavigation();

	const handleClose = () => {
		navigation.navigate(Routes.TEASER);
	}

	return (
		<View style={viewBase}>
			<ScrollView style={styles.content}>
				<View style={ styles.section }>
					<Text style={styles.headerText}>{Translation.OTHER.DELETED_ACCOUNT_MESSAGE}</Text>
				</View>
			</ScrollView>
			<View style={styles.bottomView}>
				<Button
					type="darkGreen"
					title={Translation.BUTTON.CLOSE}
					onPress={handleClose}
				/>
			</View>
		</View>
	);
}

export default SettingsBankAccount;