import React, { useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ActivityIndicator, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

type MerchantPaymentPendingProps = {
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
		paddingBottom: 45
	},
});

const MerchantPaymentPending = (props: MerchantPaymentPendingProps) => {

	useEffect(() => {
		setTimeout(() => {
			props.navigation.navigate("MerchantPaymentSuccess");
		}, 2000);
	});

	return (
		<View style={viewBase}>
			<Header />
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>Pending...</Text>
					<Text style={styles.text}>This usually takes 5-6 seconds</Text>
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

export default MerchantPaymentPending