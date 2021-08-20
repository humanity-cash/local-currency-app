import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn } from "src/shared/uielements";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";

type MerchantRedemptionInProgressProps = {
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
	bodyText: {
		color: colors.bodyText
	},
	bottomView: {
		padding: 20,
		paddingBottom: 45
	},
});

const MerchantRedemptionInProgressView = (props: MerchantRedemptionInProgressProps) => {

	return (
		<View style={modalViewBase}>
			<Header
				rightComponent={<CancelBtn text={"Close"} color={colors.purple} onClick={() => props.navigation.navigate("MerchantDashboard")} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>Your redemption is in progress!</Text>
				</View>
				<View>
					<Text style={styles.bodyText}>You’ll get an email once your funds are available in your bank account. Don’t worry, it won’t take too long.</Text>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="purple"
						title="Go back to home"
						onPress={() => props.navigation.navigate("MerchantDashboard")}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}


const MerchantRedemptionInProgress = (props:MerchantRedemptionInProgressProps) => {
	const navigation = useNavigation();
	return <MerchantRedemptionInProgressView {...props} navigation={navigation} />;
}
export default MerchantRedemptionInProgress