import React, { ReactElement, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type PaymentPendingProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	bottomView: {
		marginBottom: 20
	},
});

const PaymentPending = (props: PaymentPendingProps): ReactElement => {

	useEffect(() => {
		setTimeout(() => {
			props.navigation.navigate(Routes.PAYMENT_SUCCESS);
		}, 2000);
	});

	return (
		<View style={viewBase}>
			<Header />
			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>{Translation.PAYMENT.PENDING}</Text>
					<Text>{Translation.PAYMENT.PENDING_DETAIL}</Text>
				</View>
			</ScrollView>
			<SafeAreaView style={styles.bottomView}>
				<ActivityIndicator size="large" color={colors.darkGreen} />
			</SafeAreaView>
		</View>
	);
}

export default PaymentPending