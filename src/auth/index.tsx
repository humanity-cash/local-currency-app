import {
	CognitoUserSession
} from "amazon-cognito-identity-js";
import React, { useEffect, useState } from "react";
import * as userController from "./cognito";
import {
	signInInitialState,
	signUpInitialState
} from "./consts";
import { getLatestSelectedAccountType, saveUserTypeToStorage } from "./localStorage";
import {
	AuthStatus,
	BaseResponse, ChangePasswordInput, defaultState, ForgotPassword, IAuth, UserType
} from "./types";

export const AuthContext = React.createContext(defaultState);

const AuthProvider: React.FunctionComponent = ({ children }) => {
	const [userType, setUserType] = useState<UserType | undefined>(undefined);
	const [authStatus, setAuthStatus] = useState(AuthStatus.SignedOut);
	const [update, setUpdate] = useState(false);
	const [signInDetails, setSignInDetails] = useState(signInInitialState);
	const [signUpDetails, setSignUpDetails] = useState(signUpInitialState);
	const [forgotPasswordDetails, setForgotPasswordDetails] = useState<ForgotPassword>({
		email: "",
		verificationCode: "",
		newPassword: "",
	});

	const updateUserType = (userEmail: string, newType: UserType): void => {
		if (newType === userType) {
			setAuthStatus(AuthStatus.Loading);
		} else {
			setUserType(newType);
		}
		if (newType !== UserType.Cashier) {
			// dont cache cashier option. it will lock the user in cashier screens
			saveUserTypeToStorage(userEmail, newType);
		}
	};

	const getSessionInfo = async () => {
		try {
			const response: BaseResponse<CognitoUserSession | undefined> =
				await userController.getSession();
      console.log("🚀 ~ file: index.tsx ~ line 45 ~ getSessionInfo ~ response", response)
			if (response.success) {
				// await getAttributes(); // should invoke getUser from DB
				setAuthStatus(AuthStatus.SignedIn);
			} else {
				setAuthStatus(AuthStatus.SignedOut);
			}
		} catch (err) {
			setAuthStatus(AuthStatus.SignedOut);
		}
	}

	useEffect(() => {
		if(update){  
			getSessionInfo(); 
			setUpdate(false);
		}
	}, [update]);

	useEffect(() => {
		getSessionInfo();
	}, [userType, authStatus]);

	useEffect(() => {
		initialTypeState('email') // :FIXME
	}, [])

	const initialTypeState = async (cognitoId: string) => {
		if(cognitoId === undefined || cognitoId.length < 1) {
			return
		}
		const latestType = await getLatestSelectedAccountType(cognitoId);
		if (!latestType) {
			if (userType !== UserType.Customer) {
				updateUserType(cognitoId, UserType.Customer);
			}
		} else if (latestType === "2") {
			if (userType !== UserType.Cashier) {
				updateUserType(cognitoId, UserType.Cashier);
			}
		} else if (latestType === "0") {
			if (userType !== UserType.Customer) {
				updateUserType(cognitoId, UserType.Customer);
			}
		} else if (latestType === "1") {
			if (userType !== UserType.Business) {
				updateUserType(cognitoId, UserType.Business);
			}
		}
	};
	
	const emailVerification = (verificationCode: string) =>
		userController.confirmEmailVerificationCode(
			signUpDetails.email,
			verificationCode
		);

	const resendEmailVerificationCode = async () =>
		userController.resendEmailVerificationCode(signUpDetails.email);

	const signUp = async () => {
		const response = await userController.signUp(
			signUpDetails.email.toLowerCase(),
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
    console.log("🚀 ~ file: index.tsx ~ line 120 ~ response", response)
		if (!response?.success) {
			setAuthStatus(AuthStatus.SignedOut);
		} else {
			setAuthStatus(AuthStatus.Loading); // Invokes getSession useEffect
		}
		return response;
	};


	const startForgotPasswordFlow = async (): Promise<BaseResponse<unknown>> => {
		const { email } = forgotPasswordDetails;
		const response: BaseResponse<unknown> =
			await userController.startForgotPasswordFlow({ email });
		return response;
	};
	
	const completeForgotPasswordFlow = async (): Promise<
		BaseResponse<unknown>
	> => {
		const { email, newPassword, verificationCode } = forgotPasswordDetails;
		const response: BaseResponse<unknown> =
			await userController.completeForgotPasswordFlow({
				email,
				verificationCode,
				newPassword,
			});
		return response;
	};

	const changePassword = async (
		i: ChangePasswordInput
	) => {
		const { oldPassword, newPassword } = i;
		const response: BaseResponse<unknown> =
			await userController.changePassword({
				oldPassword,
				newPassword,
			});
		return response;
	};

	const signOut = () => {
		userController.signOut();
		setAuthStatus(AuthStatus.SignedOut);
		setUserType(undefined)
		if (userType === UserType.Cashier) {
			setUserType(UserType.Business);
		}
	};

	const state: IAuth = {
		userType,
		forgotPasswordDetails, 
		setForgotPasswordDetails,
		authStatus,
		signIn,
		setAuthStatus,
		signOut,
		signUp,
		setSignInDetails,
		updateUserType,
		signInDetails,
		signUpDetails,
		setSignUpDetails,
		emailVerification,
		startForgotPasswordFlow,
		completeForgotPasswordFlow,
		resendEmailVerificationCode,
		changePassword,
	};

	return (
		<AuthContext.Provider value={state}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
