import React, { useContext } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from "src/auth";
import { Header, Button, BackBtn } from "src/shared/uielements";
import { underlineHeader, viewBase, wrappingContainerBase } from "src/theme/elements";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { useNavigation } from '@react-navigation/core';

const styles = StyleSheet.create({
    headerText: {
		fontSize: 32,
        lineHeight: 32
	},
    bodyView: {
        paddingTop: 50,
        paddingHorizontal: 17
    },
    bodyText: {
        color: colors.bodyText,
        textAlign: 'center'
    },
    bottomView: {
		paddingHorizontal: 20,
        paddingBottom: 50
	},
});

const BusinessAccount = (): JSX.Element => {
	const navigation = useNavigation();
	const { completedBusinessVerification } = useContext(AuthContext);

	const signupBusiness = () => {
		if (!completedBusinessVerification) {
			navigation.navigate(Routes.SIGNUP_BUSINESS);
		}
	}

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={wrappingContainerBase}>
                <View style={underlineHeader}>
                    <Text style={styles.headerText}>{Translation.PROFILE.BUSINESS_ACCOUNT}</Text>
                </View>
                <View style={styles.bodyView}>
                    <Text style={styles.bodyText}>{Translation.PROFILE.BUSINESS_ACCOUNT_DETAIL}</Text>
                </View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"} >
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						title={Translation.BUTTON.SIGNUP_BUSINESS}
						onPress={signupBusiness}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default BusinessAccount