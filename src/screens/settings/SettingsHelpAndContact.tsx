import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Text } from "react-native-elements";
import faqList from "src/mocks/faq";
import { FAQCard, Header, SettingsListItem } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { viewDashboardBase } from "src/theme/elements";

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
	section: {
		fontFamily: 'IBMPlexSansBold',
		fontSize: 20,
		color: colors.white,
		marginVertical: 10
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
	}
});

export const SettingsHelpAndContact = () => {
	const navigation = useNavigation();
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
					<Text h1 style={{ color: colors.white, marginBottom: 0 }}>Help and contact</Text>
				</View>
				<Text style={styles.section}>Contact</Text>
				<View>
					<SettingsListItem
						name="Contact via email"
						onPress={() => navigation.navigate('ContactEmail')}
					/>
					<SettingsListItem
						name="Contact via phone"
						onPress={() => navigation.navigate('ContactPhone')}
					/>
				</View>
				<View style={{ paddingBottom: 30, paddingTop: 10 }}>
					<Text style={styles.section}>FAQ</Text>
					{faqList.map((faq, index) => (
						<FAQCard key={`faq-card-${index}`} {...faq} />
					))}
				</View>
			</ScrollView>
		</View>
	);
}

export default SettingsHelpAndContact;