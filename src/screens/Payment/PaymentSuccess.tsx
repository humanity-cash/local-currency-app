import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Image, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button } from "src/shared/uielements";
import { baseHeader, viewBase } from "src/theme/elements";
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
	imageView: {
		flex: 1, 
		margin: 15, 
		justifyContent: 'center', 
		alignItems: 'center'
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
	const successImg = require("../../../assets/images/burkshare_paper_money.png")

	return (
		<View style={viewBase}>
			<Header/>
			<View style={{paddingHorizontal: 10, flex: 1}}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>{Translation.COMMON.SUCCEEDED}</Text>
					<Text style={styles.headerText}>{Translation.COMMON.THANK_YOU}</Text>
				</View>
				<View style={styles.imageView}>
					<Image
						source={successImg}
						style={{justifyContent: 'center', width: '100%'}}
						resizeMode='contain'
					/>			
				</View>
			</View>
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