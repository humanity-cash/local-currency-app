import { AntDesign } from '@expo/vector-icons';
import React, { ReactElement, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { BusinessBasicVerification } from "src/auth/types";
import { AuthContext } from "src/auth";
import countries from "src/mocks/countries";
import SelectDropdown from 'react-native-select-dropdown';
import { colors } from "src/theme/colors";
import Translation from "src/translation/en.json";
import BlockInput from "../BlockInput";
import { IMap } from "src/utils/types";

interface BusinessOwnerAddressFormProps {
	style?: IMap;
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
			owner: { ...pv.owner, [name]: change },
		}));
	};

	return (
		<View>
			<View style={styles.container}>
				<Text style={styles.bodyText}>
					{Translation.PROFILE.CLIENT_DETAILS_BODY}
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
			<Text style={styles.label}>{Translation.LABEL.ADDRESS2}</Text>
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
				<View style={styles.stateContent}>
					<Text style={styles.label}>{Translation.LABEL.STATE}</Text>
					<View style={styles.stateView} >
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
