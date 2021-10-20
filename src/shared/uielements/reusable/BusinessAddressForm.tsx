import { AntDesign } from '@expo/vector-icons';
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import SelectDropdown from 'react-native-select-dropdown';
import { AuthContext } from "src/auth";
import { BusinessBasicVerification } from "src/auth/types";
import { colors } from "src/theme/colors";
import BlockInput from "../BlockInput";
import { IMap } from 'src/utils/types'
import countries from "src/mocks/countries";

interface BusinessAddressProps {
  style?: IMap;
}

const styles = StyleSheet.create({
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
		height: 55,
		justifyContent: 'center',
		backgroundColor: colors.white,
		borderRadius: 3,
		marginTop: 8,
		marginLeft: 4
	},
	pickerText: {
        color: colors.purple
    },
    selectItem: {
        width: '100%',
        height: 55,
        backgroundColor: colors.white,
    },
    dropdownContainer: {marginTop: -22},
});

const BusinessAddressForm = (props: BusinessAddressProps): JSX.Element => {
	const { buisnessBasicVerification, setBuisnessBasicVerification } = useContext(AuthContext);

	const onValueChange = (name: string, change: string) => {
		setBuisnessBasicVerification((pv: BusinessBasicVerification) => ({
			...pv,
			[name]: change,
		}));
	};

  	return (
		<View>
			<Text style={styles.label}>ADDRESS 1 *</Text>
			<BlockInput
				name="address1"
				placeholder="Street number, street name"
				value={buisnessBasicVerification.address1}
				onChange={onValueChange}
				style={props.style}
			/>
			<Text style={styles.label}>ADDRESS 2</Text>
			<BlockInput
				name="address2"
				placeholder="Apt."
				value={buisnessBasicVerification.address2}
				onChange={onValueChange}
				style={props.style}
			/>

			<View style={styles.inlineView}>
				<View style={styles.cityView}>
					<Text style={styles.label}>CITY *</Text>
					<BlockInput
						name="city"
						placeholder="City"
						value={buisnessBasicVerification.city}
						onChange={onValueChange}
						style={props.style}
					/>
				</View>
				<View style={styles.stateContent}>
					<Text style={styles.label}>STATE</Text>
					<View style={styles.stateView}>
						<SelectDropdown
							data={countries}
							defaultValueByIndex={0}
							onSelect={(selectedItem) => {
								onValueChange("country", selectedItem)
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
								<AntDesign name="down" size={18} color={colors.purple} />
							)}
						/>
					</View>
				</View>
			</View>

			<Text style={styles.label}>POSTAL CODE *</Text>
			<BlockInput
				name="postalCode"
				placeholder="00000"
				keyboardType="number-pad"
				value={buisnessBasicVerification.postalCode}
				onChange={onValueChange}
				style={props.style}
			/>

			<Text style={styles.label}>PHONE NUMBER - OPTIONAL</Text>
			<BlockInput
				name="phoneNumber"
				placeholder="000987654321"
				keyboardType="number-pad"
				value={buisnessBasicVerification.phoneNumber}
				onChange={onValueChange}
				style={props.style}
			/>
		</View>
  	);
};

export default BusinessAddressForm;