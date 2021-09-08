import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useContext } from "react";
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
import {
	BackBtn,
	BlockInput,
	Button,
	CancelBtn,
	Header
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
	underlineHeaderB,
	viewBaseB,
	wrappingContainerBase
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { Industry } from "src/utils/types";

const Industries: Industry[] = [
	Industry.ARTS_ENTERTAINMENT,
	Industry.COMMUNICATION_EDUCATION,
	Industry.FOOD_DRINK,
	Industry.HEALTH_WELLNESS,
	Industry.LODGING,
	Industry.SHOPPING,
	Industry.SERVICES,
];

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		lineHeight: 32,
		color: colors.purple,
	},
	bodyText: {
		color: colors.bodyText,
	},
	label: {
		color: colors.bodyText,
		fontSize: 10,
	},
	input: {
		color: colors.purple,
		backgroundColor: colors.white,
	},
	picker: {
		height: 55,
		borderRadius: 3,
		color: colors.purple,
		backgroundColor: colors.white,
		marginBottom: 10,
	},
	formView: {
		paddingBottom: 40,
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
});

const BusinessInfo = (): ReactElement => {
	const { buisnessBasicVerification, setBuisnessBasicVerification, signOut } =
		useContext(AuthContext);
	const navigation = useNavigation();

	const onValueChange = (name: string, change: string) => {
		// setBuisnessBasicVerification({ [name]: change });
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
				<Text style={styles.bodyText}></Text>

				<View style={styles.formView}>
					<Text style={styles.label}>
						{Translation.LABEL.REGISTERD_NAME}
					</Text>
					<BlockInput
						name="registeredBusinessname"
						placeholder="Registered business name"
						value={buisnessBasicVerification.registeredBusinessName}
						onChange={onValueChange}
						style={styles.input}
					/>

					<Text style={styles.label}>
						{Translation.LABEL.INDUSTRY}
					</Text>
					<Picker
						selectedValue={buisnessBasicVerification.industry}
						style={styles.picker}
						onValueChange={(itemValue: Industry) =>
							onValueChange("industry", itemValue)
						}>
						{Industries.map((type: Industry, idx: number) => (
							<Picker.Item label={type} value={type} key={idx} />
						))}
					</Picker>

					<Text style={styles.label}>{Translation.LABEL.EIN}</Text>
					<BlockInput
						name="ein"
						placeholder="Employee identification number"
						value={buisnessBasicVerification.ein}
						onChange={onValueChange}
						style={styles.input}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<View style={styles.bottomView}>
					<Button
						type="purple"
						title={Translation.BUTTON.NEXT}
						disabled={false}
						onPress={() =>
							navigation.navigate(Routes.BUSINESS_ADDRESS)
						}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default BusinessInfo;
