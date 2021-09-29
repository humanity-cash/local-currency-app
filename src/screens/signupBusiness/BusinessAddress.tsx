import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from 'src/auth';
import { BaseResponse } from "src/auth/cognito/types";
import * as Routes from "src/navigation/constants";
import {
	BackBtn,
	BusinessAddressForm, Button,
	CancelBtn, Header
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
	underlineHeaderB,
	viewBaseB,
	wrappingContainerBase
} from "src/theme/elements";
import Translation from "src/translation/en.json";

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		lineHeight: 32,
		color: colors.purple,
	},
	bodyView: {
		paddingTop: 50,
		paddingHorizontal: 17,
	},
	bodyText: {
		color: colors.bodyText,
		marginBottom: 20
	},
	label: {
		marginTop: 30,
		color: colors.bodyText,
		fontSize: 10,
	},
	input: {
		color: colors.purple,
		backgroundColor: colors.white,
	},
	formView: {
		paddingBottom: 120,
	},
	bottomButton: {
		width: "90%",
		position: "absolute",
		bottom: 45,
		left: "5%",
	},
});

const BusinessAddress = (): ReactElement => {
	const { completeBusniessBasicVerification, signOut } = useContext(AuthContext);
	const navigation = useNavigation();
	const onNextPress = async () => {
		const response: BaseResponse<string | undefined> =
			await completeBusniessBasicVerification();
		if (response.success) {
			navigation.navigate(Routes.BUSINESS_WELCOME);
		}
	};

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={
					<BackBtn
						color={colors.purple}
						onClick={() => navigation.goBack()}
					/>
				}
				rightComponent={
					<CancelBtn
						color={colors.purple}
						text={Translation.BUTTON.LOGOUT}
						onClick={signOut}
					/>
				}
			/>
			<ScrollView style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>
						{Translation.PROFILE.BUSINESS_INFORMATION}
					</Text>
				</View>
				<View style={styles.formView}>
					<Text style={styles.bodyText}>
						Where can customers find you?
					</Text>
					<BusinessAddressForm style={styles.input} />
				</View>
			</ScrollView>
			<Button
				type="purple"
				title={Translation.BUTTON.NEXT}
				disabled={false}
				style={styles.bottomButton}
				onPress={onNextPress}
			/>
		</View>
	);
};

export default BusinessAddress;
