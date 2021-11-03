import { AntDesign } from '@expo/vector-icons';
import React, { ReactElement, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import SelectDropdown from 'react-native-select-dropdown';
import { UserContext } from 'src/api/context';
import { UserType } from "src/auth/types";
import countries from "src/mocks/countries";
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import { IMap } from "src/utils/types";
import BlockInput from "../BlockInput";

interface PersonalAddressProps {
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

const PersonalAddressForm = (props: PersonalAddressProps): ReactElement => {
	const { getCustomerData, updateCustomerData } = useContext(UserContext);
	const customer = getCustomerData();
	const postalCode = customer?.postalCode;
	const city = customer?.city;
	const address1 = customer?.address1;
	const address2 = customer?.address2;

  const onValueChange = (name: string, change: string) => {
    updateCustomerData({
      [name]: change
    });
  };

  return (
		<View>
			<View style={styles.container}>
				<Text style={styles.bodyText}>
					{Translation.PROFILE.PERSIONAL_DETAILS_BODY}
				</Text>
			</View>
			<Text style={styles.label}>{Translation.LABEL.ADDRESS1} *</Text>
			<BlockInput
				name="address1"
				placeholder="Street number, street name"
				value={address1}
				onChange={onValueChange}
				style={props.style}
			/>
			<Text style={styles.label}>{Translation.LABEL.ADDRESS2}</Text>
			<BlockInput
				name="address2"
				placeholder="Apt."
				value={address2}
				onChange={onValueChange}
				style={props.style}
			/>

			<View style={styles.inlineView}>
				<View style={styles.cityView}>
					<Text style={styles.label}>{Translation.LABEL.CITY} *</Text>
					<BlockInput
						name="city"
						placeholder="City"
						value={city}
						onChange={onValueChange}
						style={props.style}
					/>
				</View>
				<View style={styles.stateContent}>
					<Text style={styles.label}>{Translation.LABEL.STATE}</Text>
					<View style={{...styles.stateView, ...props.style}} >
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
								<AntDesign name="down" size={18} color={colors.darkGreen} />
							)}
						/>
					</View>
				</View>
			</View>

			<Text style={styles.label}>{Translation.LABEL.POSTAL_CODE} *</Text>
			<BlockInput
				name="postalCode"
				placeholder="00000"
				keyboardType="number-pad"
				value={postalCode}
				onChange={onValueChange}
				style={props.style}
			/>
		</View>
  );
};

export default PersonalAddressForm;