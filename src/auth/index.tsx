import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	CognitoUserAttribute,
	CognitoUserSession
} from "amazon-cognito-identity-js";
import React, { useEffect, useState } from "react";
import { userController } from "./cognito";
import { BaseResponse, CognitoBusinessAttributes, CognitoCustomerAttributes, CognitoResponse, CognitoSharedUserAttributes, CompleteForgotPasswordInput, StartForgotPasswordInput } from "./cognito/types";
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
	const [forgotPasswordDetails, setForgotPasswordDetails] = useState(signUpInitialState);
	const [userAttributes, setUserAttributes] = useState<any>({});
	const [completedCustomerVerification, setCompletedCustomerVerification] = useState<boolean>(false);
	const [completedBusinessVerification, setCompletedBusinessVerification] = useState<boolean>(false);

	useEffect(() => {
		const isVerifiedCustomer =
			userAttributes?.["custom:basicCustomerV"] === "true";
		const isVerifiedBusiness =
			userAttributes?.["custom:basicBusinessV"] === "true";
		setCompletedCustomerVerification(isVerifiedCustomer);
		setCompletedBusinessVerification(isVerifiedBusiness);
	}, [userAttributes, authStatus, userType]);

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
		if (newType !== UserType.Cashier) {
			// dont cache cashier option. it will lock the user in cashier screens
			saveUserTypeToStorage(newType);
		}
	};

	async function getSessionInfo() {
		try {
			const response: BaseResponse<CognitoUserSession | undefined> =
				await userController.getSession();
			if (response.success) {
				await getAttributes();
				setAuthStatus(AuthStatus.SignedIn);
			} else {
				setAuthStatus(AuthStatus.SignedOut);
			}
		} catch (err) {
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

	const resendEmailVerificationCode = async (
		email = signUpDetails.email
	) =>
		userController.resendEmailVerificationCode(email);

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
			if (!latestType) {
				updateUserType(UserType.Customer);
			} else if (latestType === "2") {
				updateUserType(UserType.Business);
			} else if (latestType === "0") {
				updateUserType(UserType.Customer);
			} else if (latestType === "1") {
				updateUserType(UserType.Business);
			}
		};
		initialTypeState();
	}, []);

	const getAttributes = async (): CognitoResponse<
		CognitoUserAttribute[] | undefined
	> => {
		const response = await userController.getAttributes();
		if (!response.success) {
			setUserAttributes({});
		} else {
			// ONLY place we use setUserAttributes
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

	const startForgotPasswordFlow = async (i: StartForgotPasswordInput) => {
		const { email } = i;
		const response: BaseResponse<unknown> = await userController.startForgotPasswordFlow({ email });

		return response;
	};

	const completeForgotPasswordFlow = async (
		i: CompleteForgotPasswordInput
	) => {
		const { email, verificationCode, newPassword } = i;
		const response: BaseResponse<unknown> =
			await userController.completeForgotPasswordFlow({
				email,
				verificationCode,
				newPassword,
			});

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
		if (userType === UserType.Cashier) {
			setUserType(UserType.Business);
		}
	};

	const state: IAuth = {
		userType,
		userAttributes,
		updateAttributes,
		authStatus,
		completedCustomerVerification,
		completedBusinessVerification,
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
		forgotPasswordDetails,
		setForgotPasswordDetails,
		customerBasicVerificationDetails,
		setCustomerBasicVerificationDetails,
		completeBusniessBasicVerification,
		completeCustomerBasicVerification,
		emailVerification,
		startForgotPasswordFlow,
		completeForgotPasswordFlow,
		resendEmailVerificationCode,
	};

	return (
		<AuthContext.Provider value={state}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
