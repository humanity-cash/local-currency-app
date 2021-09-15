import React, { ReactElement, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from "../../../auth";
import { BusinessBasicVerification } from "src/auth/types";
import { colors } from "../../../theme/colors";
import Translation from "../../../translation/en.json";
import BlockInput from "../BlockInput";
import { IMap } from "src/utils/types";

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

	const onValueChange = (name: string, change: string) => {
		setBuisnessBasicVerification((pv: BusinessBasicVerification) => ({
			...pv,
			owner: { ...pv.owner, [name]: change },
		}));
	};

	const FirstNameInput = () => {
		return (
			<>
				<BasicInputWithLabel
					labelStyle={styles.label}
					inputStyle={props.style}
					label={Translation.LABEL.FIRST_NAME}
					name="firstName"
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
					name="lastName"
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
