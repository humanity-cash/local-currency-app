import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { modalViewBase, viewBase } from "../../theme/elements";
import { useUserDetails } from "../../hooks/useUserDetails";
import { colors } from "../../theme/colors";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { SelectionProps, SelectModal } from "../../uielements/SelectModal";
import phoneCountries from "../../mocks/phoneCountries";
import { BlockInput } from "../../uielements/BlockInput";
import { Button } from "../../uielements/Button";
import { MODAL_SCREEN_OFFSET } from "../../uielements/Modal";

const MAIN_PHONE_COUNTRY = '+41';

type ForgotPasswordPhoneProps = {
	navigation?: any,
	route?: any
}

type ForgotPasswordPhoneState = {
	phoneNumber: string,
	phoneCountry: string
}

const styles = StyleSheet.create({
	modalHeader: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingBottom: 10
	},
	modalDescription: {
		paddingBottom: 10
	},
	modalMainItemView: {
		flexDirection: "row",
		paddingVertical: 15,
		marginVertical: 10
	},
	modalItemView: {
		flexDirection: "row",
		paddingVertical: 5,
		marginVertical: 5
	},
	flagImage: {
		width: 27,
		height: 23,
		marginRight: 10
	},
	flagNoImage: {
		backgroundColor: colors.text,
		width: 27,
		height: 23,
		marginRight: 10
	},
	bottomNavigation: {
		justifyContent: "center"
	},
	bottomView: {
		height: 60,
		justifyContent: "center",
		alignItems: 'center'
	}
});

const ForgotPasswordPhoneView = (props: ForgotPasswordPhoneProps) => {
	const { personalDetails, updatePersonalDetails } = useUserDetails();
	const [state, setState] = useState<ForgotPasswordPhoneState>({
		phoneNumber: '',
		phoneCountry: ''
	});
	const [goNext, setGoNext] = useState(false);

	useEffect(() => {
		setGoNext(Object.keys(state).every((key) => state[key] !== ''));
	}, [state]);

	useEffect(() => {
		setState({
			phoneNumber: personalDetails.phoneNumber,
			phoneCountry: personalDetails.phoneCountry
		});
	}, [personalDetails]);

	const onValueChange = (name: any, change: any) => {
		setState({
			...state,
			[name]: change
		} as any)
		updatePersonalDetails({ [name]: change });
	}

	return (
		<View style={modalViewBase}>
			<ModalHeader rightComponent={<CancelBtn onClick={props.route.params.onClose} />} />

			<ScrollView style={{ padding: 10 }}>
				<Text h2 style={styles.modalHeader}>Enter phone number</Text>
				<Text style={styles.modalDescription}>Enter phone number of the account you would like to change the passcode of.</Text>
				<Text h3>Phone number</Text>
				<View style={{
					flexDirection: "row",
				}}>
					<SelectModal
						name="phoneCountry"
						value={state.phoneCountry}
						style={{ width: 126 }}
						onChange={onValueChange}
						modalHeader="Select your phone directive"
						modalMainOption={phoneCountries.find((country: SelectionProps) => country.value === MAIN_PHONE_COUNTRY)}
						modalList={phoneCountries.filter((country: SelectionProps) => country.value !== MAIN_PHONE_COUNTRY)}
						modalListLabel="other"
					/>
					<BlockInput
						style={{ marginLeft: 5, flex: 1 }}
						placeholder="12345678"
						keyboardType="number-pad"
						name="phoneNumber"
						value={state.phoneNumber}
						onChange={onValueChange}
					/>
				</View>
			</ScrollView>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
				keyboardVerticalOffset={MODAL_SCREEN_OFFSET}
			>
				<Button
					type="fluidDark"
					title="NEXT"
					disabled={!goNext}
					onPress={() => props.navigation.navigate('ForgotPasswordVerification')}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

const ForgotPasswordPhone = (props: ForgotPasswordPhoneProps) => {
	const navigation = useNavigation();
	return <ForgotPasswordPhoneView navigation={navigation} {...props} />;
}
export default ForgotPasswordPhone