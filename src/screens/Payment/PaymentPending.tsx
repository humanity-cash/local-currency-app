import React, { useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

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
		paddingBottom: 45
	},
});

const PaymentPending = (props: PaymentPendingProps) => {

	useEffect(() => {
		setTimeout(() => {
			props.navigation.navigate("PaymentSuccess");
		}, 2000);
	});

	return (
		<View style={viewBase}>
			<Header />
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>Pending...</Text>
					<Text>This usually takes 5-6 seconds</Text>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<ActivityIndicator size="large" color={colors.darkGreen} />
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default PaymentPending