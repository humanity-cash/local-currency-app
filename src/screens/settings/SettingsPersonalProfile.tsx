import { useNavigation } from '@react-navigation/native';
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

export const SettingsPersonalDetails = (): JSX.Element => {
	const { getAttributes, updateAttributes } = useContext(AuthContext);
	const navigation = useNavigation();
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
		(async () => {
			if (Platform.OS !== 'web') {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert(
						'Sorry, we need camera roll permissions to make this work!'
					);
				}
			}
		})();
	}, []);

	const onValueChange = (name: any, change: any) => {
		setState({
			...state,
			[name]: change,
		});
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
				<View style={underlineHeader}>
					<Text style={styles.headerText}>My profile</Text>
				</View>
				<Text>This information is shared publicly.</Text>
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
					<Text style={styles.imageDesc1}>
						Change profile picture
					</Text>
					<Text style={styles.imageDesc2}>
						(MAX 200MB / JPG, JPEG, PNG)
					</Text>
					<Text h3>USER NAME</Text>
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
						type={BUTTON_TYPES.DARK_GREEN}
						title='Save changes'
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
