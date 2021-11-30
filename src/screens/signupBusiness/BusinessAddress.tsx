import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, SafeAreaView, Platform } from "react-native";
import { Text } from "react-native-elements";
import { UserContext, AuthContext } from "src/contexts";
import {
	BackBtn,
	BusinessAddressForm, Button,
	CancelBtn, Header
} from "src/shared/uielements";
import { colors } from "src/theme/colors";
import {
	underlineHeaderB,
	viewBaseB,
	wrappingContainerBase
} from "src/theme/elements";
import Translation from "src/translation/en.json";
import { UserAPI } from "src/api";
import { UserType } from "src/auth/types";
import { IDBUser } from "@humanity.cash/types";
import { isSuccessResponse } from "src/utils/http";
import { NavigationViewContext, ViewState } from "src/contexts/navigation";
import DataLoading from 'src/screens/loadings/DataLoading';

const styles = StyleSheet.create({
	headerText: {
		fontSize: 32,
		lineHeight: 32,
		color: colors.purple,
	},
	bodyView: {
		paddingTop: 50,
		paddingHorizontal: 17,
	},
	bodyText: {
		color: colors.bodyText,
		marginBottom: 20
	},
	label: {
		marginTop: 30,
		color: colors.bodyText,
		fontSize: 10,
	},
	input: {
		color: colors.purple,
		backgroundColor: colors.white,
	},
	formView: {
		paddingBottom: 120,
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20,
	},
});

const BusinessAddress = (): ReactElement => {
	const [goNext, setGoNext] = useState<boolean>(false);
	const {
		signOut,
		userEmail,
	} = useContext(AuthContext);
	const navigation = useNavigation();
	const { user, updateUserData, updateUserType } = useContext(UserContext);
	const business = user?.business;
	const [ isLoading, setIsLoading ] = useState<boolean>(false);
	const address1 = business?.address1;
	const city = business?.city;
	const postalCode = business?.postalCode;
	const { updateSelectedView } = useContext(NavigationViewContext);

	useEffect(() => {
		const allInputsFilled =
			address1 !== ""
			&& city !== ""
			&& postalCode !== ""
		setGoNext(allInputsFilled);
	}, [address1, city, postalCode]);

	const onNextPress = async () => {
		if (!user) return
		setIsLoading(true);
		user.email = userEmail;
		const response = await UserAPI.createBusiness(user);
		if (isSuccessResponse(response)) {
			const newUser: IDBUser = response?.data
			updateUserData(newUser);
			updateUserType(UserType.Business, newUser.email);
			updateSelectedView(ViewState.BusinessLinkBank);
		}
		setIsLoading(false);
	};

	return (
		<View style={viewBaseB}>
			<DataLoading visible={isLoading} />
			<Header
				leftComponent={
					<BackBtn
						color={colors.purple}
						onClick={() => navigation.goBack()}
					/>
				}
				rightComponent={
					<CancelBtn
						color={colors.purple}
						text={Translation.BUTTON.LOGOUT}
						onClick={signOut}
					/>
				}
			/>
			<View style={wrappingContainerBase}>
				<View style={underlineHeaderB}>
					<Text style={styles.headerText}>
						{Translation.PROFILE.BUSINESS_INFORMATION}
					</Text>
				</View>
				<ScrollView>
					<View style={styles.formView}>
						<Text style={styles.bodyText}>
							Where can customers find you?
						</Text>
						<BusinessAddressForm style={styles.input} />
					</View>
				</ScrollView>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}>
				<SafeAreaView style={styles.bottomView}>
					<Button
						type="purple"
						title={Translation.BUTTON.NEXT}
						disabled={!goNext}
						onPress={onNextPress}
					/>
				</SafeAreaView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default BusinessAddress;
