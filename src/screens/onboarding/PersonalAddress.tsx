import { useNavigation } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View
} from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/auth";
import { BUTTON_TYPES } from "src/constants";
import * as Routes from "src/navigation/constants";
import {
	BackBtn,
	Button,
	CancelBtn,
	Header,
	PersonalAddressForm
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
	underlineHeader,
	viewBase,
	wrappingContainerBase
} from "src/theme/elements";
import Translation from "src/translation/en.json";

const styles = StyleSheet.create({
	content: {
		paddingBottom: 40,
	},
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35,
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
});

const PersonalAddress = (): React.ReactElement => {
	const { completeCustomerBasicVerification } = useContext(AuthContext);
	const navigation = useNavigation();

	const onNextPress = async () => {
		const response = await completeCustomerBasicVerification();
    console.log("🚀 ~ file: PersonalAddress.tsx ~ line 50 ~ onNextPress ~ response", response)
		if (response.success) {
			navigation.navigate(Routes.LINK_BANK_ACCOUNT);
		} else {
			console.log("something went wrong in finalising customer signip");
		}
	};

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
				rightComponent={
					<CancelBtn
						text={Translation.BUTTON.LOGOUT}
						onClick={() => navigation.navigate(Routes.TEASER)}
					/>
				}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={styles.content}>
					<View style={underlineHeader}>
						<Text style={styles.headerText}>
							{Translation.PROFILE.PERSIONAL_DETAILS}
						</Text>
					</View>
					<PersonalAddressForm />
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={Translation.BUTTON.NEXT}
						disabled={false}
						onPress={onNextPress}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default PersonalAddress;
