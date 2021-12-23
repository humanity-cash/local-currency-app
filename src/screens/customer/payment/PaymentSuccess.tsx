import React, { useContext } from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button } from "src/shared/uielements";
import { baseHeader, viewBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { useNavigation } from '@react-navigation/core';
import { BUTTON_TYPES } from 'src/constants';
import { colors } from "src/theme/colors";
import { UserContext } from 'src/contexts';
import { UserType } from 'src/auth/types';

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
		marginHorizontal: 20,
		marginBottom: 20
	},
	bodyText: {
		color: colors.bodyText
	}
});

const PaymentSuccess = (): JSX.Element => {
	const navigation = useNavigation();
	const { userType } = useContext(UserContext);
	const homeRoute = userType === UserType.Business ? Routes.MERCHANT_DASHBOARD : Routes.DASHBOARD;
	const buttonType = userType === UserType.Business ? BUTTON_TYPES.PURPLE : BUTTON_TYPES.DARK_GREEN;

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
						source={require('../../../../assets/images/burkshare_paper_money.png')}
						style={{justifyContent: 'center', width: '100%'}}
						resizeMode='contain'
					/>			
				</View>
			</View>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type={buttonType}
					title={Translation.BUTTON.CLOSE}
					onPress={() => navigation.navigate(homeRoute)}
				/>
			</SafeAreaView>
		</View>
	);
}

export default PaymentSuccess