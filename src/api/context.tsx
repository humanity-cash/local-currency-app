import React, { useContext, useEffect, useState } from "react";
import { saveUserTypeToStorage } from "../auth/localStorage";
import { AuthContext } from "../auth";
import { AxiosPromiseResponse, Business, Customer, IUser } from "./types";
import { addBusinessVerification, addCustomerVerification, createUser } from "./user";
import { AuthStatus, UserType } from "../auth/types";
import { UserAPI } from "../api";

export const UserContext = React.createContext<IState>({
	user: {} as IUser,
	userType: null,
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

interface IState {
	getBusinessData: () => Business | undefined,
	updateBusinessData: (u: any) => void,
	createCustomer: () => Promise<void>,
	createBusiness: () => Promise<void>,
	getCustomerData: () => Customer | undefined,
	updateCustomerData: (u: any) => void,
	user: IUser | undefined;
	userType: UserType | null;
}

const UserProvider: React.FunctionComponent = ({ children }) => {
	const { authStatus, userEmail } = useContext(AuthContext);
	const [user, setUser] = useState<IUser>(initialUserState);
  console.log("🚀 ~ file: context.tsx ~ line 85 ~ user", user)
	const [userType, setUserType] = useState<UserType | null>(null);
	const verifiedCustomer = user?.verifiedCustomer;
	const verifiedBusiness = user?.verifiedBusiness;

	const updateUserType = (newType: UserType | null, uEmail = userEmail): void => {
		setUserType(newType);
		if (newType !== UserType.Cashier && newType) { // dont cache cashier option. it will lock the user in cashier screens
			saveUserTypeToStorage(uEmail, newType);
		}
	};

	const handleDbUser = (user: any) => {
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
				updateUserType(null);
				return;
			}
			if (userEmail) {
				const [dbUser] = await UserAPI.getUserByEmail(userEmail);
				if (dbUser) {
					setUser(dbUser);
					handleDbUser(dbUser);
				} else {
					setUser(initialUserState);
					updateUserType(null);
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

	const updateCustomerData = (u: any) => {
		setUser((pv: IUser) => ({ ...pv, customer: { ...pv.customer, ...u } }))
	}

	const updateBusinessData = (u: any) => {
		setUser((pv: IUser) => ({ ...pv, business: { ...pv.business, ...u } }))
	}

	const getCustomerData = (): Customer | undefined => {
		return user.customer;
	}

	const getBusinessData = (): Business | undefined => {
		return user.business;
	}

	const createBusiness = async () => {
		const data = {
			email: userEmail,
			consent: true,
			type: 'business',
			business: user.business
		};
		let response = {} as AxiosPromiseResponse;
		if (user?.verifiedCustomer && user?.customer?.dwollaId && user?.business) {
			response = await addBusinessVerification(user.customer?.dwollaId, { ...user?.business, avatar: "avatar" });
      console.log("🚀 ~ file: context.tsx ~ line 162 ~ createBusiness ~ response", response)
		} else {
			response = await createUser(data);
		}
		if (response.status >= 200 && response.status <= 299) {
			const data: any = response?.data //IDBUser
			if (data?.verifiedBusiness) {
				setUser(data);
				updateUserType(UserType.Business);
			}
		}
	}

	const createCustomer = async () => {
		let response = {} as AxiosPromiseResponse;
		const data = {
			email: userEmail,
			consent: true,
			type: 'customer',
			customer: user?.customer
		};
		if (user?.verifiedBusiness && user?.business?.dwollaId && user?.customer) {
			response = await addCustomerVerification(user.business?.dwollaId, user?.customer);
		} else {
			response = await createUser(data);
		}
		if (response.status >= 200 && response.status <= 299) {
			const data: any = response?.data //IDBUser
			if (data?.verifiedCustomer) {
				setUser(data);
				updateUserType(UserType.Customer);
			}
		}
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

// const initialTypeState = async (cognitoId: string) => {
// 	if(cognitoId === undefined || cognitoId.length < 1) {
// 		return
// 	}
// 	const latestType = await getLatestSelectedAccountType(cognitoId);
// 	if (!latestType) {
// 		if (userType !== UserType.Customer) {
// 			updateUserType(UserType.Customer);
// 		}
// 	} else if (latestType === "2") {
// 		if (userType !== UserType.Cashier) {
// 			updateUserType(UserType.Cashier);
// 		}
// 	} else if (latestType === "0") {
// 		if (userType !== UserType.Customer) {
// 			updateUserType(UserType.Customer);
// 		}
// 	} else if (latestType === "1") {
// 		if (userType !== UserType.Business) {
// 			updateUserType(UserType.Business);
// 		}
// 	}
// };