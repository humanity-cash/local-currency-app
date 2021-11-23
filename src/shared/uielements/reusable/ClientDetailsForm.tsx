import React, { ReactElement, useContext, RefObject, createRef } from "react";
import { StyleSheet, View, TextInput, ReturnKeyTypeOptions } from "react-native";
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

type BasicInputWithLabelProps = {
	reff?: RefObject<TextInput>
	inputStyle?: any,
	labelStyle?: any,
	label: string,
	onInputChange: any,
	inputValue: any,
	placeHolder?: string,
	name?: string,
	returnKeyType?: ReturnKeyTypeOptions,
	onSubmitEditing?: (()=>void)
}

const BasicInputWithLabel = ({
	reff,
	inputStyle,
	labelStyle,
	label,
	onInputChange,
	inputValue,
	placeHolder,
	name,
	returnKeyType,
	onSubmitEditing
}: BasicInputWithLabelProps) => {
	return (
		<>
			<Text style={labelStyle}>{label}</Text>
			<BlockInput
				reff={reff}
				name={name}
				placeholder={placeHolder}
				value={inputValue}
				onChange={onInputChange}
				style={inputStyle}
				onSubmitEditing={onSubmitEditing}
				returnKeyType={returnKeyType || 'done'}
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
	const lastNameReff: RefObject<TextInput> = createRef()

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
				inputValue={buisnessBasicVerification.owner.firstName}
				onInputChange={onValueChange}
				onSubmitEditing={() => {
					lastNameReff.current?.focus()
				}}
				returnKeyType='next'
			/>
			<BasicInputWithLabel
				reff={lastNameReff}
				labelStyle={styles.label}
				inputStyle={props.style}
				label={Translation.LABEL.LAST_NAME}
				name="lastName"
				placeHolder="Last Name"
				inputValue={buisnessBasicVerification.owner.lastName}
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
	const lastNameReff: RefObject<TextInput> = createRef()

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
				onSubmitEditing={() => {
					lastNameReff.current?.focus()
				}}
				returnKeyType='next'
			/>
			<BasicInputWithLabel
				reff={lastNameReff}
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
