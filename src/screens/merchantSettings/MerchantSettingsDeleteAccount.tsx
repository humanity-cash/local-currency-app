import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { Button } from "src/shared/uielements";
import { viewBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { BUTTON_TYPES } from 'src/constants';

const styles = StyleSheet.create({
	content: {
		flex: 1, 
		padding: 10
	},
	headerView: {
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

export const MerchantSettingsBankAccount = (): JSX.Element => {
	const { signOut } = useContext(AuthContext);
	const handleClose = () => {
		signOut();
	}

	return (
		<View style={viewBase}>
			<ScrollView style={styles.content}>
				<View style={styles.headerView}>
					<Text style={styles.headerText}>{Translation.OTHER.DELETED_ACCOUNT_MESSAGE}</Text>
				</View>
			</ScrollView>
			<View style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.PURPLE}
					title={Translation.BUTTON.CLOSE}
					onPress={handleClose}
				/>
			</View>
		</View>
	);
}

export default MerchantSettingsBankAccount;