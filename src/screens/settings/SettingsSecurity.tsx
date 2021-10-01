import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import { Header, BlockInput, Button, BackBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase, underlineHeader } from "src/theme/elements";
import { IMap } from "src/utils/types";
import Translation from 'src/translation/en.json';
import * as Routes from 'src/navigation/constants';
import { BUTTON_TYPES } from 'src/constants';

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
	text: {
		fontSize: 16
	},
	label : {
		marginTop: 10
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
	const { authorization, updateAuthorization } = useUserDetails();
	const [switchToggle, setSwitchToggle] = useState<boolean>(false);
	const [canSave, setCanSave] = useState<boolean>(false);
	const [state, setState] = useState<SecurityProps>({
		password: "",
		newPassword: "",
		newPassowrdConfirm: ""
	});

	useEffect(() => {
		setSwitchToggle(authorization.touchID);
	}, [authorization]);

	useEffect(() => {
		setCanSave(Object.keys(state).every((key) => state[key] !== "") && state.newPassword === state.newPassowrdConfirm);
	}, [state]);

	const onTouchIdOption = (value: boolean) => {
		updateAuthorization({ touchID: value });
	}

	const onValueChange = (name: string, value: string) => {
		setState({
			...state,
			[name]: value
		});
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
					<Text style={styles.text}>{Translation.COMMUNITY_CHEST.ALLOW_TOUCH}</Text>
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
					<Text h3 style={styles.label}>{Translation.LABEL.OLD_PASSWORD}</Text>
					<BlockInput
						name="password"
						placeholder="password"
						value={state.password}
						secureTextEntry={true}
						onChange={onValueChange}
					/>

					<Text h3 style={styles.label}>{Translation.LABEL.NEW_PASSWORD}</Text>
					<Text h3>({Translation.LABEL.PASSWORD_REG})</Text>
					<BlockInput
						name="newPassword"
						placeholder="new password"
						value={state.newPassword}
						secureTextEntry={true}
						onChange={onValueChange}
					/>

					<Text h3 style={styles.label}>{Translation.LABEL.CONFIRM_NEW_PASSWORD}</Text>
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
					onPress={()=>navigation.navigate(Routes.SETTING_PERSONAL_PROFILE)}
				/>
			</View>
		</View>
	);
}

export default SettingsSecurity;