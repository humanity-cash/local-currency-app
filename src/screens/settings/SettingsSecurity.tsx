import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import { Header, BlockInput, Button, BackBtn } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewBase, underlineHeader } from "src/theme/elements";
import { IMap } from "src/utils/types";

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

export const SettingsSecurity = () => {
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
					<Text style={styles.headerText}>Security</Text>
				</View>
				<View style={styles.view}>
					<Text style={styles.text}>Allow touch ID</Text>
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
					<Text h3 style={styles.label}>OLD PASSWORD</Text>
					<BlockInput
						name="password"
						placeholder="password"
						value={state.password}
						secureTextEntry={true}
						onChange={onValueChange}
					/>

					<Text h3 style={styles.label}>NEW PASSWORD</Text>
					<Text h3>(MIN.8 CHARACTERS, 1 CAPITICAL, 1 LOWER AND 1 SYMBOL)</Text>
					<BlockInput
						name="newPassword"
						placeholder="new password"
						value={state.newPassword}
						secureTextEntry={true}
						onChange={onValueChange}
					/>

					<Text h3 style={styles.label}>CONFIRM NEW PASSWORD</Text>
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
					type="darkGreen"
					title="Save changes"
					disabled={!canSave}
					onPress={()=>navigation.navigate("SettingsPersonalProfile")}
				/>
			</View>
		</View>
	);
}

export default SettingsSecurity;