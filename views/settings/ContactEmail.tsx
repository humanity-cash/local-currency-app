import React from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Linking } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { Header } from "../../uielements/header/Header";
import { colors } from "../../theme/colors";
import { viewDashboardBase } from "../../theme/elements";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "../../uielements/Button";

const styles = StyleSheet.create({
	headerText: {
		color: colors.white,
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 16
	},
	headerView: {
		flexDirection: "row",
		marginTop: 30,
		marginBottom: 10
	},
	text: {
		color: colors.white
	}
});

export const ContactEmail = () => {
	const navigation = useNavigation();
	return (
		<View style={viewDashboardBase}>
			<Header
				placement="left"
				style={{ backgroundColor: colors.text }}
				barStyle="light-content"
				centerComponent={<Text style={styles.headerText}>Terms and conditions</Text>}
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
			<View style={{ flex: 1, padding: 10 }}>
				<View style={styles.headerView}>
					<Text h1 style={{ color: colors.white, marginBottom: 0 }}>Contact via email</Text>
				</View>
				<Text style={styles.text}>If you have questions, complaints, remarks, or just like to chat, please send an email to sven@date.com</Text>
			</View>
			<Button
				type="fluidDark"
				title={`OPEN MY EMAIL APP`}
				onPress={() => Linking.openURL('mailto:sven@date.com')}
			/>
		</View>
	);
}

export default ContactEmail;