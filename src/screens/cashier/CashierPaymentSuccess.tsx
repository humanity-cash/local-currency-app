import React, { ReactElement } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type CashierPaymentSuccessProps = {
	navigation?: any,
	route?: any,
}

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

const CashierPaymentSuccess = (props: CashierPaymentSuccessProps): ReactElement => {

	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text="Close" color={colors.purple} onClick={() => props.navigation.navigate(Routes.CASHIER_DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>{Translation.CASHIER.PAYMENT_SUCCESS} 15.00</Text>
				</View>
				<Text style={styles.text}>{Translation.CASHIER.PAYMENT_SUCCESS_DETAIL}</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="purple"
						title={Translation.BUTTON.CLOSE}
						onPress={() => props.navigation.navigate(Routes.CASHIER_DASHBOARD)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default CashierPaymentSuccess