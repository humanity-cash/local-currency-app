import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Button from "src/shared/uielements/Button";
import { BackBtn, CancelBtn } from "src/shared/uielements/header";
import Header from "src/shared/uielements/header/Header";
import { underlineHeaderB, viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from "src/constants";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		color: colors.purple,
		lineHeight: 35
	},
	bodyText: {
		color: colors.bodyText
	},
	accountType: {
		textAlign: "center",
		flex: 1,
		width: '100%',
		padding: 20
	},
	text: {
		color: colors.purple
	},
	button: {
		borderColor: colors.purple,
		borderWidth: 1,
		marginTop: 20
	}
});

const MerchantPayoutSelection = (): JSX.Element => {
	const navigation = useNavigation();
	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
				rightComponent={<CancelBtn text="Close" color={colors.purple} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>{Translation.PAYMENT.PAYOUT_SOMEONE}</Text>
				</View>
				<Text style={styles.bodyText}>{Translation.PAYMENT.PAYOUT_SOMEONE_DETAIL}</Text>
				<View style={styles.accountType}>
					<Button 
						type={BUTTON_TYPES.TRANSPARENT}
						onPress={() => navigation.navigate(Routes.MERCHANT_PAYOUT_PERSONAL)} 
						title={Translation.BUTTON.MY_PERSONAL_ACCOUNT}
						textStyle={styles.text}
						style={styles.button} />
					<Button 
						type={BUTTON_TYPES.TRANSPARENT}
						onPress={() => navigation.navigate(Routes.MERCHANT_PAYOUT_SOMEONE)}
						title={Translation.BUTTON.SOMEONE_ELSE}
						textStyle={styles.text}
						style={styles.button}/>
				</View>
			</ScrollView>
		</View>
	);
};

export default MerchantPayoutSelection;
