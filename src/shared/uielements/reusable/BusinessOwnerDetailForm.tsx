import React, { ReactElement, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { BusinessBasicVerification } from "../../../auth/types";
import { AuthContext } from "../../../auth";
import { colors } from "../../../theme/colors";
import Translation from "../../../translation/en.json";
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

const BusinessOwnerDetailsForm = (
	props: PersonalDetailsProps
): ReactElement => {
	const { buisnessBasicVerification, setBuisnessBasicVerification } =
		useContext(AuthContext);
  console.log("🚀 ~ file: Bu", buisnessBasicVerification.owner.firstName)

	const onValueChange = (name: string, change: string) => {
		// setBuisnessBasicVerification((pv: BusinessBasicVerification) => ({
		// 	...pv,
		// 	owner: { ...pv.owner, [name]: change },
		// }));
	};

	const FirstNameInput = () => {
		return (
			<>
				<BasicInputWithLabel
					labelStyle={styles.label}
					inputStyle={props.style}
					label={Translation.LABEL.FIRST_NAME}
					name="owner.firstName"
					placeHolder="First Name"
					inputValue={buisnessBasicVerification.owner.firstName}
					onInputChange={onValueChange}
				/>
			</>
		);
	};

	const LastNameInput = () => {
		return (
			<>
				<BasicInputWithLabel
					labelStyle={styles.label}
					inputStyle={props.style}
					label={Translation.LABEL.LAST_NAME}
					name="owner.lastName"
					placeHolder="Last Name"
					inputValue={buisnessBasicVerification.owner.lastName}
					onInputChange={onValueChange}
				/>
			</>
		);
	};

	return (
		<View>
			<Header />
			<FirstNameInput />
			<LastNameInput />
		</View>
	);
};

export default BusinessOwnerDetailsForm;
