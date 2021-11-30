import {
	CognitoUserSession
} from "amazon-cognito-identity-js";
import React, { useContext, useEffect, useState } from "react";
import { UserAPI } from "src/api";
import * as userController from "src/auth/cognito";
import {
	signInInitialState,
	signUpInitialState
} from "src/auth/consts";
import { getLatestSelectedAccountType } from "src/auth/localStorage";
import {
	AuthStatus,
	BaseResponse, ChangePasswordInput, defaultState, ForgotPassword, IAuth, SignUpInput, UserType
} from "src/auth/types";
import DataLoading from "src/screens/loadings/DataLoading";
import { NavigationViewContext, ViewState } from "./navigation";
import { UserContext } from "./user";

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

	const updateAuthStatus = async (newStatus: AuthStatus) => {
		setAuthStatus(newStatus)
	}

	const updateSignUpDetails = (i: Partial<SignUpInput>): void => {
		setSignUpDetails((pv: SignUpInput) => ({ ...pv, ...i }))
	}
	const getSessionInfo = async () => {
		try {
			updateAuthStatus(AuthStatus.Loading);
			const response: BaseResponse<CognitoUserSession | undefined> =
				await userController.getSession();
			if (response.success && response.data && response.data.isValid()) {
				const email = response.data.getAccessToken().decodePayload().username;
				setUserEmail(email);
				updateAuthStatus(AuthStatus.SignedIn);
			} else {
				updateAuthStatus(AuthStatus.SignedOut);
			}
		} catch (err) {
			updateAuthStatus(AuthStatus.SignedOut);
		}
	}

	useEffect(() => {
		const loadCachedAuth = async () => {
			try {
				updateAuthStatus(AuthStatus.Loading);
				const response: BaseResponse<CognitoUserSession | undefined> =
					await userController.getSession();
				if (response.success && response.data && response.data.isValid()) {
					const email = response.data.getAccessToken().decodePayload().username;
					setUserEmail(email);
					const user = await UserAPI.getUserByEmail(email);
					if (!Object.keys(user).length) {
						updateUserType(UserType.NotVerified, email)
						updateSelectedView(ViewState.NotVerified)
						updateAuthStatus(AuthStatus.SignedOut);
						return response;
					} else {
						const latestType = await getLatestSelectedAccountType(email);
						if (latestType === UserType.Business) updateSelectedView(ViewState.Business)
						else if (latestType === UserType.Customer) updateSelectedView(ViewState.Customer)
						else if (user.verifiedBusiness) updateSelectedView(ViewState.Business)
						else if (user.verifiedCustomer) updateSelectedView(ViewState.Customer)
						updateAuthStatus(AuthStatus.SignedIn);
						updateUserData(user);
						updateUserType(latestType as UserType, email);
					}
				} else {
					updateAuthStatus(AuthStatus.SignedOut);
				}
			} catch (err) {
				updateAuthStatus(AuthStatus.SignedOut);
			}
		}

		loadCachedAuth()
	}, []);

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
		updateAuthStatus(AuthStatus.Loading);
		const response: BaseResponse<CognitoUserSession> =
			await userController.signIn({ email: email.toLowerCase(), password });
		if (response?.success) {
			await getSessionInfo();
			const user = await UserAPI.getUserByEmail(email);
			if (!user) {
				updateUserType(UserType.NotVerified, email)
				updateSelectedView(ViewState.NotVerified)
				return response;
			} else {
				const latestType = await getLatestSelectedAccountType(email);
				if (latestType === UserType.Business) updateSelectedView(ViewState.Business)
				else if (latestType === UserType.Customer) updateSelectedView(ViewState.Customer)
				else if (user.verifiedBusiness) updateSelectedView(ViewState.Business)
				else if (user.verifiedCustomer) updateSelectedView(ViewState.Customer)
				updateUserData(user);
				updateUserType(latestType as UserType, email);
			}
		} else {
			updateAuthStatus(AuthStatus.SignedOut);
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
		updateAuthStatus(AuthStatus.SignedOut);
		updateSelectedView(ViewState.Onboarding);
		updateUserData({});
		setUserEmail("");
	};

	const actions = {
		setForgotPasswordDetails,
		signIn,
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
		<AuthContext.Provider value={state}>
			<DataLoading visible={authStatus === AuthStatus.Loading} />
			{children}
		</AuthContext.Provider>
	);
};
