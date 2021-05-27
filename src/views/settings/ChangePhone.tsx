import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../uielements/Button'
import { BlockInput } from '../../uielements/BlockInput'
import { useUserDetails } from "../../hooks/useUserDetails";
import { modalBaseHeader, viewBase, wrappingContainerBase } from "../../theme/elements";
import { ModalHeader } from "../../uielements/header/ModalHeader";
import { CancelBtn } from "../../uielements/header/CancelBtn";
import { MODAL_SCREEN_OFFSET } from "../../uielements/Modal";
import { SelectionProps, SelectModal } from "../../uielements/SelectModal";
import phoneCountries from "../../mocks/phoneCountries";

interface ChangePhoneState {
	phoneCountry: string,
	phoneNumber: string
}

type ChangePhoneProps = {
	navigation?: any
	route?: any
}

const styles = StyleSheet.create({
	modalHeader: {
		fontFamily: 'IBMPlexSansSemiBold',
		fontSize: 20,
		paddingBottom: 10
	},
	codeView: {
		flex: 1,
		paddingTop: 30,
	},
});

const MAIN_COUNTRY = 'swiss';
const MAIN_PHONE_COUNTRY = '+41';

const ChangePhone = (props: ChangePhoneProps) => {
	const navigation = useNavigation();
	const { personalDetails, updatePersonalDetails } = useUserDetails();
	const [state, setState] = useState<ChangePhoneState>({
		phoneCountry: '',
		phoneNumber: ''
	});
	const [goNext, setGoNext] = useState(false);

	useEffect(() => {
		// @ts-ignore
		setGoNext(Object.keys(state).every((key) => state[key] !== ''));
	}, [state]);

	useEffect(() => {
		setState({
			phoneCountry: personalDetails.phoneCountry,
			phoneNumber: personalDetails.phoneNumber
		});
	}, [personalDetails]);

	const onValueChange = (name: any, change: any) => {
		setState({
			...state,
			[name]: change
		} as any)
	}

	return (
		<View style={viewBase}>
			<ModalHeader
				rightComponent={<CancelBtn onClick={props.route.params.onClose} />}
			/>

			<ScrollView style={wrappingContainerBase}>
				<View style={{ paddingBottom: 40 }}>
					<Text style={modalBaseHeader}>Edit your phone number</Text>
					<View style={styles.codeView}>
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
					</View>
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
					onPress={() => {
						navigation.navigate('ChangePhoneVerification', {
							phoneNumber: state.phoneNumber,
							phoneCountry: state.phoneCountry
						});
					}}
				/>
			</KeyboardAvoidingView>
		</View>
	);
}

export default ChangePhone