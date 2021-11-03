import React, { useContext, useState } from "react";
import { AuthContext } from "../auth";
import { Customer, IUser } from "./types";

export const UserContext = React.createContext<IState>({ 
	user: {} as IUser, 
	userType: undefined,
	getCustomerData: () => undefined,
	updateCustomerData: (u: Customer) => ({}),
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
	getCustomerData: () => Customer | undefined,
	updateCustomerData: (u: any) => void,
	user: IUser | undefined;
	userType: UserType | undefined;
}

const UserProvider: React.FunctionComponent = ({ children }) => {
	const { authStatus } = useContext(AuthContext);
	const [user, setUser] = useState<IUser>(initialUserState);
	const [userType, setUserType] = useState<UserType>();

	const updateCustomerData = (u: any) => {
		setUser((pv: IUser) => ({ ...pv, customer: { ...pv.customer, ...u } }))
	}

	const getCustomerData = (): Customer | undefined => {
		return user.customer
	}

	const state: IState = {
		user,
		userType,
		getCustomerData,
		updateCustomerData
	};

	return (
		<UserContext.Provider value={state}>{children}</UserContext.Provider>
	);
};

export default UserProvider;
