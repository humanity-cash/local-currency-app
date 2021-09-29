import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, TextInput, Dimensions } from "react-native";
import { Text, Image } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from "src/auth";
import { IAuth } from "src/auth/types";
import { useMediaLibraryPermission } from "src/hooks";
import { Header, BackBtn, BlockInput, BusinessAddressForm, Dialog, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBaseB, underlineHeaderB, dialogViewBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { BUTTON_TYPES } from 'src/constants';
import * as Routes from 'src/navigation/constants';

const styles = StyleSheet.create({
	container: { 
		flex: 1, 
		padding: 10 ,
	},
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
		color: colors.purple
	},
	contentView: {
		marginTop: 50,
		paddingBottom: 140
	},
	bannerImageView: {
		position: 'relative',
		borderRadius: 3,
		backgroundColor: colors.white,
		height: 220,
		marginBottom: 60
	},
	bannerImage: {
		width: '100%',
		height: 220
	},
	pickImageView: {
		position: 'absolute',
		bottom: -65,
		left: (Dimensions.get('window').width / 2) - 40,
		paddingTop: 30,
		paddingBottom: 30,
		justifyContent: 'center',
		alignItems: 'center'
	},
	label: {
		color: colors.bodyText
	},
	smallLabel: {
		color: colors.bodyText,
		fontSize: 10
	},
	inputBg: {
		color: colors.purple,
		backgroundColor: colors.white
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
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		width: 80,
		height: 80,
		borderRadius: 40
	},
	scanButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '90%',
		height: 55,
		position: 'absolute',
		bottom: 45,
		color: colors.white,
		backgroundColor: colors.purple,
		alignSelf: 'center',
		borderRadius: 30
	},
	scanBtnText: {
		color: colors.white
	},
	dialogBg: {
		backgroundColor: colors.overlayPurple
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
		color: colors.purple
	},
	dialogBottom: {
		marginTop: 20,
	}
});

export const MerchantSettingsProfile = (): JSX.Element => {
	const navigation = useNavigation();

	const { buisnessBasicVerification, setBuisnessBasicVerification } =
		useContext(AuthContext);
	const [bannerImage, setBannerImage] = useState<string>("");
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useMediaLibraryPermission();

	const onValueChange = (name: string, change: string) => {
		setBuisnessBasicVerification((pv: IAuth) => ({ ...pv, [name]: change }));
	};

	const handleSave = () => {
		setIsVisible(false);
		navigation.goBack();
	}

	const handleBakcHome = () => {
		setIsVisible(false);
		navigation.navigate(Routes.MERCHANT_DASHBOARD);
	}

	const pickImage = async (name: string) => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
	
		if (!result.cancelled) {
			name === 'banner' ? setBannerImage(result.uri) : onValueChange('avatar', result.uri);
		}
	};

	return (
		<View style={viewBaseB}>
			<Header
				leftComponent={<BackBtn color={colors.purple} onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={styles.container}>
				<View style={ underlineHeaderB }>
					<Text style={styles.headerText}>{Translation.PROFILE.MY_PROFILE}</Text>
				</View>
				<Text style={styles.label}>{Translation.COMMUNITY_CHEST.INFORMATION_SHARE}</Text>
				<View style={styles.contentView}>
					<View style={styles.bannerImageView}>
						<TouchableOpacity onPress={()=>pickImage('banner')}>
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
							<TouchableOpacity onPress={()=>pickImage('avatar')}>
								{buisnessBasicVerification.avatar === "" && (
									<View style={styles.imageView}>
										<Image
											source={require("../../../assets/images/placeholder4.png")}
											containerStyle={styles.image}
										/>
									</View>
								)}
								{buisnessBasicVerification.avatar !== "" && (
									<Image
										source={{ uri: buisnessBasicVerification.avatar }}
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
						value={buisnessBasicVerification.tag}
						onChange={onValueChange}
						style={styles.inputBg}
					/>

					<Text style={styles.smallLabel}>
						TELL US YOUR STORY (50 WORDS MAX)
					</Text>
					<TextInput
						placeholder="Tell the world about your business. What gives you joy as an entrepreneur? What do you love about the Berkshires?"
						value={buisnessBasicVerification.story}
						multiline={true}
						onChangeText={(newValue) =>
							onValueChange("story", newValue)
						}
						style={styles.storyText}
						numberOfLines={4}
					/>

					<Text style={styles.smallLabel}>
						WEBSITE - OPTIONAL
					</Text>
					<BlockInput
						name="website"
						placeholder="www.shop.com"
						placeholderTextColor={colors.greyedPurple}
						value={buisnessBasicVerification.website}
						onChange={onValueChange}
						style={styles.inputBg}
					/>

					<BusinessAddressForm  style={styles.inputBg} />
				</View>
			</ScrollView>
			<TouchableOpacity onPress={()=>setIsVisible(true)} style={styles.scanButton}>
				<Text style={styles.scanBtnText}>{Translation.BUTTON.SAVE_CHANGE}</Text>
			</TouchableOpacity>
			{isVisible && (
				<Dialog visible={isVisible} onClose={()=>setIsVisible(false)} backgroundStyle={styles.dialogBg}>
					<View style={dialogViewBase}>
						<View style={styles.dialogWrap}>
							<Text style={styles.dialogHeader}>{Translation.OTHER.CONFIRM_SAVE}</Text>
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
}

export default MerchantSettingsProfile;