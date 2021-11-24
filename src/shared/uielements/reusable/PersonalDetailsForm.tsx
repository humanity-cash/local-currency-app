import React, { ReactElement, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { UserContext } from "src/contexts";
import { colors } from "src/theme/colors";
import Translation from "src/translation/en.json";
import BlockInput from "../BlockInput";

interface PersonalDetailsProps {
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
});

const BasicInputWithLabel = ({
	inputStyle,
	labelStyle,
	label,
	onInputChange,
	inputValue,
	placeHolder,
	name,
}: any) => {
	return (
		<>
			<Text style={labelStyle}>{label}</Text>
			<BlockInput
				name={name}
				placeholder={placeHolder}
				value={inputValue}
				onChange={onInputChange}
				style={inputStyle}
			/>
		</>
	);
};

const Header = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.bodyText}>
				{Translation.PROFILE.PERSIONAL_DETAILS_BODY}
			</Text>
		</View>
	);
};

export const BusinessOwnerDetailsForm = (
	props: PersonalDetailsProps
): ReactElement => {
	const { getBusinessData, updateBusinessData } = useContext(UserContext);
	const business = getBusinessData()
	const onValueChange = (name: string, change: string) => {
		updateBusinessData({
			owner: { change },
		});
	};

	return (
		<View>
			<Header />
			<BasicInputWithLabel
				labelStyle={styles.label}
				inputStyle={props.style}
				label={Translation.LABEL.FIRST_NAME}
				name="firstName"
				placeHolder="First Name"
				value={business?.owner.firstName}
				onInputChange={onValueChange}
			/>
			<BasicInputWithLabel
				labelStyle={styles.label}
				inputStyle={props.style}
				label={Translation.LABEL.LAST_NAME}
				name="lastName"
				placeHolder="Last Name"
				value={business?.owner.lastName}
				onInputChange={onValueChange}
			/>
		</View>
	);
};

const PersonalDetailsForm = (props: PersonalDetailsProps): ReactElement => {
	const { getCustomerData, updateCustomerData } = useContext(UserContext);
	const customer = getCustomerData();
	const firstName = customer?.firstName;
	const lastName = customer?.lastName;

	const onValueChange = (name: string, change: string) => {
		updateCustomerData({
			[name]: change
		});
	};

	return (
		<View>
			<Header />
			<BasicInputWithLabel
				labelStyle={styles.label}
				inputStyle={props.style}
				label={Translation.LABEL.FIRST_NAME}
				name="firstName"
				placeHolder="First Name"
				inputValue={firstName}
				onInputChange={onValueChange}
			/>
			<BasicInputWithLabel
				labelStyle={styles.label}
				inputStyle={props.style}
				label={Translation.LABEL.LAST_NAME}
				name="lastName"
				placeHolder="Last Name"
				inputValue={lastName}
				onInputChange={onValueChange}
			/>
		</View>
	);
};

export default PersonalDetailsForm;
