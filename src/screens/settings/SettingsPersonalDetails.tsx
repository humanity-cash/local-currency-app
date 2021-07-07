import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import { useUserDetails } from "src/hooks";
import { Header, PersonalDetailsCard } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewDashboardBase } from "src/theme/elements";
import SettingsChangeEmail from "./SettingsChangeEmail";
import SettingsChangePhone from "./SettingsChangePhone";

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
	header: {
		fontFamily: 'IBMPlexSansBold',
		fontSize: 20,
	},
	descriptionText: {
		color: colors.white,
		width: '90%',
		marginTop: 5
	}
});

export const SettingsPersonalDetails = () => {
	const navigation = useNavigation();
	const { personalDetails } = useUserDetails();
	const [changeEmailVisible, setChangeEmailVisible] = useState(false);
	const [changePhoneVisible, setChangePhoneVisible] = useState(false);

	const createPhoneText = () => {
		const  { phoneCountry, phoneNumber } = personalDetails;
		return `${phoneCountry} **** ${phoneNumber.substring(phoneNumber.length - 3)}`;
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
					<Text h1 style={{ color: colors.white, marginBottom: 0 }}>Personal details</Text>
				</View>
				<View>
					<PersonalDetailsCard
						name="first name"
						value={personalDetails.firstname}
						disabled={true}
					/>
					<PersonalDetailsCard
						name="last name"
						value={personalDetails.lastname}
						disabled={true}
					/>
					<PersonalDetailsCard
						onPress={() => setChangeEmailVisible(true)}
						name="email"
						value={personalDetails.email}
					/>
					<PersonalDetailsCard
						onPress={() => setChangePhoneVisible(true)}
						name="phone"
						value={createPhoneText()}
					/>
					<Text style={styles.descriptionText}>If you would like to change details that you can’t change in the app, please contact us.</Text>
				</View>
			</ScrollView>
			<SettingsChangeEmail onClose={() => setChangeEmailVisible(false)} visible={changeEmailVisible} />
			<SettingsChangePhone onClose={() => setChangePhoneVisible(false)} visible={changePhoneVisible} />
		</View>
	);
}

export default SettingsPersonalDetails;