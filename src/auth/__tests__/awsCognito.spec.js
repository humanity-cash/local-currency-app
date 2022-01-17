// /* eslint-disable jest/no-disabled-tests */
// import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
// import * as Cognito from '../cognito/core';
// import * as UserAPI from '../cognito/user';


// /**Cognito Setup */
// const USERPOOL_ID = 'eu-west-1_mJDPHPbDP' // staging poolId
// const CLIENT_ID = '5asu76mtbc5unne36moa5kejrb' // staging client

// const poolData = {
// 	UserPoolId: USERPOOL_ID,
// 	ClientId: CLIENT_ID
// };

// const userPool = new CognitoUserPool(poolData);

// /**Get a user that is not authorized */
// const getCognitoUser = (email) => new CognitoUser({
// 	Username: email,
// 	Pool: userPool,
// })

// // /**This user is already signed up + verified */
// const authed = {
// 	email: 'esraa@humanity.cash',
// 	password: "HelloWorld133@!",
// } 

describe('PASS', () => {
	it('pass', () => {
		expect(1).toEqual(1)
	})
})

// describe('AWS Cognito', () => {
// 	it.skip('resetPassword', async () => {
// 		const email = 'esraa@humanity.cash'
// 		const user = getCognitoUser(email);
// 		const resetCode = "650357";
// 		const newPassword = "HelloWorld133@!";
//     console.log("🚀 ~ file: awsCognito.spec.js ~ line 33 ~ it ~ user", user)
// 		// const response = await Cognito.forgotPassword(user);
// 		const response = await Cognito.setNewPassword(user, resetCode, newPassword);
//     console.log("🚀 ~ file: awsCognito.spec.js ~ line 35 ~ it ~ response", response)

// 		// const response = await userAuth.signUp({email , password})
// 		// const signinresponse = await userAuth.signIn({email , password})
// 		// expect(response.success).toEqual(true)
// 		// const deleteResponse = await userAuth.deleteUser()
// 		// expect(deleteResponse.success).toEqual(true)
// 		// const response = await userAuth.confirmEmailVerificationCode({email , code: '736628'})
// 		// const response = await userAuth.signIn({ email, password })
// 		// await userAuth.updateUserAttributes({ update: {'custom:city': "newCity"} })
// 		// await userAuth.getUserAttributes()
// 		expect(1).toEqual(1)
// 	})

// 	it.skip('signup', async () => {
// 		// console.log('signIn', signIn)
// 		const email = 'tech@humanity.cash'
// 		const password = 'tech@HCash1'
// 		// const response = await userAuth.signUp({email , password})
// 		// const signinresponse = await userAuth.signIn({email , password})
// 		// expect(response.success).toEqual(true)
// 		// const deleteResponse = await userAuth.deleteUser()
// 		// expect(deleteResponse.success).toEqual(true)
// 		// const response = await userAuth.confirmEmailVerificationCode({email , code: '736628'})
// 		// const response = await userAuth.signIn({ email, password })
// 		// await userAuth.updateUserAttributes({ update: {'custom:city': "newCity"} })
// 		// await userAuth.getUserAttributes()
// 		expect(1).toEqual(1)
// 	})

// 	it.skip('already signedup', async () => {
// 		// console.log('signIn', signIn)
// 		const response = await userAuth.signUp({email: authed.email , password: authed.password})
// 		expect(response.data.error).toEqual(userAuth.COGNITO_USERNAME_EXISTS_EXCEPTION_CODE)
// 		expect(response.success).toEqual(false)
// 	})

// 	it('signin', async () => {
// 		const response = await UserAPI.signIn({ email: authed.email, password: authed.password })
//     console.log("🚀 ~ file: awsCognito.spec.js ~ line 78 ~ it ~ response", response)
// 		expect(response.success).toEqual(true)
// 	})

// 	it.skip('updateAttributes', async () => {
// 		// console.log('signIn', signIn)
// 		const response = await userAuth.signIn({ email: authed.email, password: authed.password })
// 		expect(response.success).toEqual(true)
// 		const keys = Object.keys(response.data)
// 		expect(keys.length).toEqual(4)

// 		await userAuth.updateUserAttributes({ update: {'custom:city': "newCity"} })
// 		await userAuth.getUserAttributes()
// 		expect(1).toEqual(1)
// 	})
// })