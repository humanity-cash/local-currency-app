import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import { usePaymentDetails } from "src/hooks";
import { BackBtn, Button, CancelBtn, CreditCardForm } from 'src/shared/uielements';
import { ModalHeader } from "src/shared/uielements/header";
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { colors } from "src/theme/colors";
import { baseHeader, modalBaseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import { validateCreditCard } from "src/utils/validation";

type TransactionCreditCardProps = {
	navigation?: any
	route?: any,
	cardId?: string
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

const TransactionCreditCardView = (props: TransactionCreditCardProps) => {
	const { details, update, addCard } = usePaymentDetails();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);

	useEffect(() => {
		update({ type: 'creditCard' });
	}, []);

	const onSuccess = () => {
		const validation = validateCreditCard(details.selected);
		setShowValidation(true);
		if (validation.valid) {
			addCard();
			props.navigation.navigate('BuyTransactionComplete', { added: details.amount });
		}
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
						<Text style={modalBaseHeader}>Your credit card details</Text>
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
					onPress={onSuccess}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

const TransactionCreditCard = (props: TransactionCreditCardProps) => {
	const navigation = useNavigation();
	return <TransactionCreditCardView {...props} navigation={navigation} />;
}
export default TransactionCreditCard