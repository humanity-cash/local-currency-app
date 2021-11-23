import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";
import { 
	BaseResponse, 
	CognitoBusinessAttributes, 
	CognitoBusinessUpdateAttributes, 
	CognitoCustomerAttributes, 
	CognitoCustomerAttributesUpdate, 
	CognitoSharedUserAttributes, 
	CognitoResponse
} from 'src/auth/cognito/types';
import { Dispatch, SetStateAction } from "react";

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

export type AccountUpdate = CognitoCustomerAttributesUpdate | CognitoBusinessUpdateAttributes | CognitoSharedUserAttributes

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
	website?: string,
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

export interface ForgotPassword {
	email: string,
	verificationCode: string,
	newPassword: string
}

export interface IAuth {
	forgotPasswordDetails: ForgotPassword, 
	setForgotPasswordDetails?: any,
	userType?: UserType | undefined,
	updateUserType?: any,
	setAuthStatus?: any,
	startForgotPasswordFlow: () => Promise<BaseResponse<unknown>>,
	completeForgotPasswordFlow: () => Promise<BaseResponse<unknown>>,
	completeBusniessBasicVerification?: any,
	completedCustomerVerification: boolean,
	completedBusinessVerification: boolean,
	cognitoId?: string,
	customerDwollaId?: string,
	businessDwollaId?: string,
	setCustomerDwollaId?: Dispatch<SetStateAction<string>>,
	setBusinessDwollaId?: Dispatch<SetStateAction<string>>,
	userAttributes?: any,
	completeCustomerBasicVerification?: any,
	updateAttributes: (update: AccountUpdate) => Promise<BaseResponse<string | undefined>>;
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
	setCustomerDwollaInfo?: Dispatch<SetStateAction<DwollaInfo>>,
	completeCustomerDwollaInfo?: (update: DwollaInfo) => CognitoResponse<string | undefined>,
	setBusinessDwollaInfo?: Dispatch<SetStateAction<DwollaInfo>>,
	completeBusinessDwollaInfo?: (update: DwollaInfo) => CognitoResponse<string | undefined>,
	changePassword?: any,
	isSignUp: boolean,
	setIsSignUp: Dispatch<SetStateAction<boolean>>
}

//@ts-ignore
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