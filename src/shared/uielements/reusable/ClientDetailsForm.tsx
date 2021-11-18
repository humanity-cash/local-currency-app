import React, { ReactElement, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { BusinessBasicVerification } from "src/auth/types";
import { AuthContext } from "src/auth";
import { colors } from "src/theme/colors";
import Translation from "src/translation/en.json";
import BlockInput from "../BlockInput";

interface ClientDetailsProps {
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
				{Translation.PROFILE.CLIENT_DETAILS_BODY}
			</Text>
		</View>
	);
};

export const BusinessOwnerDetailsForm = (
	props: ClientDetailsProps
): ReactElement => {
	const { buisnessBasicVerification, setBuisnessBasicVerification } =
		useContext(AuthContext);

	const onValueChange = (name: string, change: string) => {
		setBuisnessBasicVerification((pv: BusinessBasicVerification) => ({
			...pv,
			owner: { ...pv.owner, change },
		}));
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
				value={buisnessBasicVerification.owner.firstName}
				onInputChange={onValueChange}
			/>
			<BasicInputWithLabel
				labelStyle={styles.label}
				inputStyle={props.style}
				label={Translation.LABEL.LAST_NAME}
				name="lastName"
				placeHolder="Last Name"
				value={buisnessBasicVerification.owner.lastName}
				onInputChange={onValueChange}
			/>
		</View>
	);
};

const ClientDetailsForm = (props: ClientDetailsProps): ReactElement => {
	const {
		customerBasicVerificationDetails,
		setCustomerBasicVerificationDetails,
	} = useContext(AuthContext);

	const onValueChange = (name: string, change: string) => {
		setCustomerBasicVerificationDetails((pv: any) => ({
			...pv,
			[name]: change,
		}));
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
				inputValue={customerBasicVerificationDetails.firstName}
				onInputChange={onValueChange}
			/>
			<BasicInputWithLabel
				labelStyle={styles.label}
				inputStyle={props.style}
				label={Translation.LABEL.LAST_NAME}
				name="lastName"
				placeHolder="Last Name"
				inputValue={customerBasicVerificationDetails.lastName}
				onInputChange={onValueChange}
			/>
		</View>
	);
};

export default ClientDetailsForm;
