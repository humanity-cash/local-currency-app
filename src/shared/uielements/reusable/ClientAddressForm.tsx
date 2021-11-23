import { AntDesign } from '@expo/vector-icons';
import React, { ReactElement, useContext, RefObject, createRef } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/auth";
import SelectDropdown from 'react-native-select-dropdown';
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import BlockInput from "../BlockInput";
import { IMap } from "src/utils/types";
import { UserType } from "src/auth/types";
import states from "src/mocks/countries";

interface ClientAddressProps {
	userType: UserType,
  	style?: IMap;
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20
	},
	bodyText: {
		color: colors.bodyText
	},
	label: {
		color: colors.bodyText,
		fontSize: 10
	},
	errorLabel: {
		color: colors.bodyText,
		fontSize: 10,
		marginTop: 5
	},
	inlineView: {
		flex: 1,
		flexDirection: 'row'
	},
	cityView: {
		width: '70%'
	},
	stateContent: {
		width: '30%'
	},
	stateView: {
		marginTop: 8,
		marginLeft: 5
	},
	pickerText: {
        color: colors.darkGreen
    },
    selectItem: {
        width: '100%',
        height: 55,
        backgroundColor: colors.inputBg,
    },
    dropdownContainer: {marginTop: -20},
});

const ClientAddressForm = (props: ClientAddressProps): ReactElement => {
  	const { customerBasicVerificationDetails, setCustomerBasicVerificationDetails } =
		useContext(AuthContext);
	const address2Ref: RefObject<TextInput> = createRef()
	const cityRef: RefObject<TextInput> = createRef()
	const stateRef: RefObject<SelectDropdown> = createRef()
	const postalCodeRef: RefObject<TextInput> = createRef()

	const onValueChange = (name: string, change: string) => {
		setCustomerBasicVerificationDetails((pv: IMap) => ({
		...pv,
		[name]: change,
		}));
	};

  return (
		<View>
			<View style={styles.container}>
				<Text style={styles.bodyText}>
					{Translation.PROFILE.CLIENT_DETAILS_BODY}
				</Text>
			</View>
			<Text style={styles.label}>{Translation.LABEL.ADDRESS1} *</Text>
			<BlockInput
				name="address1"
				placeholder="Street number, street name"
				value={customerBasicVerificationDetails.address1}
				onChange={onValueChange}
				style={props.style}
				returnKeyType='next'
				onSubmitEditing={() => {
					address2Ref.current?.focus()
				}}
			/>
			<Text style={styles.label}>{Translation.LABEL.ADDRESS2}</Text>
			<BlockInput
				reff={address2Ref}
				name="address2"
				placeholder="Apt."
				value={customerBasicVerificationDetails.address2}
				onChange={onValueChange}
				style={props.style}
				returnKeyType='next'
				onSubmitEditing={() => {
					cityRef.current?.focus()
				}}
			/>

			<View style={styles.inlineView}>
				<View style={styles.cityView}>
					<Text style={styles.label}>{Translation.LABEL.CITY} *</Text>
					<BlockInput
						reff={cityRef}
						name="city"
						placeholder="City"
						value={customerBasicVerificationDetails.city}
						onChange={onValueChange}
						style={props.style}
						returnKeyType='next'
						onSubmitEditing={() => {
							stateRef.current?.openDropdown()
						}}
					/>
				</View>
				<View style={styles.stateContent}>
					<Text style={styles.label}>{Translation.LABEL.STATE}</Text>
					<View style={{...styles.stateView, ...props.style}} >
						<SelectDropdown
							ref={stateRef}
							data={states}
							defaultValueByIndex={0}
							onSelect={(selectedItem) => {
								onValueChange("state", selectedItem)
								postalCodeRef.current?.focus()
							}}
							buttonTextAfterSelection={(selectedItem) => {
								return selectedItem
							}}
							rowTextForSelection={(item) => {
								return item
							}}
							buttonStyle={styles.selectItem}
							buttonTextStyle={styles.pickerText}
							rowStyle={styles.selectItem}
							dropdownStyle={styles.dropdownContainer}
							renderCustomizedRowChild={(item) => (
								<Text style={styles.pickerText}>{item}</Text>
							)}
							renderDropdownIcon={() => (
								<AntDesign name="down" size={18} color={colors.darkGreen} />
							)}
						/>
					</View>
				</View>
			</View>

			<Text style={styles.label}>{Translation.LABEL.POSTAL_CODE} *</Text>
			<BlockInput
				reff={postalCodeRef}
				name="postalCode"
				placeholder="00000"
				keyboardType="number-pad"
				value={customerBasicVerificationDetails.postalCode}
				onChange={onValueChange}
				style={props.style}
			/>
		</View>
  );
};

export default ClientAddressForm;