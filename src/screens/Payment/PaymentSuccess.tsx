import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";

type PaymentSuccessProps = {
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
		padding: 20,
		paddingBottom: 45
	},
});

const PaymentSuccess = (props: PaymentSuccessProps) => {

	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text="Close" onClick={() => props.navigation.navigate('Dashboard')} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>Succeeded!</Text>
					<Text style={styles.headerText}>Thank you</Text>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						title="Close"
						onPress={() => props.navigation.navigate("Dashboard")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default PaymentSuccess