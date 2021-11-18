import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform, Image } from 'react-native';
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

const BusinessPaymentSuccess = (): JSX.Element => {
	const navigation = useNavigation();
	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text="Close" color={colors.purple} onClick={() => navigation.navigate(Routes.BUSINESS_DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={baseHeader}>
					<Text style={styles.headerText}>{Translation.COMMON.SUCCEEDED}</Text>
					<Text style={styles.headerText}>{Translation.COMMON.THANK_YOU}</Text>
				</View>
				<View style={{flex: 1, margin: 15, justifyContent: 'center', alignItems: 'center'}}>
					<Image
						source={require("../../../assets/images/burkshare_paper_money.png")}
						style={{justifyContent: 'center', width: '100%'}}
						resizeMode='contain'
					/>			
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.PURPLE}
						title={Translation.BUTTON.CONFIRM}
						onPress={() => navigation.navigate(Routes.BUSINESS_DASHBOARD)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default BusinessPaymentSuccess