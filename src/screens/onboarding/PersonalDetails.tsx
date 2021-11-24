import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View
} from "react-native";
import { Text } from "react-native-elements";
import { UserContext, AuthContext } from "src/contexts";
import * as Routes from "src/navigation/constants";
import {
	BackBtn,
	Button,
	CancelBtn,
	Header,
	PersonalDetailsForm
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
	underlineHeader,
	viewBase,
	wrappingContainerBase
} from "src/theme/elements";
import Translation from "src/translation/en.json";

const styles = StyleSheet.create({
	content: {
		paddingBottom: 40,
	},
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35,
	},
	bottomView: {
		paddingHorizontal: 20,
		paddingBottom: 50,
	},
});

const PersonalDetails = (): JSX.Element => {
	const { getCustomerData } = useContext(UserContext);
	const customer = getCustomerData();
	const { signOut } = useContext(AuthContext);
	const [goNext, setGoNext] = useState<boolean>(false);
	const navigation = useNavigation();
	const firstName = customer?.firstName;
	const lastName = customer?.lastName;

	useEffect(() => {
		setGoNext(firstName !== "" && lastName !== "");
	}, [firstName, lastName]);

	const onNextPress = () => {
		navigation.navigate(Routes.PERSONAL_ADDRESS);
	};

	return (
		<View style={viewBase}>
			<Header
				leftComponent={<BackBtn onClick={() => navigation.goBack()} />}
				rightComponent={
					<CancelBtn
						text={Translation.BUTTON.LOGOUT}
						onClick={signOut}
					/>
				}
			/>

			<View style={wrappingContainerBase}>
				<View style={underlineHeader}>
					<Text style={styles.headerText}>
						{Translation.PROFILE.PERSIONAL_DETAILS}
					</Text>
				</View>
				<ScrollView>
					<View style={styles.content}>
						<PersonalDetailsForm />
					</View>
				</ScrollView>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<View style={styles.bottomView}>
					<Button
						type="darkGreen"
						title={Translation.BUTTON.NEXT}
						disabled={!goNext}
						onPress={onNextPress}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default PersonalDetails;
