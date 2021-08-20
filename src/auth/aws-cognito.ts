/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';
import { CognitoResponse, ConfirmEmailVerificationCodeInput, SignInInput, SignUpInput, UpdateUserAttributesInput } from './types';

/**AWS COGNITO ERRORS */
export const COGNITO_USERNAME_EXISTS_EXCEPTION_CODE = 'UsernameExistsException'
export const NEW_PASSWORD_REQUIRED_ERROR = 'newPasswordRequiredError'
export const WRONG_CREDS_ERROR = 'Incorrect username or password.'

const USERPOOL_ID = 'eu-west-1_Bwp861D2I'
const CLIENT_ID = '3arqlv58bqfepqg262fcdep3cq'

const poolData = {
	UserPoolId: USERPOOL_ID,
	ClientId: CLIENT_ID
};

const userPool: CognitoUserPool = new CognitoUserPool(poolData)

let currentUser: CognitoUser | null = userPool.getCurrentUser()

export const getCurrentUser = (): CognitoUser | null => currentUser

const getCognitoUser = (email: string): CognitoUser => new CognitoUser({
	Username: email,
	Pool: userPool,
})

export const getSession = async (): CognitoResponse<CognitoUserSession | null> => {

	return new Promise(function (resolve) {
		currentUser?.getSession(function (err: any, session: CognitoUserSession | null) {
			if (err) resolve({ success: false, data: { error: err.code } })
			else resolve({ success: true, data: session })
		})
	})
}

export const signUp = async ({ email, password }: SignUpInput)
	: Promise<{ success: boolean, data: { error: string } | ISignUpResult | undefined }> => {
	const attributeList: CognitoUserAttribute[] = [];
	const dataEmail = { Name: 'email', Value: email.trim() };
	const attributeEmail = new CognitoUserAttribute(dataEmail);
	attributeList.push(attributeEmail);

	return new Promise((resolve) => {
		userPool.signUp(email, password, attributeList, attributeList,
			(err: any, result: ISignUpResult | undefined) => {
				if (err) {
					resolve({ success: false, data: { error: err.code } })
				}
				else resolve({ success: true, data: result })
			})
	})
};

export const signIn = async ({ email, password }: SignInInput): CognitoResponse<CognitoUserSession> => {
	return new Promise(function (resolve) {
		const authenticationData = {
			Username: email,
			Password: password,
		}
		const authenticationDetails = new AuthenticationDetails(authenticationData)
		currentUser = getCognitoUser(email)
		if (!currentUser) resolve({ success: false, data: { error: 'Email not registered!' } })
		return currentUser.authenticateUser(authenticationDetails, {
			onSuccess: async function (response: CognitoUserSession) {
				resolve({ success: true, data: response });
			},
			onFailure: function (error: any) {
				resolve({ success: false, data: { error: error.code } });
			},
		})
	})
}

export const signOut = (): void => {
	const currentUser = userPool.getCurrentUser()
	if (currentUser) {
		return currentUser.signOut()
	}
}

export const confirmEmailVerificationCode = ({ email, code }: ConfirmEmailVerificationCodeInput)
	: Promise<{ success: boolean, data: any }> => {
	const cognitoUser = getCognitoUser(email);
	return new Promise((resolve) => {
		cognitoUser.confirmRegistration(code, true, function (err: any, result) {
			if (err) {
				resolve({ success: false, data: { error: err.code } });
			} else resolve({ success: true, data: result })
			console.log('call result: ' + result);
		});
	})
}

interface ResendEmailVerificationCodeInput {
	email: string
}

export const resendEmailVerificationCode = ({ email }: ResendEmailVerificationCodeInput): void => {
	const cognitoUser = getCognitoUser(email);
	cognitoUser.resendConfirmationCode(function (err, result) {
		if (err) {
			console.log("🚀 ~ file: aws-cognito.ts ~ line 130 ~ err", err)
			return;
		}
		console.log('call result: ' + result);
	});
}

export const updateUserAttributes = ({ update }: UpdateUserAttributesInput)
	: CognitoResponse<string | undefined> => {
	const updateNames = Object.keys(update)
	const attributes = updateNames.map((name: any) => {
		//@ts-ignore
		const attribute = { Name: name, Value: update[name] };
		return new CognitoUserAttribute(attribute);
	})
	return new Promise((resolve) => {
		if (!currentUser) resolve({ success: false, data: { error: 'userNotAuthed' } })
		else {
			currentUser.updateAttributes(attributes, function (err: any, result) {
				if (err) resolve({ success: false, data: { error: err.code } })
				else resolve({ success: true, data: result })
			});
		}
	})
}

export const getUserAttributes = () => {
	if (!currentUser) return
	currentUser.getUserAttributes(function (err, result) {
		if (err) {
			console.log("🚀 ~ file: aws-cognito.ts ~ line 186 ~ err", err)
			return;
		}
		if (!result) return
		console.log("🚀 ~ file: aws-cognito.ts ~ line 186 ~ result", result)
		for (let i = 0; i < result.length; i++) {
			console.log(
				'attribute ' + result[i].getName() + ' has value ' + result[i].getValue()
			);
		}
	});
}

export const deleteUser = async (): Promise<{ success: boolean, data: any }> => {
	return new Promise((resolve) => {
		if (!currentUser) return resolve({ success: false, data: { error: 'userNotAuthed' } })
		currentUser.deleteUser(function (err: any, result: any) {
			if (err) {
				console.log("🚀 ~ file: aws-cognito.ts ~ line 199 ~ err", err)
				resolve({ success: false, data: { error: err.code } })
			} else {
				resolve({ success: true, data: result })
			}
		});
	})
}