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
import { UserContext } from "src/api/context";
import { AuthContext } from "src/auth";
import { UserType } from "src/auth/types";
import { BUTTON_TYPES } from "src/constants";
import {
	BackBtn,
	Button,
	CancelBtn,
	Header,
	PersonalAddressForm
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

const PersonalAddress = () => {
	const { getCustomerData, createCustomer } = useContext(UserContext);
	const customer = getCustomerData();
	const [goNext, setGoNext] = useState<boolean>(false);
	const { signOut } = useContext(AuthContext);
	const navigation = useNavigation();
	const address1 = customer?.address1;
	const city = customer?.city;
	const postalCode = customer?.postalCode;
	useEffect(() => {
		setGoNext(
			address1 !== "" && 
			city !== "" && 
			postalCode !== ""
		);
	}, [address1,city, postalCode]);

	const onNextPress = async () => {
		createCustomer()
	}

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
						<PersonalAddressForm userType={UserType.Customer} />
					</View>
				</ScrollView>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<View style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={Translation.BUTTON.NEXT}
						disabled={!goNext}
						onPress={onNextPress}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default PersonalAddress;

			// const request: IUserRequest = {
			// 	firstName: customer.firstName,
			// 	lastName: customer.lastName,
			// 	email: signInDetails.email,
			// 	address1: customer.address1,
			// 	address2: customer.address2,
			// 	city: customer.city,
			// 	state: customer.state,
			// 	postalCode: customer.postalCode,
			// };

		// 	dispatch(updateLoadingStatus({
		// 		isLoading: true,
		// 		screen: LoadingScreenTypes.LOADING_DATA
		// 	}));
		// 	const resApi = await UserAPI.user(request);
		// 	if (resApi.data) {
		// 		await completeCustomerDwollaInfo({
		// 			dwollaId: resApi.data.userId,
		// 			resourceUri: ""
		// 		});

		// 		navigation.navigate(Routes.LINK_BANK_ACCOUNT);
		// 	}

		// 	dispatch(updateLoadingStatus({
		// 		isLoading: false,
		// 		screen: LoadingScreenTypes.LOADING_DATA
		// 	}));
		// } else {
		// 	showToast(ToastType.ERROR, "Whooops, something went wrong.", "Connection failed.");
		// }
		// const response = await completeCustomerBasicVerification();