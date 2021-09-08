import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	CognitoUserAttribute,
	CognitoUserSession
} from "amazon-cognito-identity-js";
import React, { useEffect, useState } from "react";
import { isBusinessVerified, isCustomerVerified } from "src/auth/verification";
import { userController } from "./cognito";
import { BaseResponse, CognitoBusinessAttributes, CognitoCustomerAttributes, CognitoResponse, CognitoSharedUserAttributes } from "./cognito/types";
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
	IAuth, UserType
} from "./types";

export const AuthContext = React.createContext(defaultState);

const convertAttributesArrayToObject = (attributes: any): any => {
	const newObject: any = {};
	for (let i = 0; i < attributes.length; i++) {
		newObject[attributes[i].Name] = attributes[i].Value;
	}

	return newObject;
};

const saveUserTypeToStorage = async (value: UserType) => {
	try {
		await AsyncStorage.setItem("@accType", String(value));
		return true;
	} catch (e) {
		return false;
	}
};

const getLatestSelectedAccountType = async () => {
	try {
		const value: string | null = await AsyncStorage.getItem("@accType");
		if (!value) return "";
		return value;
	} catch (e) {
		return "";
	}
};

const AuthProvider: React.FunctionComponent = ({ children }) => {
	const [userType, setUserType] = useState<UserType | undefined>(undefined);
	const [authStatus, setAuthStatus] = useState(AuthStatus.SignedOut);
	const [signInDetails, setSignInDetails] = useState(signInInitialState);
	const [signUpDetails, setSignUpDetails] = useState(signUpInitialState);
	const [userAttributes, setUserAttributes] = useState<any>({});

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

	const updateUserType = (newType: UserType): void => {
		if (newType === userType) {
			setAuthStatus(AuthStatus.Loading);
		} else {
			setUserType(newType);
		}
		saveUserTypeToStorage(newType);
	};

	async function getSessionInfo() {
		try {
			const response: BaseResponse<CognitoUserSession | undefined> =
				await userController.getSession();
			if (response.success) {
				const userAttributes: BaseResponse<
					CognitoUserAttribute[] | undefined
				> = await getAttributes();
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
	}, [authStatus, userType]);

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

	useEffect(() => {
		const initialTypeState = async () => {
			const latestType = await getLatestSelectedAccountType();
			if (!latestType && isBusinessVerified) {
				setUserType(UserType.Business);
			} else if (!latestType && isCustomerVerified) {
				setUserType(UserType.Customer);
			} else if (latestType === "0" && isCustomerVerified) {
				setUserType(UserType.Customer);
			} else if (latestType === "1" && isBusinessVerified) {
				setUserType(UserType.Business);
			} else {
				setUserType(undefined)
			}
		};
		initialTypeState()
	}, []);

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
		}

		return response;
	};

	const updateAttributes = async (
		update:
			| CognitoBusinessAttributes
			| CognitoCustomerAttributes
			| CognitoSharedUserAttributes
	) => {
		const response = await userController.updateUserAttributes(update);
		return response;
	};

	const signOut = () => {
		userController.signOut();
		setAuthStatus(AuthStatus.SignedOut);
	};

	const state: IAuth = {
		userType,
		getAttributes,
		userAttributes,
		updateAttributes,
		authStatus,
		signIn,
		setAuthStatus,
		signOut,
		signUp,
		setSignInDetails,
		updateUserType,
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
