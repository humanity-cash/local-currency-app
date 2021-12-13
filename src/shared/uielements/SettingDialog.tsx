import React from 'react';
import { Text, View, StyleSheet, Platform, Linking } from "react-native";
import { Button, Dialog } from 'src/shared/uielements';
import { dialogViewBase } from "src/theme/elements";
import Translation from "src/translation/en.json";
import { BUTTON_TYPES } from "src/constants";
import { colors } from '../../theme/colors';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher'

const styles = StyleSheet.create({
	dialog: {
		height: 320
	},
	dialogWrap: {
		paddingHorizontal: 10,
		flex: 1
	},
	dialogHeader: {
		fontSize: 28,
		lineHeight: 32,
		marginTop: 20,
		marginBottom: 10,
		color: colors.darkGreen
	},
	dialogDetail: {
		paddingTop: 12,
		color: colors.darkGreen
	},
	dialogBottom: {
		paddingTop: 20,
	}
})

type SettingDialogProps = {
	visible: boolean,
	description: string,
	onCancel: ()=>void
}

const SettingDialog = ({
	visible = false,
	description = Translation.PAYMENT.PAYMENT_NO_BALANCE_DETAIL,
	onCancel
}: SettingDialogProps) => {
	const onConfirm = () => {
		if(Platform.OS=='ios') {
			Linking.openURL('app-settings:')
		} else{
			startActivityAsync(
				// Constants.manifest?.releaseChannel ? ActivityAction.APPLICATION_DETAILS_SETTINGS : ActivityAction.APPLICATION_SETTINGS
				ActivityAction.APPLICATION_SETTINGS
			);
		}
		onCancel()
	}

	return (
		<Dialog visible={visible} onClose={()=>onCancel()} style={styles.dialog}>
			<View style={dialogViewBase}>
				<View style={styles.dialogWrap}>
					<Text style={styles.dialogHeader}>{Translation.OTHER.NO_CAMERA_PERMISSION_TITLE}</Text>
					<Text style={styles.dialogDetail}>{description}</Text>
				</View>
				<View style={styles.dialogBottom}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={Translation.BUTTON.GOTO_SETTING}
						onPress={onConfirm}
					/>
				</View>
			</View>
		</Dialog>
	)
}

export default SettingDialog;