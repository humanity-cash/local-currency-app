import {
	CognitoUserSession
} from "amazon-cognito-identity-js";
import React, { useEffect, useState, useContext } from "react";
import { getLatestSelectedAccountType } from "src/auth/localStorage";
import { UserAPI } from "src/api";
import * as userController from "src/auth/cognito";
import {
	signInInitialState,
	signUpInitialState
} from "src/auth/consts";
import {
	AuthStatus,
	BaseResponse, ChangePasswordInput, defaultState, ForgotPassword, IAuth, SignUpInput, UserType
} from "src/auth/types";
import { UserContext } from "./user";
import { NavigationViewContext, ViewState } from "./navigation";

export const AuthContext = React.createContext(defaultState);

export const AuthProvider: React.FunctionComponent = ({ children }) => {
	const [authStatus, setAuthStatus] = useState(AuthStatus.SignedOut);
	const { updateUserData, updateUserType } = useContext(UserContext)
	const { updateSelectedView } = useContext(NavigationViewContext)
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

	useEffect(() => {
		getSessionInfo();
	}, []);

	const getSessionInfo = async () => {
		try {
			setAuthStatus(AuthStatus.Loading);
			const response: BaseResponse<CognitoUserSession | undefined> =
				await userController.getSession();
			if (response.success && response.data && response.data.isValid()) {
				const email = response.data.getAccessToken().decodePayload().username;
				setUserEmail(email);
				setAuthStatus(AuthStatus.SignedIn);
			} else {
				setAuthStatus(AuthStatus.SignedOut);
			}
		} catch (err) {
			setAuthStatus(AuthStatus.SignedOut);
		}
	}

	const confirmEmailVerification = (verificationCode: string) =>
		userController.confirmEmailVerificationCode(
			signUpDetails.email.toLowerCase(),
			verificationCode
		);

	const resendEmailVerificationCode = async () =>
		userController.resendEmailVerificationCode(signUpDetails.email.toLowerCase());

	const signUp = async () => {
		const response = await userController.signUp(
			signUpDetails.email.toLowerCase(),
			signUpDetails.password
		);
		return response;
	};

	const signIn = async (
		email = signInDetails.email,
		password = signInDetails.password
	) => {
		setAuthStatus(AuthStatus.Loading);
		const response: BaseResponse<CognitoUserSession> =
			await userController.signIn({ email: email.toLowerCase(), password });
		if (response?.success) {
			await getSessionInfo();
			const user = await UserAPI.getUserByEmail(email);
      console.log("🚀 ~ file: auth.tsx ~ line 90 ~ user", user)
			if (!user) {
				updateUserType(UserType.NotVerified, email)
				updateSelectedView(ViewState.NotVerified)
				return response;
			} else {
				const latestType = await getLatestSelectedAccountType(email);
				if(latestType === UserType.Business) updateSelectedView(ViewState.Business)
				else if(latestType === UserType.Customer) updateSelectedView(ViewState.Customer)
				else if(user.verifiedBusiness) updateSelectedView(ViewState.Business)
				else if(user.verifiedCustomer) updateSelectedView(ViewState.Customer)
				updateUserData(user);
				updateUserType(latestType as UserType, email);
			}
		} else {
			console.log('here');
			setAuthStatus(AuthStatus.SignedOut);
		}
		return response;
	};


	const startForgotPasswordFlow = async (): Promise<BaseResponse<unknown>> => {
		const { email } = forgotPasswordDetails;
		const response: BaseResponse<unknown> =
			await userController.startForgotPasswordFlow({ email: email.toLowerCase() });
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
		updateSelectedView(ViewState.Onboarding);
		updateUserData({});
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
