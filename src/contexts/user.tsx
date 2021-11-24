import React, { useContext, useEffect, useState } from "react";
import { Business, Customer, IDBUser } from "@humanity.cash/types";
import { LoadingScreenTypes } from 'src/utils/types';
import { updateLoadingStatus } from 'src/store/loading/loading.actions';
import { saveUserTypeToStorage } from "../auth/localStorage";
import { AuthContext } from "./auth";
import { AxiosPromiseResponse } from "src/api/types";
import { addBusinessVerification, addCustomerVerification, createUser } from "src/api/user";
import { AuthStatus, UserType } from "../auth/types";
import { UserAPI } from "../api";
import { useDispatch } from "react-redux";
import { ObjectId } from "mongoose";

export const UserContext = React.createContext<IState>({
	user: {} as IDBUser,
	userType: null,
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
	getBusinessData: () => Business | undefined,
	updateBusinessData: (u: any) => void,
	createCustomer: () => Promise<void>,
	updateUserType: (i: UserType | 'notApplicable' | null) => void,
	createBusiness: () => Promise<void>,
	getCustomerData: () => Customer | undefined,
	updateCustomerData: (u: any) => void,
	user: IDBUser | undefined;
	businessDwollaId: string;
	customerDwollaId: string;
	userType: UserType | null | "notApplicable";
}

export const UserProvider: React.FunctionComponent = ({ children }) => {
	const { authStatus, userEmail } = useContext(AuthContext);
	const [user, setUser] = useState<IDBUser>(initialUserState);
	const dispatch = useDispatch();
	const [userType, setUserType] = useState<UserType | null | "notApplicable">(null);
	const verifiedCustomer = user?.verifiedCustomer;
	const verifiedBusiness = user?.verifiedBusiness;
	const [customerDwollaId, setCustomerDwollaId] = useState("")
	const [businessDwollaId, setBusinessDwollaId] = useState("")

	const updateUserType = (newType: UserType | null | "notApplicable", uEmail = userEmail): void => {
		setUserType(newType);
		if (newType && newType != "notApplicable") { 
			saveUserTypeToStorage(uEmail, newType);
		}
	};

	const handleDbUser = () => {
		if (verifiedBusiness || verifiedCustomer) {
			if (verifiedBusiness && verifiedCustomer) {
				const latestSelectedType = UserType.Customer; // :FIXME
				updateUserType(latestSelectedType)
			} else if (verifiedCustomer) {
				updateUserType(UserType.Customer)
			} else if (verifiedBusiness) {
				updateUserType(UserType.Business)
			}
		}
	}

	const updateType = async () => {
		try {
			if (!(authStatus === AuthStatus.SignedIn) || !userEmail) {
				setUser(initialUserState);
				updateUserType(null)
				return;
			}
			if (userEmail) {
				const dbUser = await UserAPI.getUserByEmail(userEmail);
				if (dbUser) {
					setUser(dbUser);
					handleDbUser();
				} else {
					setUser(initialUserState);
					updateUserType("notApplicable")
				}
			}
		}
		catch (err) {
			console.log("error", err);
		}
	}

	useEffect(() => {
		updateType();
	}, [authStatus, userEmail, verifiedCustomer,
		verifiedBusiness])

	useEffect(() => {
		if (verifiedBusiness) {
			setBusinessDwollaId(user?.business?.dwollaId || "")
		}
		if (verifiedCustomer) {
			setCustomerDwollaId(user?.customer?.dwollaId || "")
		}
	}, [verifiedCustomer, verifiedBusiness, user])

	const updateCustomerData = (u: any) => {
		setUser((pv: IDBUser) => ({ ...pv, customer: { ...pv.customer, ...u } }))
	}

	const updateBusinessData = (u: any) => {
		setUser((pv: IDBUser) => ({ ...pv, business: { ...pv.business, ...u } }))
	}

	const getCustomerData = (): Customer | undefined => {
		return user?.customer;
	}

	const getBusinessData = (): Business | undefined => {
		return user?.business;
	}

	const createBusiness = async () => {
		dispatch(updateLoadingStatus({
			isLoading: true,
			screen: LoadingScreenTypes.ANY
		}));
		let response = {} as AxiosPromiseResponse<IDBUser>;
		if (user?.verifiedCustomer && user?.customer?.dwollaId && user?.business) {
			response = await addBusinessVerification(user.customer?.dwollaId, { ...user?.business, avatar: "avatar" });
		} else {
			const data = {
				email: userEmail,
				consent: true,
				type: 'business',
				business: user.business
			};
			response = await createUser(data);
		}
		if (response.status >= 200 && response.status <= 299) {
			const data: IDBUser = response?.data //IDBUser
			if (data?.verifiedBusiness) {
				setUser(data);
				updateUserType(UserType.Business);
			}
		}
		dispatch(updateLoadingStatus({
			isLoading: false,
			screen: LoadingScreenTypes.ANY
		}));
	}

	const createCustomer = async () => {
		dispatch(updateLoadingStatus({
			isLoading: true,
			screen: LoadingScreenTypes.ANY
		}));
		let response = {} as AxiosPromiseResponse;
		if (!user?.customer) return
		user.customer.avatar = "avatarlink";
		if (user?.verifiedBusiness && user?.business?.dwollaId && user?.dbId && user?.customer) {
			response = await addCustomerVerification(user.business?.dwollaId, user?.customer);
		} else {
			const data = {
				email: userEmail,
				consent: true,
				type: 'customer',
				customer: user?.customer
			};
			response = await createUser(data);
		}
		if (response.status >= 200 && response.status <= 299) {
			const data: any = response?.data //IDBUser
			if (data?.verifiedCustomer) {
				setUser(data);
				updateUserType(UserType.Customer);
			}
		}
		dispatch(updateLoadingStatus({
			isLoading: false,
			screen: LoadingScreenTypes.ANY
		}));
	}

	const state: IState = {
		user,
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