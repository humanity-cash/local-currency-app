import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, CancelBtn, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
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
	bodyText: {
		color: colors.bodyText
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 45
	},
});

const LoadUpSuccess = (): JSX.Element => {
	const navigation = useNavigation();
	return (
		<View style={viewBase}>
			<Header
				rightComponent={<CancelBtn text={Translation.BUTTON.CLOSE} color={colors.purple} onClick={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)} />}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>{Translation.LOAD_UP.LOAD_UP_SUCCESS}</Text>
					<Text style={styles.headerText}>B$ 50.00</Text>
				</View>
				<Text style={styles.bodyText}>{Translation.LOAD_UP.LOAD_UP_SUCCESS_AVAILABLE}</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.PURPLE}
						title={Translation.BUTTON.EXPLORE_BERKSHARES}
						onPress={() => navigation.navigate(Routes.MERCHANT_DASHBOARD)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default LoadUpSuccess