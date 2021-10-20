import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View
} from "react-native";
import { Text } from "react-native-elements";
import { UserType } from "src/auth/types";
import { AuthContext } from "src/auth";
import { BUTTON_TYPES } from "src/constants";
import * as Routes from "src/navigation/constants";
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
import { UserAPI } from 'src/api';
import { IUserRequest } from 'src/api/types';
import { ToastType, LoadingScreenTypes } from 'src/utils/types';
import { showToast } from 'src/utils/common';
import { updateLoadingStatus } from 'src/store/loading/loading.actions';
import { useDispatch } from 'react-redux';

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

const PersonalAddress = (): React.ReactElement => {
	const { customerBasicVerificationDetails, 
		completeCustomerBasicVerification, 
		signOut, 
		cognitoId, 
		completeCustomerDwollaInfo,
		signInDetails
	} = useContext(AuthContext);
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const onNextPress = async () => {
		const response = await completeCustomerBasicVerification();
		if (response.success && cognitoId && signInDetails) {
			const request: IUserRequest = {
				firstName: customerBasicVerificationDetails.firstName,
				lastName: customerBasicVerificationDetails.lastName,
				email: signInDetails.email,
				address1: customerBasicVerificationDetails.address1,
				address2: customerBasicVerificationDetails.address2,
				city: customerBasicVerificationDetails.city,
				state: customerBasicVerificationDetails.state,
				postalCode: customerBasicVerificationDetails.postalCode,
				authUserId: "p_" + cognitoId
			};

			dispatch(updateLoadingStatus({
				isLoading: true,
				screen: LoadingScreenTypes.LOADING_DATA
			}));
			const resApi = await UserAPI.user(request);
			if (resApi.data) {
				await completeCustomerDwollaInfo({
					dwollaId: resApi.data.userId,
					resourceUri: ""
				});

				navigation.navigate(Routes.LINK_BANK_ACCOUNT);
			}

			dispatch(updateLoadingStatus({
				isLoading: false,
				screen: LoadingScreenTypes.LOADING_DATA
			}));
		} else {
			showToast(ToastType.ERROR, "Whooops, something went wrong.", "Connection failed.");
		}
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
						disabled={false}
						onPress={onNextPress}
					/>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

export default PersonalAddress;
