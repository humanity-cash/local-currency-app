/**
 * This file includes the user functions we need in order to interact with Cognito - this is the exposed api
 * which gets called from the auth context. the core.ts file holds the internal functions that
 * communicate directly with AWS.
 */
import { AuthenticationDetails, CognitoUserAttribute, CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';
import { BusinessBasicVerification, CustomerBasicVerification } from 'src/auth/types';
import { CognitoCustomerAttributes, CognitoBusinessAttributes, CognitoSharedUserAttributes, CognitoBusinessDwollaAttributes, CognitoCustomerDwollaAttributes, CognitoResponse } from 'src/auth/cognito/types';
import { SignInInput } from '../types';
import * as Core from './core';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import * as Utils from './utils'

/**Cognito Setup */
const USERPOOL_ID = 'eu-west-1_mJDPHPbDP' // staging poolId
const CLIENT_ID = '5asu76mtbc5unne36moa5kejrb' // staging client

const poolData = {
	UserPoolId: USERPOOL_ID,
	ClientId: CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

let currentUser: CognitoUser | null = userPool.getCurrentUser();

/**Get a user that is not authroised */
const getCognitoUser = (email: string): CognitoUser => new CognitoUser({
	Username: email,
	Pool: userPool,
})

export const getSession = async (): CognitoResponse<CognitoUserSession | undefined> => {
	const response = await Core.getSession(currentUser);

	return response;
}

/**SignUp with Email + Password */
export const signUp = async (email: string, password: string)
	: Promise<{ success: boolean, data: { error: string } | ISignUpResult | undefined }> => {
	const attributeList: CognitoUserAttribute[] = Utils.buildSignUpAttributeList(email);
	const response = await Core.signUp(userPool, { email, password, attributeList });
	return response;
};


/**SignIn with email and password */
export const signIn = async ({ email, password }: SignInInput): CognitoResponse<CognitoUserSession> => {
	currentUser = getCognitoUser(email);
	const authenticationDetails = new AuthenticationDetails({
		Username: email,
		Password: password,
	});
	const response = await Core.authenticateUser(currentUser, authenticationDetails);
	return response;
};


export const signOut = (): void =>
	Core.signOut(currentUser)


/**Confirm verification entered by user */
export const confirmEmailVerificationCode = async (email: string, code: string)
	: CognitoResponse<any> => {
	const cognitoUser = getCognitoUser(email);
	const response = await Core.confirmEmailVerificationCode(cognitoUser, code);

	return response;
};

export const resendEmailVerificationCode = async (email: string): CognitoResponse<unknown> => {
	const cognitoUser = getCognitoUser(email);
	const response = await Core.resendEmailVerificationCode(cognitoUser);

	return response;
};

/**Returns users properties we save in AWS */
export const getAttributes = async (): CognitoResponse<CognitoUserAttribute[] | undefined> => {
	const response = await Core.getUserAttributes(currentUser);

	return response;
};

export const deleteUser = async (): CognitoResponse<string | undefined> => {
	const response = await Core.deleteUser(currentUser);

	return response;
};

/**Update users properties we save in AWS */
export const updateUserAttributes = async (update: CognitoBusinessAttributes | CognitoCustomerAttributes | CognitoSharedUserAttributes | CognitoBusinessDwollaAttributes | CognitoCustomerDwollaAttributes)
	: CognitoResponse<string | undefined> => {
	const attributesList = Utils.buildUpdateUserAttributes(update);
	const response = await Core.updateUserAttributes(currentUser, attributesList);

	return response;
};

/**Completes basic customer verifications */
export const completeCustomerBasicVerification = async (data: CustomerBasicVerification)
	: CognitoResponse<string | undefined> => {
	const attributesList = Utils.buildUpdateUserAttributes(Utils.buildCompleteCustomerVerificationObject(data));
	const response = await Core.updateUserAttributes(currentUser, attributesList);

	return response;
}

/**Completes basic business verifications */
export const completeBusinessBasicVerification = async (data: BusinessBasicVerification)
	: CognitoResponse<string | undefined> => {
	const attributesList = Utils.buildUpdateUserAttributes(Utils.buildCompleteBusinessVerificationObject(data));
	const response = await Core.updateUserAttributes(currentUser, attributesList);

	return response;
}