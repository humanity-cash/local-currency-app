import React, { ReactElement, useContext, RefObject, createRef } from "react";
import { StyleSheet, View, TextInput, ReturnKeyTypeOptions } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "../../../auth";
import { BusinessBasicVerification } from "src/auth/types";
import { colors } from "../../../theme/colors";
import Translation from "../../../translation/en.json";
import BlockInput from "../BlockInput";
import { IMap } from "src/utils/types";

interface ClientDetailsProps {
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
				returnKeyType={returnKeyType}
				onSubmitEditing={onSubmitEditing}
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

const BusinessOwnerDetailsForm = (
	props: ClientDetailsProps
): ReactElement => {
	const { buisnessBasicVerification, setBuisnessBasicVerification } =
		useContext(AuthContext);
	const lastNameReff: RefObject<TextInput> = createRef()

	const onValueChange = (name: string, change: string) => {
		setBuisnessBasicVerification((pv: BusinessBasicVerification) => ({
			...pv,
			owner: { ...pv.owner, [name]: change },
		}));
	};

	return (
		<View>
			<Header />
			<BasicInputWithLabel
				labelStyle={styles.label}
				inputStyle={props.style}
				label={Translation.LABEL.FIRST_NAME_BUSINESS}
				name="firstName"
				placeHolder="First Name"
				inputValue={buisnessBasicVerification.owner.firstName}
				onInputChange={onValueChange}
				returnKeyType='next'
				onSubmitEditing={() => {
					lastNameReff.current?.focus()
				}}
			/>
			<BasicInputWithLabel
				reff={lastNameReff}
				labelStyle={styles.label}
				inputStyle={props.style}
				label={Translation.LABEL.LAST_NAME_BUSINESS}
				name="lastName"
				placeHolder="Last Name"
				inputValue={buisnessBasicVerification.owner.lastName}
				onInputChange={onValueChange}
			/>
		</View>
	);
};

export default BusinessOwnerDetailsForm;
