import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { usePaymentDetails, useWallet } from "src/hooks";
import { BackBtn, CancelBtn, ModalHeader, SettingsListItem } from "src/shared/uielements";
import { colors } from "src/theme/colors";
import { baseHeader, modalBaseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import { makeId } from "src/utils/common";
import { CreditCardDetails, TransactionType } from "src/utils/types";

type TransactionPickCardProps = {
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

const WalletPickCard = (props: TransactionPickCardProps) => {
	const navigation = useNavigation();
	const { details, cards, update } = usePaymentDetails();
	const { wallet, updateAmount, addTransaction } = useWallet();

	useEffect(() => {
		update({ type: 'creditCard' });
	}, []);

	const onSuccess = () => {
		updateAmount(wallet.amount + parseFloat(details.amount));
		addTransaction({
			id: makeId(),
			price: parseFloat(details.amount),
			account: details.withdrawDetails.number,
			type: TransactionType.ADDCASH,
			created: new Date(),
		});
		props.route.params.onClose();
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
						<Text style={modalBaseHeader}>Select a credit card</Text>
					</View>
					{cards.map(card => (
						<SettingsListItem
							key={`card-${card.id}`}
							onPress={() => props.navigation.navigate('WalletConfirmPin', { onSuccess })}
							name={renderCardTitle(card)}
						/>
					))}

					<SettingsListItem
						onPress={() => props.navigation.navigate('WalletCreditCard')}
						name="New credit card"
					/>
				</View>
			</View>
		</View>
	);
}

export default WalletPickCard