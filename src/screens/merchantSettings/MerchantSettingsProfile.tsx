import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useState } from "react";
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View
} from "react-native";
import { Image, Text } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import { AuthContext } from "src/auth";
import { CognitoBusinessUpdateAttributes } from "src/auth/cognito/types";
import { BUTTON_TYPES } from "src/constants";
import { useMediaLibraryPermission } from "src/hooks";
import countries from "src/mocks/countries";
import * as Routes from "src/navigation/constants";
import {
	BackBtn,
	BlockInput,
	Button,
	Dialog,
	Header
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
	dialogViewBase,
	underlineHeaderB,
	viewBaseB
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { ToastType, LoadingScreenTypes } from 'src/utils/types';
import { showToast } from 'src/utils/common';
import { updateLoadingStatus } from 'src/store/loading/loading.actions';
import { useDispatch } from 'react-redux';

const businessAddressFormStyles = StyleSheet.create({
	bodyText: {
		color: colors.bodyText,
	},
	label: {
		color: colors.bodyText,
		fontSize: 10,
	},
	errorLabel: {
		color: colors.bodyText,
		fontSize: 10,
		marginTop: 5,
	},
	inlineView: {
		flex: 1,
		flexDirection: "row",
	},
	cityView: {
		width: "70%",
	},
	stateContent: {
		width: "30%",
	},
	stateView: {
		height: 55,
		justifyContent: "center",
		backgroundColor: colors.white,
		borderRadius: 3,
		marginTop: 8,
		marginLeft: 4,
	},
	pickerText: {
		color: colors.purple,
	},
	selectItem: {
		width: "100%",
		height: 55,
		backgroundColor: colors.white,
	},
	dropdownContainer: { marginTop: -22 },
	inputBg: {
		color: colors.purple,
		backgroundColor: colors.white,
	},
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	headerText: {
		fontSize: 32,
		fontWeight: "400",
		lineHeight: 40,
		color: colors.purple,
	},
	contentView: {
		marginTop: 50,
		paddingBottom: 140,
	},
	bannerImageView: {
		position: "relative",
		borderRadius: 3,
		backgroundColor: colors.white,
		height: 220,
		marginBottom: 60,
	},
	bannerImage: {
		width: "100%",
		height: 220,
	},
	pickImageView: {
		position: "absolute",
		bottom: -65,
		left: Dimensions.get("window").width / 2 - 40,
		paddingTop: 30,
		paddingBottom: 30,
		justifyContent: "center",
		alignItems: "center",
	},
	label: {
		color: colors.bodyText,
	},
	smallLabel: {
		color: colors.bodyText,
		fontSize: 10,
	},
	inputBg: {
		color: colors.purple,
		backgroundColor: colors.white,
	},
	storyText: {
		backgroundColor: colors.white,
		borderRadius: 3,
		paddingHorizontal: 15,
		paddingVertical: 8,
		marginVertical: 8,
		borderWidth: 0,
		color: colors.purple,
	},
	imageView: {
		width: 80,
		height: 80,
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 40,
	},
	scanButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
		height: 55,
		position: "absolute",
		bottom: 45,
		color: colors.white,
		backgroundColor: colors.purple,
		alignSelf: "center",
		borderRadius: 30,
	},
	scanBtnText: {
		color: colors.white,
	},
	dialogBg: {
		backgroundColor: colors.overlayPurple,
	},
	dialogWrap: {
		paddingHorizontal: 10,
		height: "100%",
		flex: 1,
	},
	dialogHeader: {
		fontSize: 30,
		lineHeight: 35,
		marginTop: 20,
		marginBottom: 10,
		color: colors.purple,
	},
	dialogBottom: {
		marginTop: 20,
	},
});

enum BusinessUpdate {
	Story = "custom:business.story",
	Address1 = "custom:business.address1",
	Address2 = "custom:business.address2",
	PostalCode = "custom:business.postalCode",
	Tag = "custom:business.tag",
	State = "custom:business.state",
	City = "custom:business.city",
	PhoneNumber = "custom:business.phoneNumber",
	Website = "custom:business.website",
}

export const MerchantSettingsProfile = (): JSX.Element => {
	const navigation = useNavigation();
	const { userAttributes, updateAttributes } = useContext(AuthContext);
	const dispatch = useDispatch();
	const [bannerImage, setBannerImage] = useState<string>("");
	const [state, setState] = useState({
		businessStory: userAttributes[BusinessUpdate.Story],
		businessAddress1: userAttributes[BusinessUpdate.Address1],
		businessAddress2: userAttributes[BusinessUpdate.Address2],
		businessPostalCode: userAttributes[BusinessUpdate.PostalCode],
		businessTag: userAttributes[BusinessUpdate.Tag],
		businessState: userAttributes[BusinessUpdate.State],
		businessCity: userAttributes[BusinessUpdate.City],
		businessPhonenumber: userAttributes[BusinessUpdate.PhoneNumber],
		businessWebsite: userAttributes[BusinessUpdate.Website],
	});
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const handleSave = async () => {

		// Only add dirty inputs
		const changedData: CognitoBusinessUpdateAttributes = {
			...(state.businessStory !==
				userAttributes[BusinessUpdate.Story] && {
				"custom:business.story": state.businessStory,
			}),
			...(state.businessAddress1 !==
				userAttributes[BusinessUpdate.Address1] && {
				"custom:business.address1": state.businessAddress1,
			}),
			...(state.businessAddress2 !==
				userAttributes[BusinessUpdate.Address2] && {
				"custom:business.address2": state.businessAddress2,
			}),
			...(state.businessPostalCode !==
				userAttributes[BusinessUpdate.PostalCode] && {
				"custom:business.postalCode": state.businessPostalCode,
			}),
			...(state.businessTag !==
				userAttributes[BusinessUpdate.Tag] && {
				"custom:business.tag": state.businessTag,
			}),
			...(state.businessState !==
				userAttributes[BusinessUpdate.State] && {
				"custom:business.state": state.businessState,
			}),
			...(state.businessCity !==
				userAttributes[BusinessUpdate.City] && {
				"custom:business.city": state.businessCity,
			}),
			...(state.businessPhonenumber !==
				userAttributes[BusinessUpdate.PhoneNumber] && {
				"custom:business.phoneNumber": state.businessPhonenumber,
			}),
			...(state.businessWebsite !==
				userAttributes[BusinessUpdate.Website] && {
				"custom:business.website": state.businessWebsite,
			}),
		};

		dispatch(updateLoadingStatus({
			isLoading: true,
			screen: LoadingScreenTypes.LOADING_DATA
		}));
		const response = await updateAttributes(changedData);
		dispatch(updateLoadingStatus({
			isLoading: false,
			screen: LoadingScreenTypes.LOADING_DATA
		}));

		if (response.success) {
			navigation.goBack();
		} else {
			showToast(ToastType.ERROR, "Whooops, something went wrong.", "Connection failed.");
		}
	};

	useMediaLibraryPermission();

	const handleBakcHome = () => {
		setIsVisible(false);
		navigation.navigate(Routes.MERCHANT_DASHBOARD);
	};

	const pickImage = async (name: string) => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			name === "banner" ? setBannerImage(result.uri) : null;
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
			/>
			<ScrollView style={styles.container}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>
						{Translation.PROFILE.MY_PROFILE}
					</Text>
				</View>
				<Text style={styles.label}>
					{Translation.COMMUNITY_CHEST.INFORMATION_SHARE}
				</Text>
				<View style={styles.contentView}>
					<View style={styles.bannerImageView}>
						<TouchableOpacity onPress={() => pickImage("banner")}>
							{bannerImage === "" && (
								<Image
									source={require("../../../assets/images/profile-banner.png")}
									containerStyle={styles.bannerImage}
								/>
							)}
							{bannerImage !== "" && (
								<Image
									source={{ uri: bannerImage }}
									style={styles.bannerImage}
								/>
							)}
						</TouchableOpacity>

						<View style={styles.pickImageView}>
							<TouchableOpacity
								onPress={() => pickImage("avatar")}>
								{userAttributes.avatar === "" && (
									<View style={styles.imageView}>
										<Image
											source={require("../../../assets/images/placeholder4.png")}
											containerStyle={styles.image}
										/>
									</View>
								)}
								{userAttributes.avatar !== "" && (
									<Image
										source={{ uri: userAttributes.avatar }}
										style={styles.imageView}
									/>
								)}
							</TouchableOpacity>
						</View>
					</View>
					<Text style={styles.smallLabel}>
						BUSINESS NAME - THIS NAME WILL BE PUBLIC*
					</Text>
					<BlockInput
						name="businessname"
						placeholder="Business name"
						placeholderTextColor={colors.greyedPurple}
						value={state.businessTag}
						onChange={(_: string, newValue: string) =>
							setState((pv) => ({ ...pv, businessTag: newValue }))
						}
						style={styles.inputBg}
					/>
					<Text style={styles.smallLabel}>
						TELL US YOUR STORY (50 WORDS MAX)
					</Text>
					<TextInput
						placeholder="Tell the world about your business. What gives you joy as an entrepreneur? What do you love about the Berkshires?"
						value={state.businessStory}
						multiline={true}
						onChangeText={(newValue: string) =>
							setState((pv) => ({
								...pv,
								businessStory: newValue,
							}))
						}
						style={styles.storyText}
						numberOfLines={4}
					/>

					<Text style={styles.smallLabel}>WEBSITE - OPTIONAL</Text>
					<BlockInput
						name="website"
						placeholder="www.shop.com"
						placeholderTextColor={colors.greyedPurple}
						value={state.businessWebsite}
						onChange={(_: string, newValue: string) =>
							setState((pv) => ({
								...pv,
								businessWebsite: newValue,
							}))
						}
						style={styles.inputBg}
					/>

					<View>
						<Text style={businessAddressFormStyles.label}>
							ADDRESS 1
						</Text>
						<BlockInput
							name="addressLine"
							placeholder="Street number, street name"
							value={state.businessAddress1}
							onChange={(_name: string, newValue: string) => {
								setState((pv) => ({
									...pv,
									businessAddress1: newValue,
								}));
							}}
							style={businessAddressFormStyles.inputBg}
						/>
						<Text style={businessAddressFormStyles.label}>
							ADDRESS 2
						</Text>
						<BlockInput
							name="addressLine2"
							placeholder="Apt."
							value={state.businessAddress2}
							onChange={(_name: string, newValue: string) => {
								setState((pv) => ({
									...pv,
									businessAddress2: newValue,
								}));
							}}
							style={businessAddressFormStyles.inputBg}
						/>

						<View style={businessAddressFormStyles.inlineView}>
							<View style={businessAddressFormStyles.cityView}>
								<Text style={businessAddressFormStyles.label}>
									CITY
								</Text>
								<BlockInput
									name="city"
									placeholder="City"
									value={state.businessCity}
									onChange={(
										_name: string,
										newValue: string
									) => {
										setState((pv) => ({
											...pv,
											businessCity: newValue,
										}));
									}}
									style={businessAddressFormStyles.inputBg}
								/>
							</View>
							<View
								style={businessAddressFormStyles.stateContent}>
								<Text style={businessAddressFormStyles.label}>
									STATE
								</Text>
								<View
									style={businessAddressFormStyles.stateView}>
									<SelectDropdown
										data={countries}
										defaultValueByIndex={0}
										onSelect={(selectedItem) => {
											setState((pv) => ({
												...pv,
												businessState: selectedItem,
											}));
										}}
										buttonTextAfterSelection={(
											selectedItem
										) => {
											return selectedItem;
										}}
										rowTextForSelection={(item) => {
											return item;
										}}
										buttonStyle={
											businessAddressFormStyles.selectItem
										}
										buttonTextStyle={
											businessAddressFormStyles.pickerText
										}
										rowStyle={
											businessAddressFormStyles.selectItem
										}
										dropdownStyle={
											businessAddressFormStyles.dropdownContainer
										}
										renderCustomizedRowChild={(item) => (
											<Text
												style={
													businessAddressFormStyles.pickerText
												}>
												{item}
											</Text>
										)}
										renderDropdownIcon={() => (
											<AntDesign
												name="down"
												size={18}
												color={colors.purple}
											/>
										)}
									/>
								</View>
							</View>
						</View>

						<Text style={businessAddressFormStyles.label}>
							POSTAL CODE
						</Text>
						<BlockInput
							name="zipCode"
							placeholder="00000"
							keyboardType="decimal-pad"
							value={state.businessPostalCode}
							onChange={(_name: string, newValue: string) => {
								setState((pv) => ({
									...pv,
									businessPostalCode: newValue,
								}));
							}}
							style={businessAddressFormStyles.inputBg}
						/>
						<Text style={businessAddressFormStyles.label}>
							PHONE NUMBER - OPTIONAL
						</Text>
						<BlockInput
							name="phoneNumber"
							placeholder="+00 0987 6543 21"
							value={state.businessPhonenumber}
							onChange={(_name: string, newValue: string) => {
								setState((pv) => ({
									...pv,
									businessPhoneNumber: newValue,
								}));
							}}
							style={businessAddressFormStyles.inputBg}
						/>
					</View>
				</View>
			</ScrollView>
			<TouchableOpacity
				onPress={handleSave} 
				style={styles.scanButton}>
				<Text style={styles.scanBtnText}>
					{Translation.BUTTON.SAVE_CHANGE}
				</Text>
			</TouchableOpacity>
			{isVisible && (
				<Dialog
					visible={isVisible}
					onClose={() => setIsVisible(false)}
					backgroundStyle={styles.dialogBg}>
					<View style={dialogViewBase}>
						<View style={styles.dialogWrap}>
							<Text style={styles.dialogHeader}>
								{Translation.OTHER.CONFIRM_SAVE}
							</Text>
						</View>
						<View style={styles.dialogBottom}>
							<Button
								type={BUTTON_TYPES.TRANSPARENT}
								title="Yes, go back to home"
								textStyle={styles.inputBg}
								onPress={handleBakcHome}
							/>
							<Button
								type={BUTTON_TYPES.PURPLE}
								title="Save changes"
								onPress={handleSave}
							/>
						</View>
					</View>
				</Dialog>
			)}
		</View>
	);
};

export default MerchantSettingsProfile;
