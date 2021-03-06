import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext, createRef } from 'react';
import { ScrollView, StyleSheet, Switch, View, KeyboardAvoidingView, TextInput, Platform, SafeAreaView } from 'react-native';
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
import { LoadingPage } from 'src/views';
import { ToastType } from 'src/utils/types';
import SecurityEyeButton from "src/shared/uielements/SecurityEyeButton";

interface SecurityProps extends IMap {
	password: string;
	newPassword: string;
	newPasswordConfirm: string;
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
	},
	eyeView: {
		position: "absolute",
		right: 10,
		top: 0,
		bottom: 0,
		justifyContent: "center",
	  },
	}
);

export const SettingsSecurity = (): JSX.Element => {
	const navigation = useNavigation();
	const { changePassword } = useContext(AuthContext);
	const { authorization, updateAuthorization } = useUserDetails();
	const [switchToggle, setSwitchToggle] = useState<boolean>(false);
	const [canSave, setCanSave] = useState<boolean>(false);
	const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPasswordMatched, setIsPasswordMatched] = useState<boolean>(false);
	const [state, setState] = useState<SecurityProps>({
		password: "",
		newPassword: "",
		newPasswordConfirm: ""
	});
	const [oldSecurity, setOldSecurity] = useState(true)
	const [newSecurity, setNewSecurity] = useState(true)
	const [confirmSecurity, setConfirmSecurity] = useState(true)
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
	}, [state, isValidPassword, isPasswordMatched]);

	useEffect(() => {
		setIsValidPassword(state.newPassword.length < 1 || isPasswordValid(state.newPassword));
		setIsPasswordMatched(state.newPasswordConfirm === state.newPassword)
	}, [state.newPasswordConfirm, state.newPassword]);

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
		setIsLoading(true);
		const response = await changePassword({
			oldPassword: state.password, 
			newPassword: state.newPassword
		});
		setIsLoading(false);
		if (!response?.success) {
			showToast(ToastType.ERROR, 'FAILED', Translation.OTHER.CHANGE_PASSWORD_FAILED);
			return;
		}
		
		showToast(ToastType.SUCCESS, 'SUCCESS', Translation.OTHER.CHANGE_PASSWORD_SUCCESS);
		navigation.goBack();
	}

	return (
		<KeyboardAvoidingView
            {...(Platform.OS === 'ios' && { behavior: 'padding' })}
			style={viewBase}>
			<LoadingPage visible={isLoading} isData={true} />
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>
			<ScrollView style={styles.content}>
				<View style={underlineHeader}>
					<Text style={styles.headerText}>{Translation.COMMUNITY_CHEST.SECURITY}</Text>
				</View>
				<View>
					<Text style={styles.label}>{Translation.LABEL.OLD_PASSWORD}</Text>
					<View>
						<BlockInput
							name="password"
							placeholder="password"
							value={state.password}
							secureTextEntry={oldSecurity}
							onChange={onValueChange}
							returnKeyType='next'
							onSubmitEditing={() => {
								newPasswordRef.current?.focus()
							}}
						/>
						<View style={styles.eyeView}>
							<SecurityEyeButton
								isSecurity={oldSecurity}
								onPress={() => setOldSecurity(!oldSecurity)}
							/>
						</View>
					</View>

					<Text style={styles.label}>{Translation.LABEL.NEW_PASSWORD}</Text>
					<Text style={styles.label}>{Translation.LABEL.PASSWORD_REG}</Text>
					<View>
						<BlockInput
							inputRef={newPasswordRef}
							name="newPassword"
							placeholder="new password"
							value={state.newPassword}
							secureTextEntry={newSecurity}
							onChange={onValueChange}
							returnKeyType='next'
							onSubmitEditing={()=>{
								confirmPasswordRef.current?.focus()
							}}
						/>
						<View style={styles.eyeView}>
							<SecurityEyeButton
								isSecurity={newSecurity}
								onPress={() => setNewSecurity(!newSecurity)}
							/>
						</View>
					</View>
					{!isValidPassword && (
						<Text style={styles.errorText}>{Translation.PASSWORD.NOT_MEET_REQUIREMENTS}</Text>
					)}

					<View style={styles.inlineView}>
						<Text style={styles.label}>{Translation.LABEL.CONFIRM_NEW_PASSWORD}</Text>
					</View>
					<View>
						<BlockInput
							inputRef={confirmPasswordRef}
							name="newPasswordConfirm"
							placeholder="new password confirm"
							value={state.newPasswordConfirm}
							secureTextEntry={confirmSecurity}
							onChange={onValueChange}
						/>
						<View style={styles.eyeView}>
							<SecurityEyeButton
								isSecurity={confirmSecurity}
								onPress={() => setConfirmSecurity(!confirmSecurity)}
							/>
						</View>
					</View>
					{!isPasswordMatched && (
						<Text style={styles.errorText}>{Translation.PASSWORD.NOT_MATCHED}</Text>
					)}
				</View>
			</ScrollView>
			<SafeAreaView style={styles.bottomView}>
				<Button
					type={BUTTON_TYPES.DARK_GREEN}
					title={Translation.BUTTON.SAVE_CHANGE}
					disabled={!canSave}
					onPress={handleSave}
				/>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}

export default SettingsSecurity;