import { CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js";

export interface CustomerBasicVerification  {
	'profilePicture'?: string
	'tag'?: string
	'address1'?: string
	'address2'?: string
	'city'?: string
	'state'?: string
	'postalCode'?: string
	'basicVerification'?: string
	'firstName'?: string
	'lastName'?: string
	'consent'?: string
	'type'?: string
 };

export interface UserAttributes {
	'custom:profilePicture'?: string
	'custom:tag'?: string
	'custom:firstName'?: string
	'custom:lastName'?: string
	'custom:address1'?: string
	'custom:address2'?: string
	'custom:city'?: string
	'custom:state'?: string
	'custom:postalCode'?: string
	'custom:basicVerification'?: string
	'custom:consent'?: string
	'custom:type'?: string
}

export const REQUIRED_BASIC_DETAILS = [ 
	'custom:profilePicture',
	'custom:tag',
	'custom:address1',
	'custom:address2',
	'custom:city',
	'custom:state',
	'custom:postalCode',
];

export interface UpdateUserAttributesInput {
	user: CognitoUser
	update: UserAttributes
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

export type BaseResponse<T> = { user?: CognitoUser | null, success: boolean, data: { error: string } | T }
export type CognitoResponse<T> = Promise<BaseResponse<T>>
export type CogResponse<T> = { success: boolean, data: { error: string } | T }

/**AWS COGNITO ERRORS */
export const COGNITO_USERNAME_EXISTS_EXCEPTION_CODE = 'UsernameExistsException'
export const NEW_PASSWORD_REQUIRED_ERROR = 'newPasswordRequiredError'
export const WRONG_CREDS_ERROR = 'Incorrect username or password.'

export enum AuthStatus {
	Loading,
	NotVerified, //SignedIn but not verified
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
	completeBasicVerification?: any;
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

export interface BusinessBasicVerification {
	story: string,
	tag: string,
	profilePicture: string,
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

export const defaultState: IAuth = {
	sessionInfo: {},
	authStatus: AuthStatus.Loading,
	signInDetails: { password: '', email: '' },
	isVerified: false,
	setSignInDetails: () => { 
		console.log('setSigninDetails is not loaded yet')
	},
};

export interface ResendEmailVerificationCodeInput {
	email: string
}