import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, BackBtn } from "src/shared/uielements";
import { underlineHeaderB, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { useNavigation } from '@react-navigation/core';
import { BUTTON_TYPES } from 'src/constants';
import StaticQRCodeGen from './MerchantStaticQRCodeGen';
import { showToast } from 'src/utils/common';
import { ToastType } from 'src/utils/types';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
		color: colors.purple
	},
	text: {
		color: colors.bodyText,
		paddingVertical: 5
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
	mainText: {
		color: colors.purple
	}
});

const MerchantSettingsStaticQr = (): JSX.Element => {
	const navigation = useNavigation();
	const [isStaticQRCode, setIsStaticQRCode] = useState<boolean>(false);

	const onSuccess = (amount: number) => {
		showToast(ToastType.INFO, "Succeeded!", "You have received B$ " + amount);
		setIsStaticQRCode(false);
	}

	const onClose = () => {
		setIsStaticQRCode(false);
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} color={colors.purple} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ underlineHeaderB }>
					<Text style={styles.headerText}>{Translation.OTHER.STATIC_QR}</Text>
				</View>
				<Text style={styles.text}>{Translation.OTHER.STATIC_QR_DETAIL1}</Text>
				<Text style={styles.text}>{Translation.OTHER.STATIC_QR_DETAIL2}</Text>
				<Text style={styles.text}>{Translation.OTHER.STATIC_QR_DETAIL3}</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.TRANSPARENT}
						textStyle={styles.mainText}
						title={Translation.BUTTON.SHOW_MY_QR}
						onPress={() => setIsStaticQRCode(true)}
					/>
					<Button
						type={BUTTON_TYPES.PURPLE}
						title={Translation.BUTTON.MAIL_QR_CODE}
						onPress={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)}
					/>
				</View>
			</KeyboardAvoidingView>

			{isStaticQRCode && (
				<StaticQRCodeGen visible={isStaticQRCode} onSuccess={onSuccess} onClose={onClose} />
			)}
		</View>
	);
}

export default MerchantSettingsStaticQr