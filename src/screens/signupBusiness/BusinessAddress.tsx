import { useNavigation } from "@react-navigation/native";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { AuthContext } from 'src/auth';
import { BaseResponse } from "src/auth/cognito/types";
import * as Routes from "src/navigation/constants";
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
import { IUserRequest } from 'src/api/types';
import { UserAPI } from 'src/api';
import { ToastType, LoadingScreenTypes } from 'src/utils/types';
import { showToast } from 'src/utils/common';
import { updateLoadingStatus } from 'src/store/loading/loading.actions';
import { useDispatch } from 'react-redux';

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
	bottomButton: {
		width: "90%",
		position: "absolute",
		bottom: 45,
		left: "5%",
	},
});

const BusinessAddress = (): ReactElement => {
	const [goNext, setGoNext] = useState<boolean>(false);
	const {
		buisnessBasicVerification,
		completeBusniessBasicVerification,
		signOut,
		cognitoId,
		completeBusinessDwollaInfo
	} = useContext(AuthContext);
	const navigation = useNavigation();
	const dispatch = useDispatch();

	useEffect(() => {
		setGoNext(
			buisnessBasicVerification.address1 !== "" && 
			buisnessBasicVerification.city !== "" && 
			buisnessBasicVerification.postalCode !== ""
		);
	}, [buisnessBasicVerification]);
	
	const onNextPress = async () => {
		const response: BaseResponse<string | undefined> =
			await completeBusniessBasicVerification();
		if (response.success && cognitoId) {
			const request: IUserRequest = {
				firstName: buisnessBasicVerification.owner?.firstName,
				lastName: buisnessBasicVerification.owner?.lastName,
				businessName: buisnessBasicVerification.tag,
				email: cognitoId + "@humanity.cash",
				address1: buisnessBasicVerification.address1,
				address2: buisnessBasicVerification.address2,
				city: buisnessBasicVerification.city,
				state: buisnessBasicVerification.state,
				postalCode: buisnessBasicVerification.postalCode,
				authUserId: "m_" + cognitoId
			};

			dispatch(updateLoadingStatus({
				isLoading: true,
				screen: LoadingScreenTypes.LOADING_DATA
			}));
			const resApi = await UserAPI.user(request);

			if (resApi.data) {
				await completeBusinessDwollaInfo({
					dwollaId: resApi.data.userId,
					resourceUri: ""
				});

				navigation.navigate(Routes.BUSINESS_WELCOME);
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
		<View style={viewBaseB}>
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
			<Button
				type="purple"
				title={Translation.BUTTON.NEXT}
				disabled={!goNext}
				style={styles.bottomButton}
				onPress={onNextPress}
			/>
		</View>
	);
};

export default BusinessAddress;
