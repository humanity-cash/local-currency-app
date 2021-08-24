import React, { ReactElement } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { Header, Button } from "src/shared/uielements";
import { viewBaseB, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';

type BusinessWelcomeProps = {
	navigation?: any,
	route?: any,
}

const styles = StyleSheet.create({
    headerText: {
		fontSize: 32,
        lineHeight: 40,
		color: colors.purple,
	},
    bottomView: {
		paddingHorizontal: 20,
        paddingBottom: 50
	},
	skipBtn: {
		marginBottom: 10,
		color: colors.purple
	}
});

const BusinessWelcome = (props: BusinessWelcomeProps): ReactElement => {
	
	return (
		<View style={viewBaseB}>
			<Header />
			<ScrollView style={wrappingContainerBase}>
                <Text style={styles.headerText}>{Translation.PROFILE.WELCOME_BERKSHARES}</Text>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="transparent"
						title={Translation.BUTTON.SKIP_NOW}
						style={styles.skipBtn}
						textStyle={styles.skipBtn}
						onPress={()=>props.navigation.navigate(Routes.MERCHANT_TABS)}
					/>
					<Button
						type="purple"
						title={Translation.BUTTON.LINK_BUSINESS_BANK}
						onPress={()=>props.navigation.navigate(Routes.MERCHANT_BANK_ACCOUNT)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default BusinessWelcome