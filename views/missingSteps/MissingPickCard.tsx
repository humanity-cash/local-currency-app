import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { modalViewBase, baseHeader, viewBase, wrappingContainerBase, modalBaseHeader } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { colors } from "../../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { usePaymentDetails } from "../../hooks/usePaymentDetails";
import { CreditCardDetails } from "../../utils/types";
import { SettingsListItem } from "../../uielements/cards/SettingsListItem";

type MissingPickCardProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	view: {
		marginTop: 5,
		backgroundColor: colors.white,
		padding: 0,
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	text: {
		fontSize: 20,
		lineHeight: 60,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	arrow: {
		marginVertical: 15
	}
});

const MissingPickCard = (props: MissingPickCardProps) => {
	const navigation = useNavigation();
	const { cards, update, addCard } = usePaymentDetails();

	useEffect(() => {
		update({ type: 'creditCard' });
	}, []);

	const onSuccess = () => {
		navigation.navigate('MissingAddCashResult');
	}

	const renderCardTitle = (card: CreditCardDetails) => {
		const firstTwo = card.number.substring(0,2);
		const lastFour = card.number.substring(card.number.length - 4, card.number.length);
		return `${firstTwo} **** **** **** ${lastFour}`;
	}
	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<View style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text h1>Select a credit card</Text>
					</View>
					{cards.map(card => (
						<SettingsListItem
							key={`card-${card.id}`}
							onPress={() => props.navigation.navigate('MissingConfirmPin', { onSuccess })}
							name={renderCardTitle(card)}
						/>
					))}

					<SettingsListItem
						onPress={() => props.navigation.navigate('MissingCreditCard')}
						name="New credit card"
					/>
				</View>
			</View>
		</View>
	);
}

export default MissingPickCard