import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { useNavigation } from '@react-navigation/core';
import { BUTTON_TYPES } from 'src/constants';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
		color: colors.purple
	},
	text: {
		color: colors.bodyText
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
});

const CashierReturnSuccess = (): JSX.Element => {
	const navigation = useNavigation();
	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={() => navigation.navigate(Routes.CASHIER_DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>{Translation.COMMON.SUCCEEDED}</Text>
					<Text style={styles.headerText}>{Translation.COMMON.THANK_YOU}</Text>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.PURPLE}
						title={Translation.BUTTON.NEXT}
						onPress={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default CashierReturnSuccess