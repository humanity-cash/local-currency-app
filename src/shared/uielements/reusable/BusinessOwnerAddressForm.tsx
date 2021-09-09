import React, { ReactElement, useContext } from "react";
import { Picker, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { BusinessBasicVerification } from "src/auth/types";
import { AuthContext } from "src/auth";
import countries from "src/mocks/countries";
import { colors } from "src/theme/colors";
import Translation from "src/translation/en.json";
import BlockInput from "../BlockInput";

interface BusinessOwnerAddressFormProps {
	style?: any;
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
	},
	bodyText: {
		color: colors.bodyText,
	},
	label: {
		color: colors.bodyText,
		fontSize: 10,
	},
	errorLabel: {
		color: colors.bodyText,
		fontSize: 10,
		marginTop: 5,
	},
	inlineView: {
		flex: 1,
		flexDirection: "row",
	},
	cityView: {
		width: "70%",
	},
	stateView: {
		width: "30%",
	},
	picker: {
		height: 55,
		borderRadius: 3,
		marginTop: 8,
		marginLeft: 5,
		color: colors.purple,
		backgroundColor: colors.white,
	},
});

const BusinessOwnerAddressForm = (
	props: BusinessOwnerAddressFormProps
): ReactElement => {
	const {
		buisnessBasicVerification,
		setBuisnessBasicVerification
	} = useContext(AuthContext);

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
					{Translation.PROFILE.PERSIONAL_DETAILS_BODY}
				</Text>
			</View>
			<Text style={styles.label}>{Translation.LABEL.ADDRESS1}</Text>
			<BlockInput
				name="address1"
				placeholder="Street number, street name"
				value={buisnessBasicVerification?.owner?.address1}
				onChange={onValueChange}
				style={props.style}
			/>
			<BlockInput
				name="address2"
				placeholder="Apt."
				value={buisnessBasicVerification?.owner?.address2}
				onChange={onValueChange}
				style={props.style}
			/>

			<View style={styles.inlineView}>
				<View style={styles.cityView}>
					<Text style={styles.label}>{Translation.LABEL.CITY}</Text>
					<BlockInput
						name="city"
						placeholder="City"
						value={buisnessBasicVerification?.owner?.city}
						onChange={onValueChange}
						style={props.style}
					/>
				</View>
				<View style={styles.stateView}>
					<Text style={styles.label}>{Translation.LABEL.STATE}</Text>
					<Picker
						selectedValue={buisnessBasicVerification?.owner?.state}
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

			<Text style={styles.label}>{Translation.LABEL.POSTAL_CODE}</Text>
			<BlockInput
				name="postalCode"
				placeholder="00000"
				keyboardType="number-pad"
				value={buisnessBasicVerification?.owner?.postalCode}
				onChange={onValueChange}
				style={props.style}
			/>
		</View>
	);
};

export default BusinessOwnerAddressForm;
