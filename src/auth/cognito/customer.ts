import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';
import { CognitoResponse, UserAttributes } from 'src/auth/types';
import { SignInInput } from '../types';
import * as Core from './core';

const USERPOOL_ID = 'eu-west-1_Bwp861D2I'
const CLIENT_ID = '3arqlv58bqfepqg262fcdep3cq'

const poolData = {
	UserPoolId: USERPOOL_ID,
	ClientId: CLIENT_ID
};

const userPool = new CognitoUserPool(poolData)

let currentUser: CognitoUser | null = userPool.getCurrentUser()

export const getCurrentUser = (): CognitoUser | null => currentUser

const getCognitoUser = (email: string): CognitoUser => new CognitoUser({
	Username: email,
	Pool: userPool,
})

export const getSession = async (): CognitoResponse<CognitoUserSession | null> => {
	const response = await Core.getSession(currentUser);
	currentUser = response.user || null;
	return response;
}

export const signUp = async (email: string, password: string)
	: Promise<{ success: boolean, data: { error: string } | ISignUpResult | undefined }> => {
	const attributeList: CognitoUserAttribute[] = Core.buildSignUpAttributeList(email);
	const response = await Core.signUp(userPool, { email, password, attributeList });
	return response;
};


export const signIn = async ({ email, password }: SignInInput): CognitoResponse<CognitoUserSession> => {
	currentUser = getCognitoUser(email);
	const authenticationDetails = new AuthenticationDetails({
		Username: email,
		Password: password,
	});
	const response = await Core.authenticateUser(currentUser, authenticationDetails);
	currentUser = response.user || null;
	return response;
};


export const signOut = (): void =>
	Core.signOut(currentUser)


export const confirmEmailVerificationCode = async (email: string, code: string)
	: CognitoResponse<any> => {
	const cognitoUser = getCognitoUser(email);
	const response = await Core.confirmEmailVerificationCode(cognitoUser, code);
	currentUser = response.user || null;

	return response;
};

export const resendEmailVerificationCode = async (email: string): CognitoResponse<unknown> => {
	const cognitoUser = getCognitoUser(email);
	const response = await Core.resendEmailVerificationCode(cognitoUser);
	currentUser = response.user || null;

	return response;
};

export const updateUserAttributes = async (update: UserAttributes)
	: CognitoResponse<string | undefined> => {
	const attributesList = Core.buildUpdateUserAttributes(update);
	const response = await Core.updateUserAttributes(currentUser, attributesList);
	currentUser = response.user || null;

	return response;
};

export const getUserAttributes = async (): CognitoResponse<CognitoUserAttribute[] | undefined> => {
	const response = await Core.getUserAttributes(currentUser);
	currentUser = response.user || null;

	return response;
};

export const deleteUser = async (): CognitoResponse<string | undefined> => {
	const response = await Core.deleteUser(currentUser);
	currentUser = response.user || null;

	return response;
};