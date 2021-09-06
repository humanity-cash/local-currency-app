import React, { useContext } from "react";
import { View, StyleSheet, Picker } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "src/auth";
import countries from "src/mocks/countries";
import { colors } from "src/theme/colors";
import BlockInput from "../BlockInput";

interface BusinessAddressProps {
  style?: any;
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
  stateView: {
    width: '30%'
  },
  picker: {
		height: 55,
		borderRadius: 3,
    marginTop: 8,
    marginLeft: 5,
		color: colors.purple,
		backgroundColor: colors.white
	}
});

const BusinessAddressForm = (props: BusinessAddressProps) => {
  const { buisnessBasicVerification, setBuisnessBasicVerification } = useContext(AuthContext);
  console.log("🚀 ~ file: BusinessAddressForm.tsx ~ line 51 ~ BusinessAddressForm ~ buisnessBasicVerification", buisnessBasicVerification)

  const onValueChange = (name: any, change: any) => {
    // setBuisnessBasicVerification({ [name]: change });
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
				<View style={styles.stateView}>
					<Text style={styles.label}>STATE</Text>
					<Picker
						value={buisnessBasicVerification.country}
						style={styles.picker}
						onValueChange={(itemValue) =>
							onValueChange("country", itemValue)
						}>
						{countries.map((country: string, idx: number) => (
							<Picker.Item
								label={country}
								value={country}
								key={idx}
							/>
						))}
					</Picker>
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