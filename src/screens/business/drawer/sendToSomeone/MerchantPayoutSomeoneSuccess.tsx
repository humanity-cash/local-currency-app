import React from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Text } from 'react-native-elements';
import { Header, Button, CancelBtn } from "src/shared/uielements";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
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
		marginHorizontal: 20,
		marginBottom: 20
	},
});

const MerchantPayoutSomeoneSuccess = (): JSX.Element => {
	const navigation = useNavigation();
	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>{Translation.COMMON.SUCCEEDED} {Translation.COMMON.THANK_YOU}</Text>
				</View>
			</ScrollView>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.PURPLE}
					title={Translation.BUTTON.CLOSE}
					onPress={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)}
				/>
			</SafeAreaView>
		</View>
	);
}

export default MerchantPayoutSomeoneSuccess