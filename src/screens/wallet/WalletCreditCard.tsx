import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { usePaymentDetails, useWallet } from "src/hooks";
import { BackBtn, Button, CancelBtn, CreditCardForm, ModalHeader } from 'src/shared/uielements';
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { colors } from "src/theme/colors";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import { makeId } from "src/utils/common";
import { TransactionType } from "src/utils/types";
import { validateCreditCard } from "src/utils/validation";

type WalletCreditCardProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	view: {
		marginTop: 10,
		backgroundColor: colors.white,
		padding: 0,
		flexDirection: 'row',
		paddingHorizontal: 10
	},
	header: {
		fontFamily: 'IBMPlexSansBold',
		fontSize: 20,
	},
	text: {
		fontSize: 20,
		lineHeight: 60,
		flex: 1,
		fontFamily: 'IBMPlexSansSemiBold',
	},
	arrow: {
		marginVertical: 15
	},
	bottomNavigation: {
		justifyContent: "center",
		color: colors.brown,
		marginLeft: 2
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center',
		flexDirection: "row"
	}
});

const WalletCreditCardView = (props: WalletCreditCardProps) => {
	const { details, update, addCard } = usePaymentDetails();
	const { wallet, updateAmount, addTransaction } = useWallet();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	useEffect(() => {
		update({ type: 'creditCard' });
	}, []);

	const onSuccess = () => {
		addCard();
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

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
			/>

			<ScrollView style={ wrappingContainerBase }>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text style={styles.header}>Your credit card details</Text>
					</View>
					<CreditCardForm isValid={isValid => setGoNext(isValid)} showValidation={showValidation} />
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
				keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
			>
				<View style={styles.bottomView}>
					<AntDesign
						style={styles.arrow}
						name="lock"
						size={20}
						color={colors.brown}
					/>
					<Text style={styles.bottomNavigation}>Card details are stored securely</Text>
				</View>
				<Button
					type="fluidDark"
					title="NEXT"
					disabled={!goNext}
					onPress={() => {
						const validation = validateCreditCard(details.selected);
						setShowValidation(true);
						if (validation.valid) {
							props.navigation.navigate('WalletConfirmPin', { onSuccess })
						}
					}}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

const WalletCreditCard = (props: WalletCreditCardProps) => {
	const navigation = useNavigation();
	return <WalletCreditCardView {...props} navigation={navigation} />;
}
export default WalletCreditCard