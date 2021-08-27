import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
import React, { useState, useEffect, ReactElement } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Platform, Image, KeyboardAvoidingView} from "react-native";
import { Text } from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import { useUserDetails } from "src/hooks";
import { Header, BackBtn, BlockInput, Button } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase, underlineHeader } from "src/theme/elements";
import Translation from 'src/translation/en.json';
=======
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useEffect, useState } from 'react';
import {
	Image,
	KeyboardAvoidingView, Platform, ScrollView,
	StyleSheet, TouchableOpacity, View
} from 'react-native';
import { Text } from 'react-native-elements';
import { AuthContext } from 'src/auth';
import { BUTTON_TYPES } from 'src/constants';
import { BackBtn, BlockInput, Button, Header } from 'src/shared/uielements';
import { colors } from 'src/theme/colors';
import { underlineHeader, viewBase } from 'src/theme/elements';
>>>>>>> 9db8db32a9a5185c4f113eced679d15f594dcb89

interface PersonalProfileState {
	avatar: string;
	username: string;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
	},
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40,
	},
	contentView: {
		marginTop: 50,
		paddingBottom: 40,
	},
	imageView: {
		flex: 1,
		alignSelf: 'center',
	},
	placeholder: {
		width: 80,
		height: 80,
		backgroundColor: colors.darkGreen,
		borderRadius: 40,
	},
	imageDesc1: {
		fontSize: 16,
		color: colors.bodyText,
		textAlign: 'center',
		marginTop: 10,
	},
	imageDesc2: {
		fontSize: 10,
		textAlign: 'center',
		marginBottom: 10,
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 60,
	},
});

<<<<<<< HEAD
export const SettingsPersonalDetails = (): ReactElement => {
	const navigation = useNavigation();
	const {personalDetails, updatePersonalDetails} = useUserDetails();
=======
export const SettingsPersonalDetails = (): JSX.Element => {
	const { getAttributes, updateAttributes } = useContext(AuthContext);
	const navigation = useNavigation();
>>>>>>> 9db8db32a9a5185c4f113eced679d15f594dcb89
	const [canSave, setCanSave] = useState<boolean>(false);
	const [state, setState] = useState<PersonalProfileState>({
		avatar: '',
		username: '',
	});

	useEffect(() => {
		const userAttributes = async () => {
			const response = await getAttributes();
			response?.data?.forEach((attribute: any) => {
				if (attribute.Name === 'custom:tag') {
					setState((pv) => ({ ...pv, username: attribute.Value }));
				}
			});
		};
		userAttributes();
	}, []);

	useEffect(() => {
		setCanSave(state.username !== '');
	}, [state]);

	useEffect(() => {
		setState({
			avatar: personalDetails.avatar,
			username: personalDetails.username
		});
	}, [personalDetails]);

	useEffect(() => {
		(async () => {
<<<<<<< HEAD
		  if (Platform.OS !== 'web') {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== 'granted') {
			  alert(Translation.OTHER.NO_CAMERA_PERMISSION);
=======
			if (Platform.OS !== 'web') {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert(
						'Sorry, we need camera roll permissions to make this work!'
					);
				}
>>>>>>> 9db8db32a9a5185c4f113eced679d15f594dcb89
			}
		})();
	}, []);

	const onValueChange = (name: string, change: string) => {
		setState({
<<<<<<< HEAD
		  ...state,
		  [name]: change,
		} as PersonalProfileState);
		updatePersonalDetails({ [name]: change });
=======
			...state,
			[name]: change,
		});
>>>>>>> 9db8db32a9a5185c4f113eced679d15f594dcb89
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
<<<<<<< HEAD
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>{Translation.PROFILE.MY_PROFILE}</Text>
=======
				<View style={underlineHeader}>
					<Text style={styles.headerText}>My profile</Text>
>>>>>>> 9db8db32a9a5185c4f113eced679d15f594dcb89
				</View>
				<Text>{Translation.COMMUNITY_CHEST.INFORMATION_SHARE}</Text>
				<View style={styles.contentView}>
					<View style={styles.imageView}>
						<TouchableOpacity onPress={pickImage}>
							{state.avatar === '' && (
								<View style={styles.placeholder} />
							)}
							{state.avatar !== '' && (
								<Image
									source={{ uri: state.avatar }}
									style={styles.placeholder}
								/>
							)}
						</TouchableOpacity>
					</View>
<<<<<<< HEAD
					<Text style={styles.imageDesc1}>{Translation.PROFILE.CHANGE_PICTURE}</Text>
					<Text style={styles.imageDesc2}>{Translation.LABEL.MAX_BERKSHARES}</Text>
					<Text h3>{Translation.LABEL.USERNAME}</Text>
=======
					<Text style={styles.imageDesc1}>
						Change profile picture
					</Text>
					<Text style={styles.imageDesc2}>
						(MAX 200MB / JPG, JPEG, PNG)
					</Text>
					<Text h3>USER NAME</Text>
>>>>>>> 9db8db32a9a5185c4f113eced679d15f594dcb89
					<BlockInput
						name='username'
						placeholder='@username'
						value={state.username}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
				<View style={styles.bottomView}>
					<Button
<<<<<<< HEAD
						type="darkGreen"
						title={Translation.BUTTON.SAVE_CHANGE}
=======
						type={BUTTON_TYPES.DARK_GREEN}
						title='Save changes'
>>>>>>> 9db8db32a9a5185c4f113eced679d15f594dcb89
						disabled={!canSave}
						onPress={async () => {
							const response = await updateAttributes({
								update: { 'custom:tag': state.username },
							});
							if (response?.success) {
								console.log('updated successfully');
							}
						}}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default SettingsPersonalDetails;
