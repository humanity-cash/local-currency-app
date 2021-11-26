import React, { useContext, useEffect, useState } from "react";
import { Business, Customer, IDBUser } from "@humanity.cash/types";
import { LoadingScreenTypes } from 'src/utils/types';
import { updateLoadingStatus } from 'src/store/loading/loading.actions';
import { saveUserTypeToStorage } from "../auth/localStorage";
import { AuthContext } from "./auth";
import { AxiosPromiseResponse } from "src/api/types";
import { addBusinessVerification, addCustomerVerification, createUser, getUserByEmail } from "src/api/user";
import { AuthStatus, UserType } from "../auth/types";
import { useDispatch } from "react-redux";
import { ObjectId } from "mongoose";

export const UserContext = React.createContext<IState>({
	user: {} as IDBUser,
	isLoading: false,
	userType: UserType.NotVerified,
	businessDwollaId: "",
	customerDwollaId: "",
	//@ts-ignore
	createCustomer: async (u: Customer) => ({}),
	//@ts-ignore
	createBusiness: async (u: Customer) => {
		return ({});
	},
	getCustomerData: () => undefined,
	updateUserType: () => undefined,
	updateCustomerData: (u: Customer) => ({}),
	getBusinessData: () => undefined,
	updateBusinessData: (u: Business) => ({}),
});

const initialUserState = {
	dbId: "" as unknown as ObjectId,
	consent: false,
	email: '',
	verifiedCustomer: false,
	verifiedBusiness: false,
	customer: 
	{
		firstName: "",
		lastName: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		postalCode: "",
		avatar: "",
		tag: "",
		dwollaId: "",
		resourceUri: "",
	},
	business: {
		story: "",
		tag: "",
		avatar: "",
		type: "",
		rbn: "",
		industry: "",
		ein: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		postalCode: "",
		phoneNumber: "",
		dwollaId: "",
		resourceUri: "",
		owner: {
			firstName: "",
			lastName: "",
			address1: "",
			address2: "",
			city: "",
			state: "",
			postalCode: "",
		}
	}
}

interface IState {
	isLoading: boolean;
	getBusinessData: () => Business | undefined,
	updateBusinessData: (u: any) => void,
	createCustomer: () => Promise<boolean>,
	updateUserType: (i: UserType) => void,
	createBusiness: () => Promise<boolean>,
	getCustomerData: () => Customer | undefined,
	updateCustomerData: (u: any) => void,
	user: IDBUser | undefined;
	businessDwollaId: string;
	customerDwollaId: string;
	userType: UserType;
}

export const UserProvider: React.FunctionComponent = ({ children }) => {
	const { authStatus, userEmail: userEmailFromCognito } = useContext(AuthContext);
	//@ts-ignore
	const [user, setUser] = useState<IDBUser>('initial');
	const [isLoading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	//@ts-ignore
	const [userType, setUserType] = useState<UserType>(null);
	const verifiedCustomer = user?.verifiedCustomer;
	const verifiedBusiness = user?.verifiedBusiness;
	const [customerDwollaId, setCustomerDwollaId] = useState("");
	const [businessDwollaId, setBusinessDwollaId] = useState("");
	const userEmail = user?.email?.length > 0 ? user.email : userEmailFromCognito;
	const updateCustomerData = (u: any) => {
		setUser((pv: IDBUser) => ({ ...pv, customer: { ...pv.customer, ...u } }))
	}
	const updateBusinessData = (u: any) => {
		setUser((pv: IDBUser) => ({ ...pv, business: { ...pv.business, ...u } }))
	}
	const getCustomerData = (): Customer | undefined => user?.customer;
	const getBusinessData = (): Business | undefined => user?.business;
	const updateUserType = (newType: UserType, uEmail = userEmail): void => {
		setUserType(newType);
		saveUserTypeToStorage(uEmail, newType);
	};

	useEffect(() => {
		const updateUserData = async () => {
			setLoading(true);
			if ((authStatus === AuthStatus.SignedIn) && userEmail) {
				const userData = await getUserByEmail(userEmail);
				if (userData) {
					setUser({ ...userData })
					return;
				} else {
					setUser(initialUserState)
				}
			}
			setLoading(false);
		}
		updateUserData();
	}, [authStatus, userEmail])

	useEffect(() => {
		setLoading(true);
		if (userEmail && authStatus === AuthStatus.SignedIn) {
			if (verifiedBusiness || verifiedCustomer) {
				if (verifiedBusiness && verifiedCustomer) {
					const latestSelectedType = UserType.Customer; // :FIXME
					updateUserType(latestSelectedType)
				} else if (verifiedCustomer) {
					updateUserType(UserType.Customer)
				} else if (verifiedBusiness) {
					updateUserType(UserType.Business)
				}
				//@ts-ignore
			} else if(user != "initial") {
				updateUserType(UserType.NotVerified);
			}
		}
		setLoading(false);
	}, [authStatus, user, userEmail])

	useEffect(() => {
		setLoading(true);
		if (verifiedBusiness) {
			setBusinessDwollaId(user?.business?.dwollaId || "")
		}
		if (verifiedCustomer) {
			setCustomerDwollaId(user?.customer?.dwollaId || "")
		}
		setLoading(false);
	}, [verifiedCustomer, verifiedBusiness, user])

	const createBusiness = async (): Promise<boolean> => {
		dispatch(updateLoadingStatus({
			isLoading: true,
			screen: LoadingScreenTypes.ANY
		}));
		if(!user.email) {
			user.email = userEmail;
		}
		const response = await createBus(user);
		if (isSuccessResponse(response)) {
			const newUser: IDBUser = response?.data
			if (newUser?.verifiedBusiness) {
				setUser(newUser);
			}
		}
		dispatch(updateLoadingStatus({
			isLoading: false,
			screen: LoadingScreenTypes.ANY
		}));
		return isSuccessResponse(response);
	}

	const createCustomer = async (): Promise<boolean> => {
		dispatch(updateLoadingStatus({
			isLoading: true,
			screen: LoadingScreenTypes.ANY
		}));
		if (!user?.customer) return false
		if(!user.email) {
			user.email = userEmailFromCognito;
		}
		user.customer.avatar = "avatarlink";
		const response = await createCus(user);
		if (isSuccessResponse(response)) {
			const newUser: IDBUser = response?.data
			if (newUser?.verifiedCustomer) {
				setUser(newUser);
			}
		}
		dispatch(updateLoadingStatus({
			isLoading: false,
			screen: LoadingScreenTypes.ANY
		}));
		return isSuccessResponse(response);
	}

	const state: IState = {
		user,
		isLoading,
		userType,
		updateUserType,
		getCustomerData,
		updateCustomerData,
		getBusinessData,
		updateBusinessData,
		createCustomer,
		createBusiness,
		businessDwollaId,
		customerDwollaId
	};

	return (
		<UserContext.Provider value={state}>{children}</UserContext.Provider>
	);
};

const isSuccessResponse = (response: AxiosPromiseResponse) => {
	if (response.status >= 200 && response.status <= 299) {
		return true
	} else return false
}

const createBus = async (user: IDBUser): Promise<AxiosPromiseResponse<IDBUser>> => {
	try {
		const isRegisteredUser = user?.verifiedCustomer
			&& user?.customer?.dwollaId
			&& user?.business;
		if (isRegisteredUser) {
			const response: AxiosPromiseResponse<IDBUser> = await addBusinessVerification(
				//@ts-ignore
				user.customer.dwollaId
				, { ...user?.business, avatar: "avatar" });
			return response;
		} else {
			const response = await createUser({
				email: user.email,
				consent: true,
				type: 'business',
				business: user.business
			});
			return response
		}
	} catch (error) {
		console.log("error creating business", error)
		return {} as AxiosPromiseResponse<IDBUser>;
	}
}

const createCus = async (user: IDBUser): Promise<AxiosPromiseResponse<IDBUser>> => {
	try {
		const isRegisteredUser = user?.verifiedBusiness && user?.business?.dwollaId && user?.dbId && user?.customer;
		if (isRegisteredUser) {
			const response: AxiosPromiseResponse<IDBUser> =
			//@ts-ignore
				await addCustomerVerification(user.business.dwollaId, user?.customer);
			return response;
		} else {
			const response = await createUser({
				email: user.email,
				consent: true,
				type: 'customer',
				customer: user.customer
			});
			return response
		}
	} catch (error) {
		console.log("error creating business", error)
		return {} as AxiosPromiseResponse<IDBUser>;
	}
}