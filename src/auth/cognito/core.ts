/** This file includes the lowest layer of integration with AWS Cognito */
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession, ICognitoUserAttributeData, ISignUpResult } from 'amazon-cognito-identity-js';
import { SignUpInput } from '../types';
import { NOT_AUTHENTICATED } from './consts';
import { CognitoError, CognitoResponse } from './types';

/**Authenticated Account*/

export const getSession = async (user: CognitoUser | null): CognitoResponse<CognitoUserSession | undefined> =>
	new Promise(function (resolve) {
		if (!user) resolve({ ...NOT_AUTHENTICATED, user });
		else user.getSession(function (err: CognitoError, session: CognitoUserSession | undefined) {
			if (err || !session?.isValid()) resolve({ user, success: false, data: { error: err.code } })
			else resolve({ user, success: true, data: session })
		})
	})

export const signOut = (user: CognitoUser | null): void => user?.signOut()

export const getUserAttributes = (user: CognitoUser | null): CognitoResponse<CognitoUserAttribute[] | undefined> =>  //currentUser
	new Promise((resolve) => {
		if (!user) resolve(NOT_AUTHENTICATED)
		else user.getUserAttributes((error: CognitoError, result: CognitoUserAttribute[] | undefined) => {
			if (error) resolve({ user, success: false, data: { error: error.code } })
			else resolve({ user, success: true, data: result })
		});
	})

export const updateUserAttributes = (user: CognitoUser | null, attributesList: (CognitoUserAttribute | ICognitoUserAttributeData)[]) // currentUser
	: CognitoResponse<string | undefined> =>
	new Promise((resolve) => {
		if (!user) resolve(NOT_AUTHENTICATED)
		else {
			user.updateAttributes(attributesList, (err: CognitoError, result: string | undefined) => {
				if (err) resolve({ user, success: false, data: { error: err.code } })
				else resolve({ user, success: true, data: result })
			});
		}
	})


export const deleteUser = async (user: CognitoUser | null): Promise<CognitoResponse<string | undefined>> =>  // currentUser
	new Promise((resolve) => {
		if (!user) return resolve(NOT_AUTHENTICATED)
		else user.deleteUser((err: CognitoError, result: string | undefined) => {
			if (err) resolve({ user, success: false, data: { error: err.code } })
			else resolve({ user, success: true, data: result })
		});
	})


/**NOT Authenticated Account*/

export const authenticateUser = (user: CognitoUser | null, authenticationDetails: AuthenticationDetails)
	: CognitoResponse<CognitoUserSession> => {
	return new Promise(function (resolve) {
		if (!user) resolve({ user, success: false, data: { error: 'Email not registered!' } })
		else return user.authenticateUser(authenticationDetails, {
			onSuccess: async function (response: CognitoUserSession) {
				
				resolve({ user, success: true, data: response });
			},
			onFailure: function (error: CognitoError) {
				console.log("error", error);
				resolve({ user, success: false, data: { error: error.code } });
			},
		})
	})
}

/**
 * First step In Forgot Password process
 */
export const forgotPassword = (user: CognitoUser | null)
	: CognitoResponse<unknown> => {
	return new Promise(function (resolve) {
		if (!user) resolve({ user, success: false, data: { error: 'Email not registered!' } })
		else return user.forgotPassword({
			onSuccess: function () {
				resolve({ user, success: true, data: {} });
			},
			onFailure: function (error: CognitoError) {
				resolve({ user, success: false, data: { error: error.code } });
			},
		})
	})
}


/**
 * Second step In Forgot Password process
 */
export const setNewPassword = (user: CognitoUser | null, verificationCode: string, newPassword: string)
	: CognitoResponse<unknown> => {
	return new Promise(function (resolve) {
		if (!user) resolve({ user, success: false, data: { error: 'Email not registered!' } })
		else return user.confirmPassword(verificationCode, newPassword, {
			onSuccess: function () {
				resolve({ user, success: true, data: {} });
			},
			onFailure: function (error: CognitoError) {
				resolve({ user, success: false, data: { error: error.code } });
			},
		});
	})
}

export const signUp = async (userPool: CognitoUserPool, { email, password, attributeList }: SignUpInput)
	: CognitoResponse<ISignUpResult | undefined> =>
	new Promise((resolve) => {
		userPool.signUp(email, password, attributeList, attributeList,
			(err: CognitoError, result: ISignUpResult | undefined) => {
				if (err) resolve({ success: false, data: { error: err.code } })
				else resolve({ success: true, data: result })
			})
	});

export const confirmEmailVerificationCode = (user: CognitoUser, code: string)
	: CognitoResponse<unknown> =>
	new Promise((resolve) => {
		user.confirmRegistration(code, true, (err: CognitoError, result) => {
			if (err) resolve({ user, success: false, data: { error: err.code } });
			else resolve({ user, success: true, data: result })
		});
	})


export const resendEmailVerificationCode = (user: CognitoUser): CognitoResponse<unknown> =>
	new Promise((resolve) => {
		user.resendConfirmationCode(function (err) {
			if (err) resolve({ user, success: false, data: {} });
			else resolve({ user, success: true, data: {} });
		});
	})
