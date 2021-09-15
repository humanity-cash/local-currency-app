import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { Dropdown } from 'react-native-material-dropdown';
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
		height: 55,
		justifyContent: 'center',
		backgroundColor: colors.white,
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
	picker: {
		height: 55,
		borderRadius: 3,
		justifyContent: 'center',
		backgroundColor: colors.white
	}
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
			<View style={styles.container}>
				<Text style={styles.bodyText}>
					Where can customers find you?
				</Text>
			</View>
			<Text style={styles.label}>ADDRESS 1</Text>
			<BlockInput
				name="addressLine"
				placeholder="Street number, street name"
				value={buisnessBasicVerification.address1}
				onChange={onValueChange}
				style={props.style}
			/>
			<Text style={styles.label}>ADDRESS 2</Text>
			<BlockInput
				name="addressLine2"
				placeholder="Apt."
				value={buisnessBasicVerification.address2}
				onChange={onValueChange}
				style={props.style}
			/>

			<View style={styles.inlineView}>
				<View style={styles.cityView}>
					<Text style={styles.label}>CITY</Text>
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
						<Dropdown
							value={buisnessBasicVerification.country}
							data={countries}
							selectedItemColor={colors.purple}
							itemColor={colors.greyedPurple}
							textColor={colors.purple}
							itemTextStyle={styles.itemText}
							containerStyle={styles.dropdownContainer}
							inputContainerStyle={styles.dropdownInputContainer}
							onChangeText={(itemValue) => onValueChange("country", itemValue)}
						/> 
					</View>
				</View>
			</View>

			<Text style={styles.label}>POSTAL CODE</Text>
			<BlockInput
				name="zipCode"
				placeholder="00000"
				keyboardType="number-pad"
				value={buisnessBasicVerification.postalCode}
				onChange={onValueChange}
				style={props.style}
			/>

			<Text style={styles.label}>PHONE NUMBER - OPTIONAL</Text>
			<BlockInput
				name="phoneNumber"
				placeholder="+00 0987 6543 21"
				value={buisnessBasicVerification.phoneNumber}
				onChange={onValueChange}
				style={props.style}
			/>
		</View>
  	);
};

export default BusinessAddressForm;