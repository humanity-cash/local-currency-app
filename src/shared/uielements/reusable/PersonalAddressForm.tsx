import React, { ReactElement, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/auth";
import { Dropdown } from 'react-native-material-dropdown';
import { colors } from "src/theme/colors";
import Translation from 'src/translation/en.json';
import BlockInput from "../BlockInput";
import { IMap } from "src/utils/types";
import { UserType } from "src/auth/types";

interface PersonalAddressProps {
	userType: UserType,
  	style?: IMap;
}

const countries = [
	{ value: 'MA' },
	{ value: 'MA2' }
];

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
		width: '60%'
	},
	stateContent: {
		width: '40%'
	},
	stateView: {
		height: 55,
		justifyContent: 'center',
		backgroundColor: colors.inputBg,
		borderRadius: 3,
		marginTop: 8,
		marginLeft: 4
	},
	itemText: {
		paddingLeft: 10
	},
	dropdownContainer: {
		paddingHorizontal: 10,
		paddingBottom: 15
	},
	dropdownInputContainer: {
		borderBottomColor: 'transparent'
	},
});

const PersonalAddressForm = (props: PersonalAddressProps): ReactElement => {
  const { customerBasicVerificationDetails, setCustomerBasicVerificationDetails } =
		useContext(AuthContext);

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
					{Translation.PROFILE.PERSIONAL_DETAILS_BODY}
				</Text>
			</View>
			<Text style={styles.label}>{Translation.LABEL.ADDRESS1}</Text>
			<BlockInput
				name="address1"
				placeholder="Street number, street name"
				value={customerBasicVerificationDetails.address1}
				onChange={onValueChange}
				style={props.style}
			/>
			<BlockInput
				name="address2"
				placeholder="Apt."
				value={customerBasicVerificationDetails.address2}
				onChange={onValueChange}
				style={props.style}
			/>

			<View style={styles.inlineView}>
				<View style={styles.cityView}>
					<Text style={styles.label}>{Translation.LABEL.CITY}</Text>
					<BlockInput
						name="city"
						placeholder="City"
						value={customerBasicVerificationDetails.city}
						onChange={onValueChange}
						style={props.style}
					/>
				</View>
				<View style={styles.stateContent}>
					<Text style={styles.label}>{Translation.LABEL.STATE}</Text>
					<View style={{...styles.stateView, ...props.style}} >
						<Dropdown
							value={customerBasicVerificationDetails.state}
							data={countries}
							selectedItemColor={props.userType === UserType.Customer ? colors.darkGreen : colors.purple}
							itemColor={props.userType === UserType.Customer ? colors.lightGreen : colors.greyedPurple}
							textColor={props.userType === UserType.Customer ? colors.darkGreen : colors.purple}
							itemTextStyle={styles.itemText}
							containerStyle={styles.dropdownContainer}
							inputContainerStyle={styles.dropdownInputContainer}
							onChangeText={(itemValue) => onValueChange("country", itemValue)}
						/> 
					</View>
				</View>
			</View>

			<Text style={styles.label}>{Translation.LABEL.POSTAL_CODE}</Text>
			<BlockInput
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

export default PersonalAddressForm;