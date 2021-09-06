import { CognitoUserAttribute, CognitoUserSession } from "amazon-cognito-identity-js";
import React, { useEffect, useState } from "react";
import { completedAllVerifications } from "src/auth/verification";
import { Customer } from "./cognito";
import {
	AuthStatus,
	BaseResponse,
	BusinessBasicVerification,
	CognitoResponse,
	CustomerBasicVerification,
	defaultState,
	IAuth, UpdateUserAttributesInput
} from "./types";

export const AuthContext = React.createContext(defaultState);

const AuthProvider: React.FunctionComponent = ({ children }) => {
	const [authStatus, setAuthStatus] = useState(AuthStatus.SignedOut);
	const [isUpdatedAttributes, setIsUpdatedAttributes] = useState(false);
	const [signInDetails, setSignInDetails] = useState({
		email: "esraa@humanity.cash",
		password: "Esraa@keyko1",
	});
	const [signUpDetails, setSignUpDetails] = useState({
		email: "esraa@humanity.cash",
		password: "Esraa@keyko1",
		confirmPassword: "Esraa@keyko1",
	});
	const [customerBasicVerificationDetails, setCustomerBasicVerificationDetails] =
		useState<CustomerBasicVerification>({
			type: "personal",
			tag: "sat",
			profilePicture: "",
			firstName: "Satoshi",
			lastName: "Nakamoto",
			address1: "Satoshi Street 21",
			address2: "Nakamoto Street 21",
			city: "Sato",
			state: "a",
			postalCode: "2100000000",
		});

		const [buisnessBasicVerification, setBuisnessBasicVerification] =
			useState<BusinessBasicVerification>({
				story: "tell a story story",
				tag: "store tag(username)",
				profilePicture: "",
				type: "business type",
				owner: {
					firstName: "Owner first name",
					lastName: "Owner last name",
					address1: "Satoshi Street 21",
					address2: "Nakamoto Street 21",
					city: "Sato",
					state: "a",
					postalCode: "2100000000",
				},
				registeredBusinessName: "Registered Name",
				industry: "Industry",
				ein: "Employee Identification Number",
				address1: "Satoshi Street 21",
				address2: "Nakamoto Street 21",
				city: "Sato",
				state: "a",
				postalCode: "2100000000",
			});

	async function getSessionInfo() {
		try {
			const response: BaseResponse<CognitoUserSession | null> = await Customer.getSession();
			if (response.success) {
				console.log('success')
				const attrs: BaseResponse<CognitoUserAttribute[] | undefined> = await getAttributes();
				const { isVerified } = completedAllVerifications(attrs?.data);
				if (!isVerified) {
					setAuthStatus(AuthStatus.NotVerified);
				} else {
					setAuthStatus(AuthStatus.SignedIn);
				}
			} else {
				setAuthStatus(AuthStatus.SignedOut);
			}
		} catch (err) {
			setAuthStatus(AuthStatus.SignedOut);
		}
	}

	useEffect(() => {
		getSessionInfo();
	}, [authStatus, isUpdatedAttributes]);

	const emailVerification = (verificationCode: string) =>
		Customer.confirmEmailVerificationCode(
			 signUpDetails.email,
			 verificationCode,
		);

	const resendEmailVerificationCode = async () =>
		Customer.resendEmailVerificationCode(
			signUpDetails.email,
		);

	const signUp = async () => {
		const response = await Customer.signUp(
			signUpDetails.email,
			signUpDetails.password
		);
		if (!response?.success) setAuthStatus(AuthStatus.SignedOut);
		else setAuthStatus(AuthStatus.Loading);

		return response;
	};

	const signIn = async (
		email = signInDetails.email,
		password = signInDetails.password
	) => {
		const response: BaseResponse<CognitoUserSession> =
			await Customer.signIn({ email, password });
		if (!response?.success) { // something went wrong in signIn
			setAuthStatus(AuthStatus.SignedOut);
		} else {
			setAuthStatus(AuthStatus.Loading); // Invokes getSession useEffect
		}

		return response;
	};

	const getAttributes = async (): CognitoResponse<CognitoUserAttribute[] | undefined> => Customer.getUserAttributes();

	const completeBasicVerification = async (
		update = customerBasicVerificationDetails
	): CognitoResponse<string | undefined> =>
		Customer.updateUserAttributes({
			"custom:profilePicture": update.profilePicture,
			"custom:tag": update.tag,
			"custom:firstName": update.firstName,
			"custom:lastName": update.lastName,
			"custom:address1": update.address1,
			"custom:address2": update.address2,
			"custom:city": update.city,
			"custom:state": update.state,
			"custom:postalCode": update.postalCode,
		});

	const updateAttributes = async ({ update }: UpdateUserAttributesInput) => {
		const response = await Customer.updateUserAttributes(update);
		setIsUpdatedAttributes(true);
		return response;
	};

	const signOut = () => {
		Customer.signOut();
		setAuthStatus(AuthStatus.SignedOut);
	};

	const state: IAuth = {
		completeBasicVerification,
		getAttributes,
		updateAttributes,
		authStatus,
		signIn,
		signOut,
		signUp,
		setSignInDetails,
		buisnessBasicVerification,
		setBuisnessBasicVerification,
		signInDetails,
		signUpDetails,
		setSignUpDetails,
		customerBasicVerificationDetails,
		setCustomerBasicVerificationDetails,
		emailVerification,
		resendEmailVerificationCode,
	};

	return (
		<AuthContext.Provider value={state}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;

// setSessionInfo({
// 	accessToken: response.data.accessToken.jwtToken,
// 	refreshToken: response.data.refreshToken.token,
// });

// console.log("🚀 ~ file: index.tsx ~ line 190 ~ response", response)
// console.log("🚀 ~ file: index.tsx ~ line 190 ~ response", response?.data?.idToken?.payload)

// const isCustomerVerified = () => {
// 	const [isVerified, setIsVerified] = useState(false)

// 	useEffect(() => {
// 		const handler = async () => {
// 			const attrs: any = await getAttributes();
// 			const { isVerified } = completedAllVerifications(attrs?.data);
// 			setIsVerified(isVerified);
// 		};
// 		handler();
// 	},[isUpdatedAttributes, authStatus])

// 	return isVerified;
// };

			// if (
			// 	response?.data?.error?.message === NEW_PASSWORD_REQUIRED_ERROR
			// ) {
			// 	return;
			// }
			// if (response?.data?.error?.message === WRONG_CREDS_ERROR) {
			// 	return;
			// }
	// const [userAttributes, setUserAttributes] = useState({});

	// const [sessionInfo, setSessionInfo] = useState({});
	// const [sessionInfo, setSessionInfo] = useState({});
	// setUserAttributes(response.data.idToken.payload);