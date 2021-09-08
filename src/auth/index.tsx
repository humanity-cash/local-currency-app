import {
	CognitoUserAttribute,
	CognitoUserSession
} from "amazon-cognito-identity-js";
import React, { useEffect, useState } from "react";
import { isBusinessVerified, isCustomerVerified } from "src/auth/verification";
import { userController } from "./cognito";
import { BaseResponse, CognitoResponse } from "./cognito/types";
import {
	buisnessBasicVerificationInitialState,
	customerBasicVerificationInitialState,
	signInInitialState,
	signUpInitialState
} from "./consts";
import {
	AuthStatus,
	BusinessBasicVerification,
	CustomerBasicVerification,
	defaultState,
	IAuth,
	UpdateUserAttributesInput,
	UserType
} from "./types";

export const AuthContext = React.createContext(defaultState);

const convertAttributesArrayToObject = (attributes: any): any => {
	const newObject: any = {};
	for (let i = 0; i < attributes.length; i++) {
		newObject[attributes[i].Name] = attributes[i].Value;
	}

	return newObject;
};


const AuthProvider: React.FunctionComponent = ({ children }) => {
	const [userType, setUserType] = useState(UserType.Business);
	const [authStatus, setAuthStatus] = useState(AuthStatus.SignedOut);
	const [isUpdatedAttributes, setIsUpdatedAttributes] = useState(false);
	const [signInDetails, setSignInDetails] = useState(signInInitialState);
	const [signUpDetails, setSignUpDetails] = useState(signUpInitialState);
	const [userAttributes, setUserAttributes] = useState<any>([]);

	const [
		customerBasicVerificationDetails,
		setCustomerBasicVerificationDetails,
	] = useState<CustomerBasicVerification>(
		customerBasicVerificationInitialState
	);

	const [buisnessBasicVerification, setBuisnessBasicVerification] =
		useState<BusinessBasicVerification>(
			buisnessBasicVerificationInitialState
		);

	async function getSessionInfo() {
		try {
			const response: BaseResponse<CognitoUserSession | undefined> =
				await userController.getSession();
			if (response.success) {
				const userAttributes: BaseResponse<CognitoUserAttribute[] | undefined> =
					await getAttributes();
				const isVerified =
					isCustomerVerified(userAttributes?.data) ||
					isBusinessVerified(userAttributes?.data);
				if (!isVerified) {
					setAuthStatus(AuthStatus.NotVerified);
				} else {
					setAuthStatus(AuthStatus.SignedIn);
				}
			} else {
				setAuthStatus(AuthStatus.SignedOut);
			}
		} catch (err) {
			console.log("err", err);
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
		else setAuthStatus(AuthStatus.Loading); // Invokes getSession useEffect

		return response;
	};

	const signIn = async (
		email = signInDetails.email,
		password = signInDetails.password
	) => {
		const response: BaseResponse<CognitoUserSession> =
			await userController.signIn({ email, password });
		if (!response?.success) {
			setAuthStatus(AuthStatus.SignedOut); // Something went wrong in sign in
		} else {
			setAuthStatus(AuthStatus.Loading); // Invokes getSession useEffect
		}

		return response;
	};

	const getAttributes = async (): CognitoResponse<
		CognitoUserAttribute[] | undefined
	> => {
		const response = await userController.getAttributes();
		if (!response.success) {
			setUserAttributes({});
		} else {
			//@ts-ignore
			setUserAttributes(
				convertAttributesArrayToObject(response?.data) || {}
			);
		}

		return response;
	};

	const completeBusniessBasicVerification = async (
		update = buisnessBasicVerification
	): CognitoResponse<string | undefined> => {
		const response = await userController.completeBusinessBasicVerification(
			update
		);
		if (response.success) {
			await userController.updateUserAttributes({
				"custom:basicBusinessV": "true",
			});
			setAuthStatus(AuthStatus.Loading);
		}

		return response;
	};

	const completeCustomerBasicVerification = async (
		update = customerBasicVerificationDetails
	): CognitoResponse<string | undefined> => {
		const response = await userController.completeCustomerBasicVerification(update);
		if (response.success) {
			await userController.updateUserAttributes({
				"custom:basicCustomerV": "true",
			});
			setAuthStatus(AuthStatus.Loading);
		}

		return response;
	};

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
		userType,
		setUserType,
		getAttributes,
		userAttributes,
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
		completeBusniessBasicVerification,
		completeCustomerBasicVerification,
		emailVerification,
		resendEmailVerificationCode,
	};

	return (
		<AuthContext.Provider value={state}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
