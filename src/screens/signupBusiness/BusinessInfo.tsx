import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useContext, useState, useEffect, RefObject, createRef } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View
} from "react-native";
import { Text } from "react-native-elements";
import SelectDropdown from 'react-native-select-dropdown';
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
import { BusinessBasicVerification } from "src/auth/types";
import { SafeAreaView, TextInput } from 'react-native';

const Industries = [
	Industry.ARTS_ENTERTAINMENT,
	Industry.COMMUNICATION_EDUCATION,
	Industry.FOOD_DRINK,
	Industry.HEALTH_WELLNESS,
	Industry.LODGING,
	Industry.SHOPPING,
	Industry.SERVICES
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
		justifyContent: 'center',
		borderRadius: 3,
		backgroundColor: colors.white,
		marginBottom: 10,
	},
	pickerText: {
        color: colors.purple
    },
    selectItem: {
        width: '100%',
        height: 55,
        backgroundColor: colors.white,
    },
    dropdownContainer: {marginTop: -22},
	formView: {
		paddingBottom: 40,
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20,
	},
});

const BusinessInfo = (): ReactElement => {
	const [goNext, setGoNext] = useState<boolean>(false);
	const { buisnessBasicVerification, setBuisnessBasicVerification, signOut } =
		useContext(AuthContext);
	const navigation = useNavigation();
	const industryRef: RefObject<SelectDropdown> = createRef()

	useEffect(() => {
		setGoNext(buisnessBasicVerification.registeredBusinessName !== "");
	}, [buisnessBasicVerification.registeredBusinessName])

	const onValueChange = (name: string, change: string) => {
		setBuisnessBasicVerification((pv: BusinessBasicVerification) => ({
			...pv,
			[name]: change,
		}));
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
			<View style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>
						{Translation.PROFILE.BUSINESS_INFORMATION}
					</Text>
				</View>
				<ScrollView>
					<View style={styles.formView}>
						<Text style={styles.label}>
							{Translation.LABEL.REGISTERD_NAME}
						</Text>
						<BlockInput
							name="registeredBusinessName"
							placeholder="Registered business name"
							placeholderTextColor={colors.greyedPurple}
							value={buisnessBasicVerification.registeredBusinessName}
							onChange={onValueChange}
							style={styles.input}
							returnKeyType='next'
							onSubmitEditing={() => {
								industryRef.current?.openDropdown()
							}}
						/>

						<Text style={styles.label}>
							{Translation.LABEL.INDUSTRY}
						</Text>
						<View style={styles.picker}>
							<SelectDropdown
								ref={industryRef}
								data={Industries}
								defaultValueByIndex={0}
								onSelect={(selectedItem) => {
									onValueChange("country", selectedItem)
								}}
								buttonTextAfterSelection={(selectedItem) => {
									return selectedItem
								}}
								rowTextForSelection={(item) => {
									return item
								}}
								buttonStyle={styles.selectItem}
								buttonTextStyle={styles.pickerText}
								rowStyle={styles.selectItem}
								dropdownStyle={styles.dropdownContainer}
								renderCustomizedRowChild={(item) => (
									<Text style={styles.pickerText}>{item}</Text>
								)}
								renderDropdownIcon={() => (
									<AntDesign name="down" size={18} color={colors.purple} />
								)}
							/>
						</View>
						<Text style={styles.label}>{Translation.LABEL.EIN}</Text>
						<BlockInput
							name="ein"
							placeholder="Employee identification number"
							keyboardType="number-pad"
							placeholderTextColor={colors.greyedPurple}
							value={buisnessBasicVerification.ein}
							onChange={onValueChange}
							style={styles.input}
						/>
					</View>
				</ScrollView>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<SafeAreaView style={styles.bottomView}>
					<Button
						type="purple"
						title={Translation.BUTTON.NEXT}
						disabled={!goNext}
						onPress={() =>
							navigation.navigate(Routes.BUSINESS_ADDRESS)
						}
					/>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default BusinessInfo;
