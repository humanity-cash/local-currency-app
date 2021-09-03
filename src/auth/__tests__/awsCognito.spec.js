// /* eslint-disable jest/no-disabled-tests */
// import * as userAuth from '../aws-cognito';

// /**This user is already signed up + verified */
// const authed = {
// 	email: 'esraa@keyko.io',
// 	password: 'Esraa@keyko1',
// } 

// describe('AWS Cognito', () => {
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
// 	it.skip('signin', async () => {
// 		// console.log('signIn', signIn)
// 		// await userAuth.signUp({email , password})
// 		// await userAuth.confirmEmailVerificationCode({email: 'esraa@keyko.io', code: '852004'})
// 		const response = await userAuth.signIn({ email: authed.email, password: authed.password })
//     // console.log("🚀 ~ file: awsCognito.spec.js ~ line 11 ~ it ~ response", response)
// 		expect(response.success).toEqual(true)
// 		const keys = Object.keys(response.data)
// 		expect(keys.length).toEqual(4)

// 		// await userAuth.updateUserAttributes({ update: {'custom:city': "newCity"} })
// 		// await userAuth.getUserAttributes()
// 		expect(1).toEqual(1)
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