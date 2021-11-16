import {
	CognitoUserSession
} from "amazon-cognito-identity-js";
import React, { useEffect, useState } from "react";
import * as userController from "./cognito";
import {
	signInInitialState,
	signUpInitialState
} from "./consts";
import {
	AuthStatus,
	BaseResponse, ChangePasswordInput, defaultState, ForgotPassword, IAuth, SignUpInput, UserType
} from "./types";

export const AuthContext = React.createContext(defaultState);
const AuthProvider: React.FunctionComponent = ({ children }) => {
	const [authStatus, setAuthStatus] = useState(AuthStatus.SignedOut);
	const [userEmail, setUserEmail] = useState<string>("");
	const [signInDetails, setSignInDetails] = useState(signInInitialState);
	const [signUpDetails, setSignUpDetails] = 
		useState<SignUpInput>(signUpInitialState);
	const [forgotPasswordDetails, setForgotPasswordDetails] = useState<ForgotPassword>({
		email: "",
		verificationCode: "",
		newPassword: "",
	});

	const updateSignUpDetails = (i: Partial<SignUpInput>): void => {
		setSignUpDetails((pv: SignUpInput) => ({ ...pv, ...i }))
	}

	const getSessionInfo = async () => {
		try {
			const response: BaseResponse<CognitoUserSession | undefined> =
				await userController.getSession();
			if (response.success && response.data && response.data.isValid()) {
				setAuthStatus(AuthStatus.SignedIn);
				const email = response.data.getAccessToken().decodePayload().username;
				setUserEmail(email);
			} else {
				setAuthStatus(AuthStatus.SignedOut);
			}
		} catch (err) {
			setAuthStatus(AuthStatus.SignedOut);
		}
	}

	useEffect(() => {
		getSessionInfo();
	}, []);
	
	const confirmEmailVerification = (verificationCode: string) =>
		userController.confirmEmailVerificationCode(
			signUpDetails.email,
			verificationCode
		);

	const resendEmailVerificationCode = async () =>
		userController.resendEmailVerificationCode(signUpDetails.email);

	const signUp = async () => {
		setAuthStatus(AuthStatus.Loading)
		const response = await userController.signUp(
			signUpDetails.email.toLowerCase(),
			signUpDetails.password
		);
		if (!response?.success) setAuthStatus(AuthStatus.SignedOut);
		else signIn(signUpDetails.email.toLowerCase(), signUpDetails.password);
		return response;
	};

	const signIn = async (
		email = signInDetails.email,
		password = signInDetails.password
	) => {
		setAuthStatus(AuthStatus.Loading)
		const response: BaseResponse<CognitoUserSession> =
			await userController.signIn({ email, password });
		if (!response?.success) {
			setAuthStatus(AuthStatus.SignedOut);
		} else {
			await getSessionInfo();
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
		setUserEmail("");
	};

	const actions = {
		setForgotPasswordDetails,
		signIn,
		setAuthStatus,
		signOut,
		signUp,
		setSignInDetails,
		updateSignUpDetails,	
		startForgotPasswordFlow,
		completeForgotPasswordFlow,
		resendEmailVerificationCode,
		changePassword,
		emailVerification: confirmEmailVerification,
	}

	const state: IAuth = {
		...actions,
		forgotPasswordDetails, 
		authStatus,
		signInDetails,
		signUpDetails,
		userEmail,
	};

	return (
		<AuthContext.Provider value={state}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
