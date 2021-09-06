import {
	CognitoUserAttribute,
	CognitoUserSession,
} from "amazon-cognito-identity-js";
import React, { useEffect, useState } from "react";
import { completedAllVerifications } from "src/auth/verification";
import { userController } from "./cognito";
import {
	AuthStatus,
	BaseResponse,
	BusinessBasicVerification,
	CognitoResponse,
	CustomerBasicVerification,
	defaultState,
	IAuth,
	UpdateUserAttributesInput,
} from "./types";

export const AuthContext = React.createContext(defaultState);

const AuthProvider: React.FunctionComponent = ({ children }) => {
	const [authStatus, setAuthStatus] = useState(AuthStatus.SignedOut);
	const [isUpdatedAttributes, setIsUpdatedAttributes] = useState(false);
	const [signInDetails, setSignInDetails] = useState({
		email: "esraa@humanity.cash",
		password: "Esraa@keyko1",
	});
	const [signUpDetails, setSignUpDetails] = useState({
		email: "esraa@humanity.cash",
		password: "Esraa@keyko1",
		confirmPassword: "Esraa@keyko1",
	});
	const [
		customerBasicVerificationDetails,
		setCustomerBasicVerificationDetails,
	] = useState<CustomerBasicVerification>({
		type: "personal",
		tag: "sat",
		profilePicture: "",
		firstName: "Satoshi",
		lastName: "Nakamoto",
		address1: "Satoshi Street 21",
		address2: "Nakamoto Street 21",
		city: "Sato",
		state: "a",
		postalCode: "2100000000",
	});

	const [buisnessBasicVerification, setBuisnessBasicVerification] =
		useState<BusinessBasicVerification>({
			story: "tell a story story",
			tag: "store tag(username)",
			avatar: "",
			type: "business type",
			owner: {
				firstName: "Owner first name",
				lastName: "Owner last name",
				address1: "Satoshi Street 21",
				address2: "Nakamoto Street 21",
				city: "Sato",
				state: "a",
				postalCode: "2100000000",
			},
			registeredBusinessName: "Registered Name",
			industry: "Industry",
			ein: "Employee Identification Number",
			address1: "Satoshi Street 21",
			address2: "Nakamoto Street 21",
			city: "Sato",
			state: "a",
			postalCode: "2100000000",
		});

	async function getSessionInfo() {
		try {
			const response: BaseResponse<CognitoUserSession | null> =
				await userController.getSession();
			if (response.success) {
				console.log("success");
				const attrs: BaseResponse<CognitoUserAttribute[] | undefined> =
					await getAttributes();
				const { isVerified } = completedAllVerifications(attrs?.data);
				if (!isVerified) {
					setAuthStatus(AuthStatus.NotVerified);
				} else {
					setAuthStatus(AuthStatus.SignedIn);
				}
			} else {
				setAuthStatus(AuthStatus.SignedOut);
			}
		} catch (err) {
			setAuthStatus(AuthStatus.SignedOut);
		}
	}

	useEffect(() => {
		getSessionInfo();
	}, [authStatus, isUpdatedAttributes]);

	const emailVerification = (verificationCode: string) =>
		userController.confirmEmailVerificationCode(
			signUpDetails.email,
			verificationCode
		);

	const resendEmailVerificationCode = async () =>
		userController.resendEmailVerificationCode(signUpDetails.email);

	const signUp = async () => {
		const response = await userController.signUp(
			signUpDetails.email,
			signUpDetails.password
		);
		if (!response?.success) setAuthStatus(AuthStatus.SignedOut);
		else setAuthStatus(AuthStatus.Loading);

		return response;
	};

	const signIn = async (
		email = signInDetails.email,
		password = signInDetails.password
	) => {
		const response: BaseResponse<CognitoUserSession> =
			await userController.signIn({ email, password });
		if (!response?.success) {
			// something went wrong in signIn
			setAuthStatus(AuthStatus.SignedOut);
		} else {
			setAuthStatus(AuthStatus.Loading); // Invokes getSession useEffect
		}

		return response;
	};

	const getAttributes = async (): CognitoResponse<
		CognitoUserAttribute[] | undefined
	> => userController.getAttributes();

	const completeBasicBusniessVerification = async (
		update = buisnessBasicVerification
	): CognitoResponse<string | undefined> =>
		userController.updateUserAttributes({
			"custom:busniess.story": update.story,
			"custom:busniess.tag": update.tag,
			"custom:busniess.avatar": update.avatar,
			"custom:busniess.type": update.type,
			"custom:owner.firstName": update.owner.firstName,
			"custom:owner.lastName": update.owner.lastName,
			"custom:owner.address1": update.owner.address1,
			"custom:owner.address2": update.owner.address2,
			"custom:owner.city": update.owner.city,
			"custom:owner.state": update.owner.state,
			"custom:owner.postalCode": update.owner.postalCode,
			"custom:busniess.registeredBusinessName":
				update.registeredBusinessName,
			"custom:busniess.industry": update.industry,
			"custom:busniess.ein": update.ein,
			"custom:busniess.address1": update.address1,
			"custom:busniess.address2": update.address2,
			"custom:busniess.city": update.city,
			"custom:busniess.state": update.state,
			"custom:busniess.postalCode": update.postalCode,
			"custom:busniess.phoneNumber": update.phoneNumber,
		});

	const completeBasicVerification = async (
		update = customerBasicVerificationDetails
	): CognitoResponse<string | undefined> =>
		userController.updateUserAttributes({
			"custom:profilePicture": update.profilePicture,
			"custom:tag": update.tag,
			"custom:firstName": update.firstName,
			"custom:lastName": update.lastName,
			"custom:address1": update.address1,
			"custom:address2": update.address2,
			"custom:city": update.city,
			"custom:state": update.state,
			"custom:postalCode": update.postalCode,
		});

	const updateAttributes = async ({ update }: UpdateUserAttributesInput) => {
		const response = await userController.updateUserAttributes(update);
		setIsUpdatedAttributes(true);
		return response;
	};

	const signOut = () => {
		userController.signOut();
		setAuthStatus(AuthStatus.SignedOut);
	};

	const state: IAuth = {
		completeBasicVerification,
		getAttributes,
		updateAttributes,
		authStatus,
		signIn,
		signOut,
		signUp,
		setSignInDetails,
		buisnessBasicVerification,
		setBuisnessBasicVerification,
		signInDetails,
		signUpDetails,
		setSignUpDetails,
		customerBasicVerificationDetails,
		setCustomerBasicVerificationDetails,
		completeBasicBusniessVerification,
		emailVerification,
		resendEmailVerificationCode,
	};

	return (
		<AuthContext.Provider value={state}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
