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
import { UserContext } from "src/api/context";

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

// enum BusinessUpdate {
// 	Story = "custom:business.story",
// 	Address1 = "custom:business.address1",
// 	Address2 = "custom:business.address2",
// 	PostalCode = "custom:business.postalCode",
// 	Tag = "custom:business.tag",
// 	State = "custom:business.state",
// 	City = "custom:business.city",
// 	PhoneNumber = "custom:business.phoneNumber",
// 	Website = "custom:business.website",
// }

export const MerchantSettingsProfile = (): JSX.Element => {
	const navigation = useNavigation();
	const { user } = useContext(UserContext);
	const dispatch = useDispatch();
	const [bannerImage, setBannerImage] = useState<string>("");
	const [isVisible, setIsVisible] = useState<boolean>(false);

	const handleSave = async () => {
		const changedData = {};
		dispatch(updateLoadingStatus({
			isLoading: true,
			screen: LoadingScreenTypes.LOADING_DATA
		}));
		// const response = await updateAttributes(changedData); // :FIXME - not implemtend in API yet
		const response = { success: false };
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
								{user?.business?.avatar === "" && (
									<View style={styles.imageView}>
										<Image
											source={require("../../../assets/images/placeholder4.png")}
											containerStyle={styles.image}
										/>
									</View>
								)}
								{user?.business?.avatar !== "" && (
									<Image
										source={{ uri: user?.business?.avatar }}
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
						value={user?.business?.tag}
						onChange={(_: string, newValue: string) => { }}
							// setState((pv) => ({ ...pv, businessTag: newValue }))
						style={styles.inputBg}
					/>
					<Text style={styles.smallLabel}>
						TELL US YOUR STORY (50 WORDS MAX)
					</Text>
					<TextInput
						placeholder="Tell the world about your business. What gives you joy as an entrepreneur? What do you love about the Berkshires?"
						value={user?.business?.story}
						multiline={true}
						onChangeText={(newValue: string) => { }}
						// setState((pv) => ({
						// 	...pv,
						// 	businessStory: newValue,
						// }))
						style={styles.storyText}
						numberOfLines={4}
					/>

					<Text style={styles.smallLabel}>WEBSITE - OPTIONAL</Text>
					<BlockInput
						name="website"
						placeholder="www.shop.com"
						placeholderTextColor={colors.greyedPurple}
						value={"NOT DEFINED"}
						onChange={(_: string, newValue: string) => { }
							// setState((pv) => ({
							// 	...pv,
							// 	businessWebsite: newValue,
							// }))
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
							value={user?.business?.address1}
							onChange={(_name: string, newValue: string) => {
								// setState((pv) => ({
								// 	...pv,
								// 	businessAddress1: newValue,
								// }));
							}}
							style={businessAddressFormStyles.inputBg}
						/>
						<Text style={businessAddressFormStyles.label}>
							ADDRESS 2
						</Text>
						<BlockInput
							name="addressLine2"
							placeholder="Apt."
							value={user?.business?.address2}
							onChange={(_name: string, newValue: string) => {
								// setState((pv) => ({
								// 	...pv,
								// 	businessAddress2: newValue,
								// }));
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
									value={user?.business?.city}
									onChange={(
										_name: string,
										newValue: string
									) => {
										// setState((pv) => ({
										// 	...pv,
										// 	businessCity: newValue,
										// }));
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
											// setState((pv) => ({
											// 	...pv,
											// 	businessState: selectedItem,
											// }));
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
							keyboardType="number-pad"
							value={user?.business?.postalCode}
							onChange={(_name: string, newValue: string) => {
								// setState((pv) => ({
								// 	...pv,
								// 	businessPostalCode: newValue,
								// }));
							}}
							style={businessAddressFormStyles.inputBg}
						/>
						<Text style={businessAddressFormStyles.label}>
							PHONE NUMBER - OPTIONAL
						</Text>
						<BlockInput
							name="phoneNumber"
							placeholder="+00 0987 6543 21"
							value={user?.business?.phoneNumber}
							onChange={(_name: string, newValue: string) => {
								// setState((pv) => ({
								// 	...pv,
								// 	businessPhoneNumber: newValue,
								// }));
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
