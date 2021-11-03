import React, { useContext, useState } from "react";
import { AuthContext } from "../auth";
import { Business, Customer, IUser } from "./types";
import { createUser } from "./user";

export const UserContext = React.createContext<IState>({ 
	user: {} as IUser, 
	userType: undefined,
	//@ts-ignore
	createCustomer: async () => any,
	//@ts-ignore
	createBusiness: async () => any,
	getCustomerData: () => undefined,
	updateCustomerData: (u: Customer) => ({}),
	getBusinessData: () => undefined,
	updateBusinessData: (u: Business) => ({}),
});

const initialUserState = {
	dbId: "",
	consent: false,
	email: '',
	verifiedCustomer: false,
	verifiedBusiness: false,
	customer: {
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

export enum UserType {
	Customer,
	Business,
	Cashier,
}

interface IState {
	getBusinessData: () => Business | undefined,
	updateBusinessData: (u: any) => void,
	createCustomer: () => Promise<void>,
	createBusiness: () => Promise<void>,
	getCustomerData: () => Customer | undefined,
	updateCustomerData: (u: any) => void,
	user: IUser | undefined;
	userType: UserType | undefined;
}

const UserProvider: React.FunctionComponent = ({ children }) => {
	const { authStatus, userEmail } = useContext(AuthContext);
	const [user, setUser] = useState<IUser>(initialUserState);
	const [userType, setUserType] = useState<UserType>();

	const updateCustomerData = (u: any) => {
		setUser((pv: IUser) => ({ ...pv, customer: { ...pv.customer, ...u } }))
	}

	const updateBusinessData = (u: any) => {
		setUser((pv: IUser) => ({ ...pv, business: { ...pv.business, ...u } }))
	}

	const getCustomerData = (): Customer | undefined => {
		return user.customer
	}

	const getBusinessData = (): Business | undefined => {
		return user.business
	}

	const createBusiness = async () => {
		const data = {
			email: userEmail,
			consent: true,
			type: 'business',
			business: user.business
		};
		await createUser(data);
	}

	const createCustomer = async () => {
		const data = {
			email: userEmail,
			consent: true,
			type: 'customer',
			customer: user.customer
		};
		await createUser(data);
	}

	const state: IState = {
		user,
		userType,
		getCustomerData,
		updateCustomerData,
		getBusinessData,
		updateBusinessData,
		createCustomer,
		createBusiness,
	};

	return (
		<UserContext.Provider value={state}>{children}</UserContext.Provider>
	);
};

export default UserProvider;
