import React, { useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { useNavigation } from '@react-navigation/core';

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
		paddingBottom: 45
	},
});

const CashierPaymentPending = (): JSX.Element => {
	const navigation = useNavigation();
	useEffect(() => {
		setTimeout(() => {
			navigation.navigate(Routes.CASHIER_RETURN_SUCCESS);
		}, 2000);
	});

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={viewBase}>
			<Header />
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>{Translation.PAYMENT.PENDING}</Text>
					<Text style={styles.text}>{Translation.PAYMENT.PENDING_DETAIL}</Text>
				</View>
			</ScrollView>
			<View style={styles.bottomView}>
				<ActivityIndicator size="large" color={colors.purple} />
			</View>
		</KeyboardAvoidingView>
	);
}

export default CashierPaymentPending