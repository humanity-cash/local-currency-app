import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import React, { useContext, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Text } from "react-native-elements";
import { UserAPI } from "src/api";
import { BUTTON_TYPES } from 'src/constants';
import { UserContext } from 'src/contexts';
import { LoadingPage } from 'src/views';
import { BackBtn, BlockInput, Button, Header } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { underlineHeader, viewBase } from "src/theme/elements";
import Translation from 'src/translation/en.json';
import { showToast } from 'src/utils/common';
import { isSuccessResponse } from 'src/utils/http';
import { ToastType } from 'src/utils/types';

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
		marginHorizontal: 20,
		marginBottom: 20,
	},
});

export const SettingsPersonalDetails = (): JSX.Element => {
	const { user, customerDwollaId, updateUserData } = useContext(UserContext);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const navigation = useNavigation();
	const [state, setState] = useState({
		avatar: user?.customer?.avatar || '',
		username: user?.customer?.tag || ''
	});

	const onValueChange = (name: string, change: string) => {
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

	const handleSave = async () => {
		setIsLoading(true);
		const response = await UserAPI.updateCustomerProfile({ customerDwollaId, customer: { tag: state.username, avatar: state.avatar } })
		if (isSuccessResponse(response)) {
			//@ts-ignore
			updateUserData({ ...response.data.data });
			showToast(ToastType.SUCCESS, "Updated Successfully", "");
		} else {
			showToast(ToastType.ERROR, "Whooops, something went wrong.", "Connection failed.");
		}
		setIsLoading(false);
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
			style={viewBase}>
			<LoadingPage visible={isLoading} isData={true} />
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={styles.container}>
				<View style={underlineHeader}>
					<Text style={styles.headerText}>{Translation.PROFILE.MY_PROFILE}</Text>
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
					<Text style={styles.imageDesc1}>{Translation.PROFILE.CHANGE_PICTURE}</Text>
					<Text style={styles.imageDesc2}>{Translation.LABEL.MAX_BERKSHARES}</Text>
					<Text h3>{Translation.LABEL.USERNAME}</Text>
					<BlockInput
						name='username'
						placeholder='@username'
						value={state.username}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.DARK_GREEN}
					title={Translation.BUTTON.SAVE_CHANGE}
					disabled={state.username === user?.customer?.tag}
					onPress={handleSave}
				/>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

export default SettingsPersonalDetails;
