import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext, createRef } from 'react';
import { ScrollView, StyleSheet, Switch, View, KeyboardAvoidingView, TextInput, Platform } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/contexts";
import { useUserDetails } from "src/hooks";
import { Header, BlockInput, Button, BackBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase, underlineHeader, FontFamily } from "src/theme/elements";
import { IMap } from "src/utils/types";
import Translation from 'src/translation/en.json';
import { BUTTON_TYPES } from 'src/constants';
import { isPasswordValid } from 'src/utils/validation';
import { showToast } from 'src/utils/common';
import { ToastType } from 'src/utils/types';
import { LoadingScreenTypes } from 'src/utils/types';
import { updateLoadingStatus } from 'src/store/loading/loading.actions';
import { useDispatch } from 'react-redux';

interface SecurityProps extends IMap {
	password: string;
	newPassword: string;
	newPassowrdConfirm: string;
}

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		fontWeight: '400',
		lineHeight: 40
	},
	content: {
		flex: 1, 
		paddingHorizontal: 10,
		paddingBottom: 40
	},
	view: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 80,
		backgroundColor: colors.card,
		flexDirection: 'row',
		paddingHorizontal: 20,
		marginTop: 10,
		borderRadius: 3
	},
	label : {
		fontSize: 10
	},
	inlineView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	errorText: {
		color: colors.mistakeRed,
		fontSize: 10,
		alignSelf: 'flex-end',
		lineHeight: 12
	},
	bottomView: {
		marginBottom: 20,
		marginHorizontal: 20
	},
	saveButton: {
		fontFamily: FontFamily.bold,
		color: colors.darkRed
	}
});

export const SettingsSecurity = (): JSX.Element => {
	const navigation = useNavigation();
	const { changePassword } = useContext(AuthContext);
	const dispatch = useDispatch();
	const { authorization, updateAuthorization } = useUserDetails();
	const [switchToggle, setSwitchToggle] = useState<boolean>(false);
	const [canSave, setCanSave] = useState<boolean>(false);
	const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
	const [isPasswordMatched, setIsPasswordMatched] = useState<boolean>(false);
	const [state, setState] = useState<SecurityProps>({
		password: "",
		newPassword: "",
		newPassowrdConfirm: ""
	});
	const newPasswordRef = createRef<TextInput>()
	const confirmPasswordRef = createRef<TextInput>()

	useEffect(() => {
		setSwitchToggle(authorization.touchID);
	}, [authorization]);

	useEffect(() => {
		setCanSave(
			Object.keys(state).every((key) => state[key] !== "") && 
			state.newPassword.length > 0 && 
			isValidPassword && 
			isPasswordMatched
		);
	}, [state]);

	useEffect(() => {
		setIsValidPassword(state.newPassword.length < 1 || isPasswordValid(state.newPassword));
		setIsPasswordMatched(state.newPassowrdConfirm === state.newPassword)
	}, [state.newPassowrdConfirm, state.newPassword]);

	const onTouchIdOption = (value: boolean) => {
		updateAuthorization({ touchID: value });
	}

	const onValueChange = (name: string, value: string) => {
		setState({
			...state,
			[name]: value
		});
	}

	const handleSave = async () => {
		dispatch(updateLoadingStatus({
			isLoading: true,
			screen: LoadingScreenTypes.LOADING_DATA
		}));
		const response = await changePassword({
			oldPassword: state.password, 
			newPassword: state.newPassword
		});
		dispatch(updateLoadingStatus({
			isLoading: false,
			screen: LoadingScreenTypes.LOADING_DATA
		}));
		
		if (!response?.success) {
			showToast(ToastType.ERROR, 'FAILED', Translation.OTHER.CHANGE_PASSWORD_FAILED);
			return;
		}
		
		showToast(ToastType.SUCCESS, 'SUCCESS', Translation.OTHER.CHANGE_PASSWORD_SUCCESS);
		navigation.goBack();
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS == "ios" ? "padding" : "height"}
			style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={styles.content}>
				<View style={ underlineHeader }>
					<Text style={styles.headerText}>{Translation.COMMUNITY_CHEST.SECURITY}</Text>
				</View>
				<View style={styles.view}>
					<Text>{Translation.COMMUNITY_CHEST.ALLOW_TOUCH}</Text>
					<Switch
						trackColor={{ false: colors.white, true: colors.green }}
						thumbColor={colors.white}
						ios_backgroundColor={colors.white}
						onValueChange={onTouchIdOption}
						value={switchToggle}
					/>
				</View>
				<View style={ underlineHeader }></View>
				<View>
					<Text style={styles.label}>{Translation.LABEL.OLD_PASSWORD}</Text>
					<BlockInput
						name="password"
						placeholder="password"
						value={state.password}
						secureTextEntry={true}
						onChange={onValueChange}
						returnKeyType='next'
						onSubmitEditing={()=>{
							newPasswordRef.current?.focus()
						}}
					/>

					<Text style={styles.label}>{Translation.LABEL.NEW_PASSWORD}</Text>
					<Text style={styles.label}>{Translation.LABEL.PASSWORD_REG}</Text>
					<BlockInput
						inputRef={newPasswordRef}
						name="newPassword"
						placeholder="new password"
						value={state.newPassword}
						secureTextEntry={true}
						onChange={onValueChange}
						returnKeyType='next'
						onSubmitEditing={()=>{
							confirmPasswordRef.current?.focus()
						}}
					/>
					{!isValidPassword && (
						<Text style={styles.errorText}>{Translation.PASSWORD.NOT_MEET_REQUIREMENTS}</Text>
					)}

					<View style={styles.inlineView}>
						<Text style={styles.label}>{Translation.LABEL.CONFIRM_NEW_PASSWORD}</Text>
					</View>
					<BlockInput
						inputRef={confirmPasswordRef}
						name="newPassowrdConfirm"
						placeholder="new password confirm"
						value={state.newPassowrdConfirm}
						secureTextEntry={true}
						onChange={onValueChange}
					/>
					{!isPasswordMatched && (
						<Text style={styles.errorText}>{Translation.PASSWORD.NOT_MATCHED}</Text>
					)}
				</View>
			</ScrollView>
			<View style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.DARK_GREEN}
					title={Translation.BUTTON.SAVE_CHANGE}
					disabled={!canSave}
					onPress={handleSave}
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

export default SettingsSecurity;