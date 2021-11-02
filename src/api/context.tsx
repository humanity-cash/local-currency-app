import React, { useContext, useState } from "react";
import { AuthContext } from "../auth";
import { IUser } from "./types";

export const UserContext = React.createContext({ user: {} as IUser, userType: '' });

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
	user: IUser | undefined;
	userType: UserType | undefined;
}

const UserProvider: React.FunctionComponent = ({ children }) => {
	const { authStatus } = useContext(AuthContext);
	const [user, setUser] = useState<IUser>(initialUserState);
	const [userType, setUserType] = useState<UserType>();

	const state: IState = {
		user,
		userType
	};

	return (
		<UserContext.Provider value={state}>{children}</UserContext.Provider>
	);
};

export default UserProvider;
