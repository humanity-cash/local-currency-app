import React, { useEffect, useState } from 'react';
import { useUserDetails } from "../../hooks/useUserDetails";
import { validateAddressForm } from "../../utils/validation";
import { PersonalAddressErrors } from "../../utils/types";
import { Text } from "react-native-elements";
import { BlockInput } from "../BlockInput";
import { SelectionProps, SelectModal } from "../SelectModal";
import countries from "../../mocks/countries";
import { View } from "react-native";
import { colors } from "../../theme/colors";

const MAIN_COUNTRY = 'swiss';

interface PersonalAddressState {
	addressLine: string;
	addressLine2: string;
	zipCode: string;
	city: string;
	country: string;
}

interface PersonalAddressProps {
	isValid: (valid: boolean) => void,
	showValidation?: boolean
}

export const PersonalAddressForm = (props: PersonalAddressProps) => {
	const { personalDetails, updatePersonalDetails } = useUserDetails();
	const [validationErrors, setValidationErrors] = useState<PersonalAddressErrors>({});
	const [state, setState] = useState<PersonalAddressState>({
		addressLine: '',
		addressLine2: '',
		zipCode: '',
		city: '',
		country: ''
	});
	const { showValidation } = props;

	useEffect(() => {
		const validation = validateAddressForm(personalDetails);
		setValidationErrors(validation.errors);
	}, [personalDetails]);

	useEffect(() => {
		// @ts-ignore
		props.isValid(Object.keys(state).every((key) => state[key] !== '' || key === 'addressLine2'));
	}, [state]);

	useEffect(() => {
		setState({
			addressLine: personalDetails.addressLine,
			addressLine2: personalDetails.addressLine2,
			zipCode: personalDetails.zipCode,
			city: personalDetails.city,
			country: personalDetails.country
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
		<View>
			<Text h3>Address line 1</Text>
			{showValidation && validationErrors.addressLine && (<Text h3 style={{ marginTop: 5, color: colors.textError}}>{validationErrors.addressLine}</Text>)}
			<BlockInput
				name="addressLine"
				placeholder="Address line 1"
				value={state.addressLine}
				onChange={onValueChange}
			/>
			<Text h3>Address line 2</Text>
			{showValidation && validationErrors.addressLine2 && (<Text h3 style={{ marginTop: 5, color: colors.textError}}>{validationErrors.addressLine2}</Text>)}
			<BlockInput
				name="addressLine2"
				placeholder="Address line 2"
				value={state.addressLine2}
				onChange={onValueChange}
			/>
			<Text h3>Zip code</Text>
			{showValidation && validationErrors.zipCode && (<Text h3 style={{ marginTop: 5, color: colors.textError}}>{validationErrors.zipCode}</Text>)}
			<BlockInput
				name="zipCode"
				placeholder="Zip code"
				keyboardType="number-pad"
				value={state.zipCode}
				onChange={onValueChange}
			/>
			<Text h3>City</Text>
			{showValidation && validationErrors.city && (<Text h3 style={{ marginTop: 5, color: colors.textError}}>{validationErrors.city}</Text>)}
			<BlockInput
				name="city"
				placeholder="City"
				value={state.city}
				onChange={onValueChange}
			/>
			<Text h3>Country</Text>
			{showValidation && validationErrors.country && (<Text h3 style={{ marginTop: 5, color: colors.textError}}>{validationErrors.country}</Text>)}
			<SelectModal
				name="country"
				value={state.country}
				onChange={onValueChange}
				modalHeader="Select your country"
				modalDescription="Sorry, your country is not supported yet if it is not listed here."
				modalMainOption={countries.find((country: SelectionProps) => country.value === MAIN_COUNTRY)}
				modalList={countries.filter((country: SelectionProps) => country.value !== MAIN_COUNTRY)}
				modalListLabel="other"
			/>
		</View>
	);
}