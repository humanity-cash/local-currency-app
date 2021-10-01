import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/auth";
import { useUserDetails } from "src/hooks";
import { Header, BlockInput, Button, BackBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase, underlineHeader } from "src/theme/elements";
import { IMap } from "src/utils/types";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';
import { isPasswordValid } from 'src/utils/validation';

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
	},
	bottomView: {
		marginBottom: 40,
		marginHorizontal: 20
	},
	saveButton: {
		fontFamily: 'IBMPlexSansSemiBold',
		color: colors.darkRed
	}
});

export const SettingsSecurity = (): JSX.Element => {
	const navigation = useNavigation();
	const { signInDetails, changePassword } = useContext(AuthContext);
	const { authorization, updateAuthorization } = useUserDetails();
	const [switchToggle, setSwitchToggle] = useState<boolean>(false);
	const [canSave, setCanSave] = useState<boolean>(false);
	const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
	const [state, setState] = useState<SecurityProps>({
		password: "",
		newPassword: "",
		newPassowrdConfirm: ""
	});

	useEffect(() => {
		setSwitchToggle(authorization.touchID);
	}, [authorization]);

	useEffect(() => {
		setCanSave(
			Object.keys(state).every((key) => state[key] !== "") && 
			state.newPassword === state.newPassowrdConfirm && 
			isPasswordValid(state.newPassword) && 
			isPasswordValid(state.password)
		);
	}, [state]);

	useEffect(() => {
		setIsValidPassword(state.newPassword === state.newPassowrdConfirm);
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
		const response = await changePassword({
			email: signInDetails?.email, 
			oldPassword: state.password, 
			newPassword: state.newPassword
		});
		
		if (!response?.success) {
			alert(Translation.OTHER.CHANGE_PASSWORD_FAILED);
			return;
		}
		alert(Translation.OTHER.CHANGE_PASSWORD_SUCCESS);
		navigation.navigate(Routes.DASHBOARD);
	}

	return (
		<View style={viewBase}>
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
					/>

					<Text style={styles.label}>{Translation.LABEL.NEW_PASSWORD}</Text>
					<Text style={styles.label}>({Translation.LABEL.PASSWORD_REG})</Text>
					<BlockInput
						name="newPassword"
						placeholder="new password"
						value={state.newPassword}
						secureTextEntry={true}
						onChange={onValueChange}
					/>

					<View style={styles.inlineView}>
						<Text style={styles.label}>{Translation.LABEL.CONFIRM_NEW_PASSWORD}</Text>
						{!isValidPassword && (
							<Text style={styles.errorText}>REPEAT NEW PASSWORD</Text>
						)}
					</View>
					<BlockInput
						name="newPassowrdConfirm"
						placeholder="new password confirm"
						value={state.newPassowrdConfirm}
						secureTextEntry={true}
						onChange={onValueChange}
					/>
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
		</View>
	);
}

export default SettingsSecurity;