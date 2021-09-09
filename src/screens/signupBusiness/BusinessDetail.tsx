import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useContext, useState } from "react";
import {
	KeyboardAvoidingView,
	Picker,
	Platform,
	ScrollView,
	StyleSheet,
	View
} from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/auth";
import * as Routes from "src/navigation/constants";
import { BackBtn, Button, CancelBtn, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
	underlineHeaderB,
	viewBaseB,
	wrappingContainerBase
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { BusinessType } from "src/utils/types";

const BusinessTypes: BusinessType[] = [
	BusinessType.SOLE_PROPRIETORSHIP,
	BusinessType.CORPORATION,
	BusinessType.LLC,
	BusinessType.PARTNERSHIP,
	BusinessType.NON_PROFIT,
];

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
	},
	label: {
		marginTop: 30,
		color: colors.bodyText,
		fontSize: 10,
	},
	picker: {
		height: 55,
		borderRadius: 3,
		color: colors.purple,
		backgroundColor: colors.white,
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
});

const BusinessDetail = (): ReactElement => {
	const { signOut } = useContext(AuthContext);
	const navigation = useNavigation();
	/** Need to integrate business type from auth context here */
	const [businessType, setBusinessType] = useState<BusinessType>(
		BusinessType.SOLE_PROPRIETORSHIP
	);

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
						{Translation.PROFILE.BUSINESS_DETAIL}
					</Text>
				</View>
				<Text style={styles.bodyText}>
					{Translation.PROFILE.PERSIONAL_DETAILS_BODY}
				</Text>

				<Text style={styles.label}>
					{Translation.LABEL.BUSINESS_TYPE}
				</Text>
				<Picker
					selectedValue={businessType}
					style={styles.picker}
					onValueChange={(itemValue: BusinessType) =>
						setBusinessType(itemValue)
					}>
					{BusinessTypes.map((type: BusinessType, idx: number) => (
						<Picker.Item label={type} value={type} key={idx} />
					))}
				</Picker>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<View style={styles.bottomView}>
					<Button
						type="purple"
						title={Translation.BUTTON.NEXT}
						onPress={() =>
							navigation.navigate(Routes.BUSINESS_OWNER_DETAIL)
						}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default BusinessDetail;
