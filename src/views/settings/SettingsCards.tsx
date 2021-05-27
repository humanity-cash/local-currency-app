import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import { Header } from "../../uielements/header/Header";
import { colors } from "../../theme/colors";
import { viewDashboardBase } from "../../theme/elements";
import { AntDesign } from "@expo/vector-icons";
import { usePaymentDetails } from "../../hooks/usePaymentDetails";
import { CreditCardCard } from "../../uielements/cards/CreditCardCard";
import { Button } from "../../uielements/Button";
import BottomSheet from "../../uielements/BottomSheet";

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

export const SettingsCards = () => {
	const navigation = useNavigation();
	const { cards, removeCard } = usePaymentDetails();
	const [visibleRemove, setVisibleRemove] = useState(false);
	const [currentCard, setCurrentCard] = useState('');

	const onRemove = (id: string) => {
		setCurrentCard(id);
		setVisibleRemove(true);
	}

	const onConfirmRemove = () => {
		if (currentCard) {
			removeCard(currentCard);
			setVisibleRemove(false);
			setCurrentCard('');
		}
	}

	const onCancelRemove = () => {
		setVisibleRemove(false);
		setCurrentCard('');
	}

	return (
		<View style={viewDashboardBase}>
			<Header
				placement="left"
				style={{ backgroundColor: colors.text }}
				barStyle="light-content"
				centerComponent={<Text style={styles.headerText}>Account details</Text>}
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
			<ScrollView style={{ flex: 1, padding: 10, paddingBottom: 140 }}>
				<View style={{ paddingBottom: 40 }}>
					<View style={styles.headerView}>
						<Text h1 style={{ color: colors.white, marginBottom: 0 }}>Saved credit cards</Text>
					</View>
					<View>
						{cards.map(card => (
							<CreditCardCard
								key={`card-${card.id}`}
								card={card}
								onRemovePress={onRemove}
							/>
						))}
					</View>
				</View>
			</ScrollView>
			<BottomSheet
				visible={visibleRemove}
				onClose={() => setVisibleRemove(false)}
				text="Are you sure?"
			>
				<View>
					<Button
						style={{ flex: 1, margin: 5, backgroundColor: colors.textWarning }}
						type="fluidDark"
						title="YES, REMOVE CARD"
						onPress={onConfirmRemove}
					/>
					<Button
						style={{ margin: 5, backgroundColor: colors.white }}
						textStyle={{ color: colors.text }}
						type="fluidDark"
						title="CANCEL"
						onPress={onCancelRemove}
					/>
				</View>
			</BottomSheet>
		</View>
	);
}

export default SettingsCards;