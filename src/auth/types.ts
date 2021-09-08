import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { CognitoCustomerAttributes, CognitoBusinessAttributes } from 'src/auth/cognito/types';

export interface CustomerBasicVerification {
	avatar: string
	tag: string
	address1: string
	address2: string
	city: string
	state: string
	postalCode: string
	firstName: string
	lastName: string
	type: string
};

export interface BusinessBasicVerification {
	story: string,
	tag: string,
	avatar: string,
	type: string,
	owner: {
		firstName: string,
		lastName: string,
		address1: string,
		address2: string,
		city: string,
		state: string,
		postalCode: string,
	},
	registeredBusinessName: string,
	industry: string,
	ein: string,
	address1: string,
	address2: string,
	city: string,
	state: string,
	postalCode: string,
	phoneNumber?: string,
}

/**Shared Update attributes input between Customer and Business */
export interface UpdateUserAttributesInput {
	user: CognitoUser
	update: CognitoCustomerAttributes | CognitoBusinessAttributes
}

export interface SignInInput {
	email: string
	password: string
}

export interface SignUpInput {
	email: string
	password: string
	attributeList: CognitoUserAttribute[]
}

export interface ConfirmEmailVerificationCodeInput {
	code: string
}


export enum UserType {
	Customer,
	Business,
	Cashier,
}

export enum AuthStatus {
	Loading,
	NotVerified, // Signed In but didnt complete verification for customer nor business
	SignedIn,
	SignedOut,
}

export interface Session {
	username?: string;
	email?: string;
	sub?: string;
	accessToken?: string;
	refreshToken?: string;
}

export interface IAuth {
	userType?: any,
	setUserType?: any,
	completeBusniessBasicVerification?: any,
	userAttributes?: any,
	completeCustomerBasicVerification?: any,
	updateAttributes?: any;
	sessionInfo?: Session;
	resendEmailVerificationCode?: any;
	authStatus?: AuthStatus;
	signIn?: any;
	setSignInDetails?: any;
	signInDetails?: { password: string; email: string };
	signOut?: any;
	getSession?: any;
	getAttributes?: any;
	signUpDetails?: any;
	setSignUpDetails?: any;
	emailVerification?: any;
	updateAttributeAfterSignUp?: any;
	signUp?: any;
	isCustomerVerified?: any;
	isVerified?: boolean;
	setCustomerBasicVerificationDetails?: any;
	customerBasicVerificationDetails?: any;
	buisnessBasicVerification?: any,
	setBuisnessBasicVerification?: any
}

export const defaultState: IAuth = {
	sessionInfo: {},
	authStatus: AuthStatus.Loading,
	signInDetails: { password: '', email: '' },
	isVerified: false,
	setSignInDetails: () => {
		console.log('setSigninDetails is not loaded yet')
	},
};