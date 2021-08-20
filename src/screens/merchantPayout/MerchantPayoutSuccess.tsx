import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type MerchantPayoutSuccessProps = {
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

const MerchantPayoutSuccess = (props: MerchantPayoutSuccessProps) => {

	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text="Close" color={colors.purple} onClick={() => props.navigation.navigate('MerchantDashboard')} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>Succeeded!</Text>
				</View>
				<Text style={styles.text}>The BerkShares are now available in your personal account.</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="purple"
						title="Close"
						onPress={() => props.navigation.navigate("MerchantDashboard")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default MerchantPayoutSuccess