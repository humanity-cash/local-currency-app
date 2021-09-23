import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { CognitoBusinessAttributes, CognitoCustomerAttributes } from 'src/auth/cognito/types';

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
	type: string,
	dwollaId?: string,
	resourceUri?: string,
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
	dwollaId?: string,
	resourceUri?: string,
}

export interface DwollaInfo {
	dwollaId: string,
	resourceUri: string,
};

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
	updateUserType?: any,
	setAuthStatus?: any,
	completeBusniessBasicVerification?: any,
	completedCustomerVerification: boolean,
	completedBusinessVerification: boolean,
	cognitoId?: string,
	customerDwollaId?: string,
	businessDwollaId?: string,
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
	setBuisnessBasicVerification?: any,
	setCustomerDwollaInfo?: any,
	completeCustomerDwollaInfo?: any,
	setBusinessDwollaInfo?: any,
	completeBusinessDwollaInfo?: any,
}

export const defaultState: IAuth = {
	completedCustomerVerification: false,
	completedBusinessVerification: false,
	sessionInfo: {},
	authStatus: AuthStatus.Loading,
	signInDetails: { password: '', email: '' },
	isVerified: false,
	setSignInDetails: () => {
		console.log('setSigninDetails is not loaded yet')
	},
};

// export interface IAuth {
// 	userType?: UserType | undefined,
// 	updateUserType?: (type: UserType) => void,
// 	setAuthStatus?: (auth: AuthStatus) => void,
// 	completeBusniessBasicVerification?: (update: BusinessBasicVerification) => Promise<CognitoResponse<string | undefined>>,
// 	userAttributes?: any,
// 	completeCustomerBasicVerification?: (update: CustomerBasicVerification) => Promise<CognitoResponse<string | undefined>>,
// 	updateAttributes?: any;
// 	sessionInfo?: Session;
// 	resendEmailVerificationCode?: () => Promise<BaseResponse<unknown>>;
// 	signIn?: (email: string, password: string) => Promise<BaseResponse<CognitoUserSession>>;
// 	authStatus: AuthStatus;
// 	setSignInDetails?: (data: { email?: string, password?: string }) => void;
// 	signInDetails?: { password: string, email: string };
// 	signOut?: () => void;
// 	getAttributes?: () => Promise<CognitoResponse<CognitoUserAttribute[] | undefined>>;
// 	signUpDetails?: { password: string, confirmPassword: string, email: string };
// 	setSignUpDetails?: any;
// 	emailVerification?: (verificationCode: string) => Promise<CognitoResponse<any>>;
// 	signUp?: () => Promise<CognitoResponse<ISignUpResult | undefined>>;
// 	setCustomerBasicVerificationDetails?: any;
// 	customerBasicVerificationDetails?: CustomerBasicVerification;
// 	buisnessBasicVerification?: BusinessBasicVerification,
// 	setBuisnessBasicVerification?: any
	// completedCustomerVerification: boolean,
	// completedBusinessVerification: boolean,
// }
