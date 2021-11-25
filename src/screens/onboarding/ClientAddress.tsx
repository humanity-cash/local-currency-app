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
import { UserType } from "src/auth/types";
import { AuthContext } from "src/auth";
import { BUTTON_TYPES } from "src/constants";
import * as Routes from "src/navigation/constants";
import {
	BackBtn,
	Button,
	CancelBtn,
	Header,
	ClientAddressForm
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
import { useDispatch } from 'react-redux';
import countries from 'src/mocks/countries';
import { SafeAreaView } from 'react-native';
import { showLoadingProgress, hideLoadingProgress } from '../../store/loading/loading.actions';
import { DwollaInfo } from '../../auth/types';

const styles = StyleSheet.create({
	content: {
		paddingBottom: 40
	},
	headerText: {
		fontSize: 32,
		color: colors.darkGreen,
		lineHeight: 35
	},
	bottomView: {
		marginHorizontal: 20,
		marginBottom: 20
	},
});

const ClientAddress = (): React.ReactElement => {
	const [goNext, setGoNext] = useState<boolean>(false);
	const { customerBasicVerificationDetails, 
		completeCustomerBasicVerification, 
		signOut, 
		cognitoId, 
		completeCustomerDwollaInfo,
		setCustomerDwollaId,
		signInDetails,
		getAttributes
	} = useContext(AuthContext);
	const navigation = useNavigation();
	const dispatch = useDispatch();

	useEffect(() => {
		setGoNext(
			customerBasicVerificationDetails.address1 !== "" && 
			customerBasicVerificationDetails.city !== "" && 
			customerBasicVerificationDetails.postalCode !== ""
		);
	}, [customerBasicVerificationDetails]);

	const onNextPress = async () => {
		dispatch(showLoadingProgress(LoadingScreenTypes.LOADING_DATA))
		const response = await completeCustomerBasicVerification();
		const state = customerBasicVerificationDetails.state
		if (response.success && cognitoId && signInDetails) {
			const request: IUserRequest = {
				firstName: customerBasicVerificationDetails.firstName,
				lastName: customerBasicVerificationDetails.lastName,
				email: signInDetails.email,
				address1: customerBasicVerificationDetails.address1,
				address2: customerBasicVerificationDetails.address2,
				city: customerBasicVerificationDetails.city,
				state: state && state.length > 0 ? state : countries[0],
				postalCode: customerBasicVerificationDetails.postalCode,
				authUserId: "p_" + cognitoId
			};

			const resApi = await UserAPI.user(request);
			if (completeCustomerDwollaInfo && resApi.data) {
				await completeCustomerDwollaInfo({
					dwollaId: resApi.data.userId,
					resourceUri: ""
				});
				await getAttributes()
			}
		} else {
			showToast(ToastType.ERROR, "Whooops, something went wrong.", "Connection failed.");
		}
		dispatch(hideLoadingProgress())
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
						{Translation.PROFILE.CLIENT_DETAILS}
					</Text>
				</View>
				<ScrollView>
					<View style={styles.content}>
						<ClientAddressForm userType={UserType.Customer} />
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

export default ClientAddress;
