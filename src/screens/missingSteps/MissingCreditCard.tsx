import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { usePaymentDetails } from "src/hooks";
import { BackBtn, Button, CancelBtn, CreditCardForm, ModalHeader } from "src/shared/uielements";
import { MODAL_SCREEN_OFFSET } from "src/shared/uielements/Modal";
import { colors } from "src/theme/colors";
import { baseHeader, modalViewBase, wrappingContainerBase } from "src/theme/elements";
import { validateCreditCard } from "src/utils/validation";

type MissingCreditCardProps = {
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

const MissingCreditCard = (props: MissingCreditCardProps) => {
	const { details, update, addCard } = usePaymentDetails();
	const [goNext, setGoNext] = useState(false);
	const navigation = useNavigation();
	const [showValidation, setShowValidation] = useState(false);
	const { cardId, onClose } = props.route.params;

	useEffect(() => {
		update({ type: 'creditCard' });
	}, []);

	const onSuccess = () => {
		const validation = validateCreditCard(details.selected);
		setShowValidation(true);
		if (validation.valid) {
			if (!cardId) {
				addCard()
			}
			navigation.navigate('MissingAddCashResult');
		}
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={onClose} />}
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<View style={ baseHeader }>
						<Text h1>Credit card details</Text>
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
						navigation.navigate('MissingConfirmPin', { onSuccess })
					}}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

export default MissingCreditCard