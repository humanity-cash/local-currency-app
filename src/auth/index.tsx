/* eslint-disable no-useless-catch */
import React, { useContext, useEffect, useState } from 'react';
import  * as AWSService  from './aws-cognito';

/**AWS COGNITO ERRORS */
export const NEW_PASSWORD_REQUIRED_ERROR = 'newPasswordRequiredError'
export const WRONG_CREDS_ERROR = 'Incorrect username or password.'
export enum AuthStatus {
	Loading,
	SignedIn,
	SignedOut,
}

export interface IAuth {
	sessionInfo?: {
		username?: string;
		email?: string;
		sub?: string;
		accessToken?: string;
		refreshToken?: string;
	};
	attrInfo?: any;
	authStatus?: AuthStatus;
	signIn?: any;
	isNewUser?: boolean;
	setSignInDetails: any;
	setNewPassword?: any;
	signInDetails: { password: string; email: string };
	newPassword: string;
	signOut?: any;
	completeNewPassword?: any;
	verifyCode?: any;
	getSession?: any;
	sendCode?: any;
	forgotPassword?: any;
	changePassword?: any;
	getAttributes?: any;
	setAttribute?: any;
}

const defaultState: IAuth = {
	sessionInfo: {},
	authStatus: AuthStatus.Loading,
	signInDetails: { password: '', email: '' },
	setSignInDetails: () => { 
		console.log('setSigninDetails is not loaded yet')
	},
	newPassword: '',
};

export const AuthContext = React.createContext(defaultState);

export const AuthIsSignedIn: React.FunctionComponent = ({ children }) => {
	const { authStatus }: IAuth = useContext(AuthContext);

	return <>{authStatus === AuthStatus.SignedIn ? children : null}</>;
};

export const AuthIsNotSignedIn: React.FunctionComponent = ({ children }) => {
	const { authStatus }: IAuth = useContext(AuthContext);

	return <>{authStatus !== AuthStatus.SignedIn ? children : null}</>;
};

const AuthProvider: React.FunctionComponent = ({ children }) => {
	const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);
	const [sessionInfo, setSessionInfo] = useState({});
	const [signInDetails, setSignInDetails] = useState({
		email: '',
		password: '',
	});
	const [newPassword, setNewPassword] = useState('');
	const [isNewUser, setIsNewUser] = useState(false);
	const [userAttributes, setUserAttributes] = useState({});

	useEffect(() => {
		async function getSessionInfo() {
			try {
				const session: any = await getSession();
				console.log(
					'🚀 ~ file: auth.tsx ~ line 66 ~ getSessionInfo ~ session',
					session
				);
				setSessionInfo({
					accessToken: session.accessToken.jwtToken,
					refreshToken: session.refreshToken.token,
				});
				window.localStorage.setItem(
					'accessToken',
					`${session.accessToken.jwtToken}`
				);
				window.localStorage.setItem(
					'refreshToken',
					`${session.refreshToken.token}`
				);
				setAuthStatus(AuthStatus.SignedIn);
			} catch (err) {
        console.log("🚀 ~ file: index.tsx ~ line 103 ~ getSessionInfo ~ err", err)
				setAuthStatus(AuthStatus.SignedOut);
			}
		}
		getSessionInfo();
	}, [setAuthStatus, authStatus]);

	const completeNewPassword = async () => {
		const response: any = await AWSService.completeNewPasswordChallenge(
			userAttributes,
			newPassword
		);
		if (!response.success) {
			// TODO: Navigate to right screen
		}
	};

	const signIn = async () => {
		const { email, password } = signInDetails;
		const response: any = await AWSService.signInWithEmail(email, password);
		if (!response.success) {
			if (
				response?.data?.error?.message === NEW_PASSWORD_REQUIRED_ERROR
			) {
				setUserAttributes(response?.data?.attributes);
				setIsNewUser(true);
				return;
			}
			if (response?.data?.error?.message === WRONG_CREDS_ERROR) {
				// TODO: show toast
				return;
			}
		}
		if (response?.success) {
			setAuthStatus(AuthStatus.SignedIn);
			// TODO: Navigate to right screen
		}
	};

	const signOut = () => {
		AWSService.signOut();
		setAuthStatus(AuthStatus.SignedOut);
		// TODO: Navigate to right screen
	};

	const getSession = async () => {
		try {
			const session = await AWSService.getSession();
			return session;
		} catch (err) {
			throw err;
		}
	};

	const forgotPassword = async (
		username: string,
		code: string,
		password: string
	) => {
		try {
			await AWSService.forgotPassword(username, code, password);
		} catch (err) {
			throw err;
		}
	};

	const changePassword = async (
		username: string,
		oldPassword: string,
		newPassword: string
	) => {
		try {
			await AWSService.changePassword(username, oldPassword, newPassword);
		} catch (err) {
			throw err;
		}
	};

	const state: IAuth = {
		authStatus,
		sessionInfo,
		signIn,
		signOut,
		getSession,
		isNewUser,
		setSignInDetails,
		completeNewPassword,
		setNewPassword,
		signInDetails,
		newPassword,
		forgotPassword,
		changePassword,
	};

	return (
		<AuthContext.Provider value={state}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;