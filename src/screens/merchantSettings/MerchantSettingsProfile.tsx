import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, ReactElement } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Platform, Image, KeyboardAvoidingView} from "react-native";
import { Text } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { useUserDetails } from "src/hooks";
import { Header, BackBtn, BlockInput, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase, underlineHeader } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { BUTTON_TYPES } from 'src/constants';

interface ProfileState {
	avatar: string;
	username: string;
}

const styles = StyleSheet.create({
	container: { 
		flex: 1, 
		padding: 10 ,
	},
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	contentView: {
		marginTop: 50,
		paddingBottom: 40
	},
	imageView: {
		flex: 1,
		alignSelf: 'center'
	},
	placeholder: {
		width: 80, 
		height: 80, 
		backgroundColor: colors.darkGreen,
		borderRadius: 40
	},
	imageDesc1: {
		fontSize: 16,
		color: colors.bodyText, 
		textAlign: "center", 
		marginTop: 10,
	},
	imageDesc2: {
		fontSize: 10,
		textAlign: "center", 
		marginBottom: 10
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 60,
	}
});

export const MerchantSettingsDetails = (): ReactElement => {
	const navigation = useNavigation();
	const { personalDetails, updatePersonalDetails } = useUserDetails();
	const [canSave, setCanSave] = useState<boolean>(false);
	const [state, setState] = useState<ProfileState>({
		avatar: "",
		username: ""
	});

	useEffect(() => {
		setCanSave(state.username !== "");
	}, [state]);

	useEffect(() => {
		setState({
			avatar: personalDetails.avatar,
			username: personalDetails.username
		});
	}, [personalDetails]);

	useEffect(() => {
		(async () => {
		  if (Platform.OS !== 'web') {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
			  alert(Translation.OTHER.NO_CAMERA_PERMISSION);
			}
		  }
		})();
	}, []);

	const onValueChange = (name: string, change: string) => {
		setState({
		  ...state,
		  [name]: change,
		} as ProfileState);
		updatePersonalDetails({ [name]: change });
	};

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});
	
		if (!result.cancelled) {
		  	onValueChange('avatar', result.uri);
		}
	};

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={styles.container}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>{Translation.PROFILE.MY_PROFILE}</Text>
				</View>
				<Text>{Translation.COMMUNITY_CHEST.INFORMATION_SHARE}</Text>
				<View style={styles.contentView}>
					<View style={styles.imageView}>
						<TouchableOpacity onPress={pickImage}>
						{state.avatar === '' && <View style={styles.placeholder} />}
						{state.avatar !== '' && <Image source={{ uri: state.avatar }} style={styles.placeholder} />}
						</TouchableOpacity>
					</View>
					<Text style={styles.imageDesc1}>{Translation.PROFILE.CHANGE_PICTURE}</Text>
					<Text style={styles.imageDesc2}>(MAX 200MB / JPG, JPEG, PNG)</Text>
					<Text h3>{Translation.LABEL.USERNAME}</Text>
					<BlockInput
						name="username"
						placeholder="@username"
						value={state.username}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
			>
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.PURPLE}
						title={Translation.BUTTON.SAVE_CHANGE}
						disabled={!canSave}
						onPress={()=>setCanSave(true)}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
}

export default MerchantSettingsDetails;