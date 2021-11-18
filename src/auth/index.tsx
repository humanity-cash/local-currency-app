import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	CognitoUserAttribute,
	CognitoUserSession
} from "amazon-cognito-identity-js";
import React, { useEffect, useState } from "react";
import { userController } from "./cognito";
import { BaseResponse, CognitoResponse, ChangePasswordInput } from "./cognito/types";
import {
	buisnessBasicVerificationInitialState,
	customerBasicVerificationInitialState,
	dwollaInfoInitialState,
	signInInitialState,
	signUpInitialState
} from "./consts";
import {
	AccountUpdate,
	AuthStatus,
	BusinessBasicVerification,
	CustomerBasicVerification,
	ForgotPassword,
	DwollaInfo,
	defaultState,
	IAuth,
	UserType
} from "./types";

export const AuthContext = React.createContext(defaultState);

const convertAttributesArrayToObject = (attributes: any): any => {
	const newObject: any = {};
	for (let i = 0; i < attributes.length; i++) {
		newObject[attributes[i].Name] = attributes[i].Value;
	}

	return newObject;
};

const saveUserTypeToStorage = async (cognitoId: String, value: UserType) => {
	try {
		await AsyncStorage.setItem(`@accType_${cognitoId}`, String(value));
		return true;
	} catch (e) {
		return false;
	}
};

const getLatestSelectedAccountType = async (cognitoId: String) => {
	try {
		const value: string | null = await AsyncStorage.getItem(`@accType_${cognitoId}`);
		if (!value) return "";
		return value;
	} catch (e) {
		return "";
	}
};

const AuthProvider: React.FunctionComponent = ({ children }) => {
	const [userType, setUserType] = useState<UserType | undefined>(undefined);
	const [authStatus, setAuthStatus] = useState(AuthStatus.SignedOut);
	const [update, setUpdate] = useState(false);
	const [signInDetails, setSignInDetails] = useState(signInInitialState);
	const [signUpDetails, setSignUpDetails] = useState(signUpInitialState);
	const [forgotPasswordDetails, setForgotPasswordDetails] = useState<ForgotPassword>({
		email: "",
		verificationCode: "",
		newPassword: "",
	});
	const [userAttributes, setUserAttributes] = useState<any>({});
	const [completedCustomerVerification, setCompletedCustomerVerification] = useState<boolean>(false);
	const [completedBusinessVerification, setCompletedBusinessVerification] = useState<boolean>(false);
	const [cognitoId, setCognitoId] = useState<string>("");
	const [customerDwollaId, setCustomerDwollaId] = useState<string>("");
	const [businessDwollaId, setBusinessDwollaId] = useState<string>("");

	useEffect(() => {
		const isVerifiedCustomer =
			userAttributes?.["custom:basicCustomerV"] === "true";
		const isVerifiedBusiness =
			userAttributes?.["custom:basicBusinessV"] === "true";
		
		setCompletedCustomerVerification(isVerifiedCustomer);
		setCompletedBusinessVerification(isVerifiedBusiness);
		setCognitoId(userAttributes?.["sub"]);
		setCustomerDwollaId(userAttributes?.["custom:personal.dwollaId"]);
		setBusinessDwollaId(userAttributes?.["custom:business.dwollaId"]);
	}, [userAttributes, authStatus]);

	const [
		customerBasicVerificationDetails,
		setCustomerBasicVerificationDetails,
	] = useState<CustomerBasicVerification>(
		customerBasicVerificationInitialState
	);

	const [buisnessBasicVerification, setBuisnessBasicVerification] =
		useState<BusinessBasicVerification>(
			buisnessBasicVerificationInitialState
		);

	const [customerDwollaInfo, setCustomerDwollaInfo] =
		useState<DwollaInfo>(
			dwollaInfoInitialState
		);

	const [businessDwollaInfo, setBusinessDwollaInfo] =
		useState<DwollaInfo>(
			dwollaInfoInitialState
		);

	const updateUserType = (cognitoId: String, newType: UserType): void => {
		if (newType === userType) {
			getSessionInfo();
		} else {
			setUserType(newType);
		}
		if (newType !== UserType.Cashier) {
			// dont cache cashier option. it will lock the user in cashier screens
			saveUserTypeToStorage(cognitoId, newType);
		}
	};

	const getSessionInfo = async () => {
		try {
			const response: BaseResponse<CognitoUserSession | undefined> =
				await userController.getSession();
			if (response.success) {
				await getAttributes();
				setAuthStatus(AuthStatus.SignedIn);
			} else {
				setAuthStatus(AuthStatus.SignedOut);
			}
		} catch (err) {
			setAuthStatus(AuthStatus.SignedOut);
		}
	}

	useEffect(() => {
		if(update){  
			getSessionInfo(); 
			setUpdate(false);
		}
	}, [update]);

	useEffect(() => {
		getSessionInfo();
	}, [userType]);

	useEffect(() => {
		initialTypeState(cognitoId)
	}, [cognitoId])

	useEffect(() => {
		setCognitoId(userAttributes?.["sub"]);
	}, [userAttributes])

	const initialTypeState = async (cognitoId: String) => {
		if(cognitoId === undefined || cognitoId.length < 1) {
			return
		}

		const latestType = await getLatestSelectedAccountType(cognitoId);
		
		if (!latestType) {
			if (userType !== UserType.Customer) {
				updateUserType(cognitoId, UserType.Customer);
			}
		} else if (latestType === "2") {
			if (userType !== UserType.Cashier) {
				updateUserType(cognitoId, UserType.Cashier);
			}
		} else if (latestType === "0") {
			if (userType !== UserType.Customer) {
				updateUserType(cognitoId, UserType.Customer);
			}
		} else if (latestType === "1") {
			if (userType !== UserType.Business) {
				updateUserType(cognitoId, UserType.Business);
			}
		}
	};
	
	const emailVerification = (verificationCode: string) =>
		userController.confirmEmailVerificationCode(
			signUpDetails.email,
			verificationCode
		);

	const resendEmailVerificationCode = async () =>
		userController.resendEmailVerificationCode(signUpDetails.email);

	const signUp = async () => {
		const response = await userController.signUp(
			signUpDetails.email.toLowerCase(),
			signUpDetails.password
		);
		if (!response?.success) setAuthStatus(AuthStatus.SignedOut);
		else {
			setAuthStatus(AuthStatus.Loading); // Invokes getSession useEffect
		}

		return response;
	};

	const signIn = async (
		email = signInDetails.email.toLowerCase(),
		password = signInDetails.password
	) => {
		const response: BaseResponse<CognitoUserSession> =
			await userController.signIn({ email, password });
			
		if (!response?.success) {
			setAuthStatus(AuthStatus.SignedOut); // Something went wrong in sign in
		} else {
			getAttributes()
			setAuthStatus(AuthStatus.Loading); // Invokes getSession useEffect
		}

		return response;
	};

	const getAttributes = async (): CognitoResponse<
		CognitoUserAttribute[] | undefined
	> => {
		const response = await userController.getAttributes();
		if (!response.success) {
			setUserAttributes({});
		} else {
			// ONLY place we use setUserAttributes
			//@ts-ignore
			setUserAttributes(
				convertAttributesArrayToObject(response?.data) || {}
			);
		}

		return response;
	};

	const completeBusniessBasicVerification = async (
		update = buisnessBasicVerification
	): CognitoResponse<string | undefined> => {
		const response = await userController.completeBusinessBasicVerification(
			update
		);
		if (response.success) {
			await userController.updateUserAttributes({
				"custom:basicBusinessV": "true",
			});
		}
		return response;
	};

	const completeCustomerBasicVerification = async (
		update = customerBasicVerificationDetails
	): CognitoResponse<string | undefined> => {
		const response = await userController.completeCustomerBasicVerification(update);
		if (response.success) {
			await userController.updateUserAttributes({
				"custom:basicCustomerV": "true",
			});
			setCompletedCustomerVerification(true);
		}

		return response;
	};

	const startForgotPasswordFlow = async (): Promise<BaseResponse<unknown>> => {
		const { email } = forgotPasswordDetails;
		const response: BaseResponse<unknown> =
			await userController.startForgotPasswordFlow({ email });

		return response;
	};
	
	const completeCustomerDwollaInfo = async (
		update = customerDwollaInfo
	): CognitoResponse<string | undefined> => {
		const response = await userController.updateCustomerDowllaData({
			"custom:personal.dwollaId": update.dwollaId,
		});

		return response;
	};

	const completeForgotPasswordFlow = async (): Promise<
		BaseResponse<unknown>
	> => {
		const { email, newPassword, verificationCode } = forgotPasswordDetails;
	
		const response: BaseResponse<unknown> =
			await userController.completeForgotPasswordFlow({
				email,
				verificationCode,
				newPassword,
			});

		return response;
	};

	const completeBusinessDwollaInfo = async (
		update = businessDwollaInfo
	): CognitoResponse<string | undefined> => {
		const response = await userController.updateBusinessDowllaData({
			"custom:business.dwollaId": update.dwollaId,
		});

		return response;
	};

	const changePassword = async (
		i: ChangePasswordInput
	) => {
		const { oldPassword, newPassword } = i;
		const response: BaseResponse<unknown> =
			await userController.changePassword({
				oldPassword,
				newPassword,
			});

		return response;
	};

	const updateAttributes = async (
		update: AccountUpdate
	): Promise<BaseResponse<string | undefined>> => {
		const response: BaseResponse<string | undefined> =
			await userController.updateUserAttributes(update);
		setUpdate(true);
		return response;
	};

	const signOut = () => {
		userController.signOut();
		setAuthStatus(AuthStatus.SignedOut);
		setUserAttributes({});
		setCognitoId("")
		setUserType(undefined)
		if (userType === UserType.Cashier) {
			setUserType(UserType.Business);
		}
	};

	const state: IAuth = {
		userType,
		forgotPasswordDetails, 
		setForgotPasswordDetails,
		userAttributes,
		updateAttributes,
		authStatus,
		completedCustomerVerification,
		completedBusinessVerification,
		cognitoId,
		customerDwollaId,
		businessDwollaId,
		signIn,
		setAuthStatus,
		signOut,
		signUp,
		setSignInDetails,
		updateUserType,
		buisnessBasicVerification,
		setBuisnessBasicVerification,
		signInDetails,
		signUpDetails,
		setSignUpDetails,
		customerBasicVerificationDetails,
		setCustomerBasicVerificationDetails,
		completeBusniessBasicVerification,
		completeCustomerBasicVerification,
		emailVerification,
		startForgotPasswordFlow,
		completeForgotPasswordFlow,
		resendEmailVerificationCode,
		setCustomerDwollaInfo,
		completeCustomerDwollaInfo,
		setBusinessDwollaInfo,
		completeBusinessDwollaInfo,
		changePassword,
		getAttributes
	};

	return (
		<AuthContext.Provider value={state}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
