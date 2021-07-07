import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Switch, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import { BottomSheet, Button, Header, SettingsListItem } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewDashboardBase } from "src/theme/elements";
import SettingsChangePasscode from "./SettingsChangePasscode";
import SettingsWalletMinimum from "./SettingsWalletMinimum";

const styles = StyleSheet.create({
	headerText: {
		color: colors.white,
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 16
	},
	container: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		backgroundColor: colors.text,
		zIndex: 100,
		elevation: 10
	},
	headerView: {
		flexDirection: "row",
		marginTop: 30,
		marginBottom: 10
	},
	signOutView: {
		fontSize: 20,
		position: 'absolute',
		bottom: 0,
		right: 0,
		marginBottom: 10,
		color: colors.white
	},
	signOutButton: {
		fontSize: 20,
		fontFamily: 'IBMPlexSansSemiBold',
		position: 'absolute',
		bottom: 0,
		right: 0,
		marginBottom: 10,
		color: colors.white
	},
	header: {
		fontFamily: 'IBMPlexSansBold',
		fontSize: 20,
	},
	modalWrap: {
		paddingHorizontal: 10,
		height: '100%',
		flex: 1
	},
	modalHeader: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		marginBottom: 10
	},
	view: {
		marginTop: 3,
		backgroundColor: colors.white,
		padding: 0,
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	text: {
		fontSize: 20,
		lineHeight: 60,
		paddingLeft: 10,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	arrow: {
		marginVertical: 15
	}
});

export const Settings = () => {
	const navigation = useNavigation();
	const { authorization, updateAuthorization } = useUserDetails();
	const [closeVisible, setCloseVisible] = useState(false);
	const [switchToggle, setSwitchToggle] = useState(false);
	const [changePasswordVisible, setChangePasswordVisible] = useState(false);
	const [changeWalletMinimum, setChangeWalletMinimum] = useState(false);

	useEffect(() => {
		setSwitchToggle(authorization.touchID);
	}, [authorization]);

	const onTouchIdOption = (value: boolean) => {
		updateAuthorization({ touchID: value });
	}

	const onCloseConfirm = () => {
		setCloseVisible(false)
	}

	const onCloseCancel = () => {
		setCloseVisible(false)
	}

	return (
		<View style={viewDashboardBase}>
			<Header
				placement="left"
				style={{ backgroundColor: colors.text }}
				barStyle="light-content"
				centerComponent={<Text style={styles.headerText}>Dashboard</Text>}
				leftComponent={
					<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
						<View>
							<AntDesign
								style={{ paddingTop: 2 }}
								name="arrowleft"
								size={25}
								color={colors.white}
							/>
						</View>
					</TouchableWithoutFeedback>
				}
			/>
			<ScrollView style={{ flex: 1, padding: 10 }}>
				<View style={styles.headerView}>
					<Text h1 style={{ color: colors.white, marginBottom: 0 }}>Settings</Text>
				</View>
				<View>
					<SettingsListItem
						onPress={() => navigation.navigate('SettingsPersonalDetails')}
						name="Personal details"
					/>
					<SettingsListItem
						onPress={() => navigation.navigate('SettingsAccountDetails')}
						name="Account details"
					/>
					<SettingsListItem
						onPress={() => setChangeWalletMinimum(true)}
						name="Set minimum wallet"
					/>
					<SettingsListItem
						onPress={() => setChangePasswordVisible(true)}
						name="Change password"
					/>
					<View style={styles.view}>
						<Text style={styles.text}>Touch ID</Text>
						<Switch
							style={styles.arrow}
							trackColor={{ false: colors.white, true: colors.green }}
							thumbColor={colors.white}
							ios_backgroundColor={colors.white}
							onValueChange={onTouchIdOption}
							value={switchToggle}
						/>
					</View>
					<View style={{ marginTop: 20 }}>
						<SettingsListItem
							onPress={() => setCloseVisible(true)}
							name="Close account"
							hideArrow={true}
							textStyle={{ color: colors.textWarning }}
						/>
					</View>
				</View>
			</ScrollView>
			<BottomSheet
				visible={closeVisible}
				onClose={onCloseCancel}
				text="Are you sure?"
			>
				<View>
					<Button
						style={{ flex: 1, margin: 5, backgroundColor: colors.textWarning }}
						type="fluidDark"
						title="YES, CLOSE ACCOUNT"
						onPress={onCloseConfirm}
					/>
					<Button
						style={{ margin: 5, backgroundColor: colors.white }}
						textStyle={{ color: colors.text }}
						type="fluidDark"
						title="CANCEL"
						onPress={onCloseCancel}
					/>
				</View>
			</BottomSheet>
			<SettingsChangePasscode visible={changePasswordVisible} onClose={() => setChangePasswordVisible(false)} />
			<SettingsWalletMinimum visible={changeWalletMinimum} onClose={() => setChangeWalletMinimum(false)} />
		</View>
	);
}

export default Settings;