import React, { ReactElement, useContext, createRef } from "react";
import { StyleSheet, View, TextInput } from 'react-native';
import { Text } from "react-native-elements";
import { UserContext } from "src/contexts";
import { IMap } from "src/utils/types";
import { colors } from "../../../theme/colors";
import Translation from "../../../translation/en.json";
import BlockInput from "../BlockInput";

interface PersonalDetailsProps {
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

const BasicInputWithLabel = ({
	inputStyle,
	labelStyle,
	label,
	onInputChange,
	inputValue,
	placeHolder,
	name,
	inputRef,
	returnKeyType,
	onSubmitEditing
}: any) => {
	return (
		<>
			<Text style={labelStyle}>{label}</Text>
			<BlockInput
				inputRef={inputRef}
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
				{Translation.PROFILE.PERSIONAL_DETAILS_BODY}
			</Text>
		</View>
	);
};

const BusinessOwnerDetailsForm = (
	props: PersonalDetailsProps
): ReactElement => {
	const { user, updateBusinessData } = useContext(UserContext)

	const lastNameRef = createRef<TextInput>()
	const business = user?.business;

	const onValueChange = (name: string, change: string) => {
		updateBusinessData({
			...business,
			owner: { ...business?.owner, [name]: change },
		});
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
				inputValue={business?.owner?.firstName}
				onInputChange={onValueChange}
				returnKeyType='next'
				onSubmitEditing={() => {lastNameRef.current?.focus()}}
			/>
			<BasicInputWithLabel
				inputRef={lastNameRef}
				labelStyle={styles.label}
				inputStyle={props.style}
				label={Translation.LABEL.LAST_NAME_BUSINESS}
				name="lastName"
				placeHolder="Last Name"
				inputValue={business?.owner?.lastName}
				onInputChange={onValueChange}
			/>
		</View>
	);
};

export default BusinessOwnerDetailsForm;
