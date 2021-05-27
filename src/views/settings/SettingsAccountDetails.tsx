import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { Header } from "../../uielements/header/Header";
import { colors } from "../../theme/colors";
import { viewDashboardBase } from "../../theme/elements";
import { AntDesign } from "@expo/vector-icons";
import { PersonalDetailsCard } from "../../uielements/cards/PersonalDetailsCard";
import { usePaymentDetails } from "../../hooks/usePaymentDetails";
import { useWallet } from "../../hooks/useWallet";

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

export const SettingsAccountDetails = () => {
	const navigation = useNavigation();
	const { cards } = usePaymentDetails();
	const { wallet } = useWallet();

	return (
		<View style={viewDashboardBase}>
			<Header
				placement="left"
				style={{ backgroundColor: colors.text }}
				barStyle="light-content"
				centerComponent={<Text style={styles.headerText}>Settings</Text>}
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
					<Text h1 style={{ color: colors.white, marginBottom: 0 }}>Account details</Text>
				</View>
				<View>
					<PersonalDetailsCard
						name="Wallet ID"
						value={wallet.details.walletId}
						disabled={true}
					/>
					<PersonalDetailsCard
						name="Your DATE iBAN NUMBER"
						value={wallet.details.iban}
						disabled={true}
					/>
					<PersonalDetailsCard
						name="SAVED CREDIT CARDs"
						value={`${cards.length} saved cards`}
						onPress={() => navigation.navigate('SettingsCards')}
					/>
				</View>
			</ScrollView>
		</View>
	);
}

export default SettingsAccountDetails;