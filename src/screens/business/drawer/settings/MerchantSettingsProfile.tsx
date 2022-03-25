import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useState, useEffect } from "react";
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView
} from "react-native";
import { Image, Text } from "react-native-elements";
import SelectDropdown from "react-native-select-dropdown";
import { UserAPI } from 'src/api';
import { BUTTON_TYPES } from "src/constants";
import { UserContext } from "src/contexts";
import countries from "src/mocks/countries";
import * as Routes from "src/navigation/constants";
import { LoadingPage } from "src/views";
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
import { buildImageFormData, imagePickerConfig, profilePictureUrl, showToast } from 'src/utils/common';
import { isSuccessResponse } from "src/utils/http";
import { ToastType } from 'src/utils/types';
import MaskInput from 'src/shared/uielements/MaskInput';
import {uploadImageToS3, purgeImgix} from "src/api/profilePicture";
import { Industry } from "src/utils/types";

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
		textAlign: 'center',
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
		paddingBottom: 40,
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
		paddingHorizontal: 10
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
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20,
	},
	picker: {
		height: 55,
		justifyContent: "center",
		borderRadius: 3,
		backgroundColor: colors.white,
		marginBottom: 10,
	},
		pickerText: {
		color: colors.purple,
	},
	selectItem: {
		width: "100%",
		height: 55,
		backgroundColor: colors.white,
	},
	dropdownContainer: {
		marginTop: -22
	}
});

const Industries: string[] = [
	Industry.SHOPPING,
	Industry.FOOD_DRINK,
	Industry.ARTS_ENTERTAINMENT,
	Industry.HEALTH_WELLNESS,
	Industry.COMMUNITY_EDUCATION,
	Industry.SERVICES,
	Industry.FARMS,
	Industry.LODGING,
];

export const MerchantSettingsProfile = (): JSX.Element => {
	const navigation = useNavigation();
	const { user, updateUserData, businessDwollaId } = useContext(UserContext);
	const [bannerImage, setBannerImage] = useState<string>(profilePictureUrl(`${businessDwollaId}_banner`));
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const business = user?.business;
	const [businessData, setBusinessData] = useState({
		tag: business?.tag || "",
		avatar: profilePictureUrl(businessDwollaId),
		story: business?.story || "",
		address1: business?.address1 || "",
		address2: business?.address2 || "",
		state: business?.state || "",
		city: business?.city || "",
		phoneNumber: business?.phoneNumber || "",
		postalCode: business?.postalCode || "",
		//@ts-ignore
		website: business?.website || "",
		industry: business?.industry || ""
	})

	const defaultIndustryIndex = Industries.findIndex(
		(value) => {
			return value.toLowerCase() === businessData.industry.toLowerCase()
				|| (value === Industry.COMMUNITY_EDUCATION && businessData.industry.toLowerCase() === "communication & education")
		}
	)

	useEffect(() => {
		updateBusinessProfileData('state', countries[0])
	}, [])

	const availableNext = () => {
		return 	Boolean(businessData.industry) &&
				Boolean(businessData.tag) &&
				Boolean(businessData.address1) &&
				Boolean(businessData.city) &&
				Boolean(businessData.state) &&
				Boolean(businessData.postalCode)
	}
  
	const updateBusinessProfileData = (prop: string, newValue: string) => setBusinessData((pv) => {
		const newState: any = {
			...pv
		}
		newState[prop] = newValue
		return newState
	})


	const handleSave = async () => {
		setIsLoading(true);
		const response = await UserAPI.updateBusinessProfile({
			businessDwollaId,
			business: {
				...businessData
			}
		});
		if (isSuccessResponse(response)) {
			showToast(ToastType.SUCCESS, "Updated Successfully!", "");
			//@ts-ignore
			updateUserData({ ...response.data.data });
		} else {
			showToast(ToastType.ERROR, "Whoops, something went wrong.", "Connection failed.");
		}
		setIsLoading(false);
	};

	const handleBakcHome = () => {
		setIsVisible(false);
		navigation.navigate(Routes.MERCHANT_DASHBOARD);
	};

    const pickImage = async (name: string) => {
        const result = await ImagePicker.launchImageLibraryAsync(imagePickerConfig);
        if(result.cancelled) return;
        setIsLoading(true);
        if(name === "banner") {
            const data = await buildImageFormData(result.uri, `${businessDwollaId}_banner`, { width: 300, height: 300 });
            await uploadImageToS3(data, `${businessDwollaId}_banner`)
            await purgeImgix(`${businessDwollaId}_banner`);
            setBannerImage(result.uri);
        } else if (name === "avatar") {
            const data = await buildImageFormData(result.uri, businessDwollaId);
            await uploadImageToS3(data, businessDwollaId)
            await purgeImgix(businessDwollaId);
            updateBusinessProfileData('avatar', result.uri)
        }
        setIsLoading(false);
    };

	return (
		<KeyboardAvoidingView 
			{...(Platform.OS === "ios" && { behavior: "padding" })}
			style={viewBaseB}>
			<LoadingPage visible={isLoading} isData={true}/>
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
                            <Image
                                source={{ uri: bannerImage }}
                                style={styles.bannerImage}
                            />
						</TouchableOpacity>

						<View style={styles.pickImageView}>
							<TouchableOpacity
                                onPress={() => pickImage("avatar")}>
                                <Image
                                    source={{ uri: businessData.avatar  }}
                                    style={styles.imageView}
                                />
							</TouchableOpacity>
						</View>
					</View>
					<Text style={styles.smallLabel}>{Translation.LABEL.INDUSTRY}*</Text>
					<View style={styles.picker}>
						<SelectDropdown
							data={Industries}
							defaultValueByIndex={defaultIndustryIndex >= 0 ? defaultIndustryIndex : 0}
							onSelect={(selectedItem) => {
								updateBusinessProfileData("industry", selectedItem)
							}}
							buttonTextAfterSelection={(selectedItem) => {
								return selectedItem;
							}}
							rowTextForSelection={(item) => {
								return item;
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
					<Text style={styles.smallLabel}>
						BUSINESS NAME - THIS NAME WILL BE PUBLIC*
					</Text>
					<BlockInput
						name="tag"
						placeholder="Business name"
						placeholderTextColor={colors.greyedPurple}
						value={businessData.tag}
						onChange={(name: string, newValue: string) =>
							updateBusinessProfileData(name, newValue)
						}
						style={styles.inputBg}
					/>
					<Text style={styles.smallLabel}>
						TELL US YOUR STORY (50 WORDS MAX)
					</Text>
					<TextInput
						placeholder="Tell the world about your business. What gives you joy as an entrepreneur? What do you love about the Berkshires?"
						value={businessData.story}
						multiline={true}
						onChangeText={(newValue: string) => { updateBusinessProfileData('story', newValue) }}
						style={styles.storyText}
						numberOfLines={4}
						autoCapitalize='none'
						autoCorrect={false}
					/>

					<Text style={styles.smallLabel}>WEBSITE - OPTIONAL</Text>
					<BlockInput
						name="website"
						placeholder="www.shop.com"
						placeholderTextColor={colors.greyedPurple}
						value={businessData.website}
						onChange={(name: string, newValue: string) => updateBusinessProfileData(name, newValue)}
						style={styles.inputBg}
					/>
					<View>
						<Text style={businessAddressFormStyles.label}>
							ADDRESS 1
						</Text>
						<BlockInput
							name="address1"
							placeholder="Street number, street name"
							value={businessData.address1}
							onChange={(name: string, newValue: string) => updateBusinessProfileData(name, newValue)}
							style={businessAddressFormStyles.inputBg}
						/>
						<Text style={businessAddressFormStyles.label}>
							ADDRESS 2 - OPTIONAL
						</Text>
						<BlockInput
							name="address2"
							placeholder="Apt."
							value={businessData.address2}
							onChange={(name: string, newValue: string) => updateBusinessProfileData(name, newValue)}
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
									value={businessData.city}
									onChange={(name: string, newValue: string) => updateBusinessProfileData(name, newValue)}
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
										onSelect={(selectedItem) => updateBusinessProfileData('state', selectedItem)}
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
										rowTextStyle={{textAlign: 'center'}}
									/>
								</View>
							</View>
						</View>

						<Text style={businessAddressFormStyles.label}>
							POSTAL CODE
						</Text>
						<BlockInput
							name="postalCode"
							placeholder="00000"
							keyboardType="number-pad"
							value={businessData.postalCode}
							onChange={(name: string, newValue: string) => updateBusinessProfileData(name, newValue)}
							style={businessAddressFormStyles.inputBg}
						/>
						<Text style={businessAddressFormStyles.label}>
							PHONE NUMBER - OPTIONAL
						</Text>
						<MaskInput
							value={businessData.phoneNumber}
							mask={["(", /\d/, /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
							name="phoneNumber"
							placeholder="(XXX) XXX-XXXX"
							keyboardType="number-pad"
							onChange={(name: string, newValue: string) => updateBusinessProfileData(name, newValue)}
							style={businessAddressFormStyles.inputBg}
						/>
					</View>
				</View>
			</ScrollView>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.PURPLE}
					title={Translation.BUTTON.SAVE_CHANGE}
					disabled={!availableNext()}
					onPress={handleSave}
				/>
			</SafeAreaView>
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
		</KeyboardAvoidingView>
	);
};

export default MerchantSettingsProfile;
