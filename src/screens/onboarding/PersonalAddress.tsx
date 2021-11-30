import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
	SafeAreaView
} from "react-native";
import { Text } from "react-native-elements";
import { UserContext, AuthContext } from "src/contexts";
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
import { UserAPI } from "src/api";
import { IDBUser } from "@humanity.cash/types";
import { isSuccessResponse} from "src/utils/http";
import { NavigationViewContext, ViewState } from "src/contexts/navigation";
import DataLoading from 'src/screens/loadings/DataLoading';

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
		marginHorizontal: 20,
		marginBottom: 20,
	},
});

const PersonalAddress = (): React.ReactElement => {
	const { user, updateUserData, updateUserType } = useContext(UserContext);
	const customer = user?.customer;
	const [goNext, setGoNext] = useState<boolean>(false);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const { signOut, userEmail } = useContext(AuthContext);
	const { updateSelectedView } = useContext(NavigationViewContext);
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
		if (!user || !user?.customer) return
		setIsLoading(true)
		user.email = userEmail;
		user.customer.avatar = "hee";
		const response = await UserAPI.createCustomer(user);
		if (isSuccessResponse(response)) {
			const newUser: IDBUser = response?.data
			updateUserData(newUser);
			updateUserType(UserType.Customer, newUser.email);
			updateSelectedView(ViewState.CustomerLinkBank);
		}
		setIsLoading(false)
	};

	return (
		<View style={viewBase}>
			<DataLoading visible={isLoading} />
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
				<SafeAreaView style={styles.bottomView}>
					<Button
						type={BUTTON_TYPES.DARK_GREEN}
						title={Translation.BUTTON.NEXT}
						disabled={!goNext}
						onPress={onNextPress}
					/>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default PersonalAddress;