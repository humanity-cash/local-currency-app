import React from 'react';
import { SelectionProps, SelectModal } from "../../../uielements/SelectModal";
import {
  View,
} from "react-native";
import Input from '../Input'
import phoneCountries from "../../../mocks/phoneCountries";

interface PhoneNumberInputProps {
	phoneNumber: number
	onPhoneNumberChange: (p: number) => void
};

const MAIN_PHONE_COUNTRY = "01";
const PhoneNumberInput = (props: PhoneNumberInputProps) => {

	const { phoneNumber, onPhoneNumberChange } = props;
	return (
		<View
		style={{
			flexDirection: "row",
		}}
	>
			<SelectModal
			name="phoneCountry"
			value={'01'}
			style={{ width: 126 }}
			onChange={() => {console.log('changed')}}
			modalHeader="Select your phone directive"
			modalMainOption={phoneCountries.find(
				(country: SelectionProps) => country.value === MAIN_PHONE_COUNTRY
			)}
			modalList={phoneCountries.filter(
				(country: SelectionProps) => country.value !== MAIN_PHONE_COUNTRY
			)}
			modalListLabel="other"
		/>
				<Input
				style={{ marginLeft: 5, flex: 1 }}
				placeholder="12345678"
				keyboardType="number-pad"
				name="phoneNumber"
				value={phoneNumber}
				onChange={onPhoneNumberChange}
			/>
				</View>
	)
}

export default PhoneNumberInput;
