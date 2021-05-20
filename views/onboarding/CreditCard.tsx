import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, ScrollView, View } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../uielements/Button';
import { Header } from "../../uielements/header/Header";
import { baseHeader, viewBase, wrappingContainerBase } from "../../theme/elements";
import { BackBtn } from "../../uielements/header/BackBtn";
import { NextBtn } from "../../uielements/header/NextBtn";
import { colors } from "../../theme/colors";
import { usePaymentDetails } from "../../hooks/usePaymentDetails";
import { AntDesign } from "@expo/vector-icons";
import { CreditCardForm } from "../../uielements/reusable/CreditCardForm";
import { validateCreditCard } from "../../utils/validation";

type CreditCardProps = {
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

const CreditCardView = (props: CreditCardProps) => {
	const { details, update } = usePaymentDetails();
	const [goNext, setGoNext] = useState(false);
	const [showValidation, setShowValidation] = useState(false);
	useEffect(() => {
		update({ type: 'creditCard' });
	}, []);

	const onSuccess = () => {
		const validation = validateCreditCard(details.selected);
		setShowValidation(true);
		if (validation.valid) {
			props.navigation.navigate('ConfirmPin', { redirectTo: 'AddCashResult' })
		}
	};

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => props.navigation.goBack()} />}
				rightComponent={<NextBtn text="Skip" onClick={() => props.navigation.navigate('OnboardingSteps', { step: 5 })} />}
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

const CreditCard = (props: CreditCardProps) => {
	const navigation = useNavigation();
	return <CreditCardView {...props} navigation={navigation} />;
}
export default CreditCard