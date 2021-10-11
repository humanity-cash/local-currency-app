import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { useNavigation } from '@react-navigation/core';
import { BUTTON_TYPES } from 'src/constants';
import { colors } from "src/theme/colors";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
	bodyText: {
		color: colors.bodyText
	}
});

const PaymentSuccess = (): JSX.Element => {
	const navigation = useNavigation();
	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text="Close" onClick={() => navigation.navigate(Routes.DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>{Translation.COMMON.SUCCEEDED}</Text>
					<Text style={styles.headerText}>{Translation.COMMON.THANK_YOU}</Text>
				</View>
				<Text style={styles.bodyText}>Your receipt can be found in your transaction overview.</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={Translation.BUTTON.CLOSE}
						onPress={() => navigation.navigate(Routes.DASHBOARD)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default PaymentSuccess