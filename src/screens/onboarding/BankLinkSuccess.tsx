import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, viewBaseWhite, wrappingContainerBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
        lineHeight: 32
	},
	bodyText: {
        color: colors.bodyText
    },
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 45
	},
});

const BankLinkSuccess = (): JSX.Element => {
	const navigation = useNavigation();
	return (
		<View style={viewBaseWhite}>
			<Header />
			<ScrollView style={wrappingContainerBase}>
				<View style={ baseHeader }>
					<Text style={styles.headerText}>{Translation.BANK_ACCOUNT.CONGRATULATION}!</Text>
				</View>
				<Text style={styles.bodyText}>{Translation.BANK_ACCOUNT.CONGRATULATION_DETAIL}</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.TRANSPARENT}
						title={Translation.BUTTON.SKIP_NOW}
						onPress={() => navigation.navigate(Routes.DASHBOARD)}
					/>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={Translation.BUTTON.LOAD_UP_BERKSHARES}
						onPress={() => navigation.navigate(Routes.LOAD_UP)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default BankLinkSuccess