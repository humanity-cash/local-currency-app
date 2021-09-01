import React, { useEffect, useState } from 'react';
import  * as AWSService  from './aws-cognito';
import { UpdateUserAttributesInput } from './types';
import { UserType } from 'src/utils/types';

/**AWS COGNITO ERRORS */
export const NEW_PASSWORD_REQUIRED_ERROR = 'newPasswordRequiredError'
export const WRONG_CREDS_ERROR = 'Incorrect username or password.'
export enum AuthStatus {
	Loading,
	SignedIn,
	SignedOut,
}

interface Session {
		username?: string;
		email?: string;
		sub?: string;
		accessToken?: string;
		refreshToken?: string;
}

export interface IAuth {
	updateAttributes?: any;
	sessionInfo?: Session;
	resendEmailVerificationCode?: any;
	authStatus?: AuthStatus;
	userType?: UserType;
	setUserType?: any;
	signIn?: any;
	setSignInDetails: any;
	signInDetails: { password: string; email: string };
	signOut?: any;
	getSession?: any;
	getAttributes?: any;
	signUpDetails?: any;
	setSignUpDetails?: any;
	emailVerification?: any;
	signUp?: any;
}

const defaultState: IAuth = {
	sessionInfo: {},
	authStatus: AuthStatus.Loading,
	signInDetails: { password: '', email: '' },
	setSignInDetails: () => { 
		console.log('setSigninDetails is not loaded yet')
	},
};

export const AuthContext = React.createContext(defaultState);

const AuthProvider: React.FunctionComponent = ({ children }) => {
	const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);
	const [userType, setUserType] = useState(UserType.PERSONAL);
	const [sessionInfo, setSessionInfo] = useState({});
	const [signInDetails, setSignInDetails] = useState({
		email: 'tech@humanity.cash',
		password: 'Esraa@keyko1',
	});
	const [signUpDetails, setSignUpDetails] = useState({
		email: 'tech@humanity.cash',
		password: 'Esraa@keyko1',
		confirmPassword: 'Esraa@keyko1',
	});

	const [userAttributes, setUserAttributes] = useState({});

	useEffect(() => {
		async function getSessionInfo() {
			try {
				const response: any = await getSession();
				if (response.success) {
					setSessionInfo({
						accessToken: response.data.accessToken.jwtToken,
						refreshToken: response.data.refreshToken.token,
					});
					setAuthStatus(AuthStatus.SignedIn);
				} else {
					setAuthStatus(AuthStatus.SignedOut);
				}
			} catch (err) {
				setAuthStatus(AuthStatus.SignedOut);
			}
		}
		getSessionInfo();
	}, [authStatus]);

	const emailVerification = async (verificationCode: string) => {
		const { email } = signUpDetails;
		const response: any = await AWSService.confirmEmailVerificationCode({
			email,
			code: verificationCode,
		});
		return response;
	};

	const resendEmailVerificationCode = async () => {
		const { email } = signUpDetails;
		const response: any = await AWSService.resendEmailVerificationCode({
			email,
		});

		return response;
	};

	const signUp = async () => {
		const { email, password } = signUpDetails;
		const response: any = await AWSService.signUp({ email, password });
		return response;
	};

	const signIn = async ({
		email = signUpDetails.email,
		password = signUpDetails.password,
	} = {}) => {
		const response: any = await AWSService.signIn({ email, password });
		if (!response.success) {
			if (
				response?.data?.error?.message === NEW_PASSWORD_REQUIRED_ERROR
			) {
				return;
			}
			if (response?.data?.error?.message === WRONG_CREDS_ERROR) {
				return;
			}
		}
		if (response?.success) {
			setUserAttributes(response.data.idToken.payload);
			setAuthStatus(AuthStatus.SignedIn);
		}
	};

	const getAttributes = async () => {
		const response = await AWSService.getUserAttributes();

		return response;
	};


	const updateAttributes = async ({ update }: UpdateUserAttributesInput) => {
		const response = await AWSService.updateUserAttributes({ update });

		return response;
	};

	const signOut = () => {
		AWSService.signOut()
		setAuthStatus(AuthStatus.SignedOut);
	};

	const getSession = async () => {
		const session = await AWSService.getSession();

		return session;
	};

	const state: IAuth = {
		getAttributes,
		updateAttributes,
		authStatus,
		userType,
		setUserType,
		sessionInfo,
		signIn,
		signOut,
		signUp,
		getSession,
		setSignInDetails,
		signInDetails,
		signUpDetails,
		setSignUpDetails,
		emailVerification,
		resendEmailVerificationCode
	};

	return (
		<AuthContext.Provider value={state}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;