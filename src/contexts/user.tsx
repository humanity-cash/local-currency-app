import React, { useEffect, useState } from "react";
import { IDBUser } from "@humanity.cash/types";
import { saveUserTypeToStorage } from "../auth/localStorage";
import { UserType } from "../auth/types";

export const UserContext = React.createContext<IState>({} as IState);

interface IState {
	isLoading: boolean;
	updateBusinessData: (u: any) => void,
	updateUserType: (i: UserType, userEmail: string) => void,
	updateUserData: (u: any) => void,
	updateCustomerData: (u: any) => void,
	user: IDBUser | undefined;
	businessDwollaId: string;
	customerDwollaId: string;
	userType: UserType;
}

export const UserProvider: React.FunctionComponent = ({ children }) => {
	const [user, setUser] = useState<IDBUser>({} as IDBUser);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [userType, setUserType] = useState<UserType>("" as UserType);
	const [customerDwollaId, setCustomerDwollaId] = useState("");
	const [businessDwollaId, setBusinessDwollaId] = useState("");

	const updateUserData = (uData: any) => setUser({ ...uData });
	const updateCustomerData = (u: any) => {
		setUser((pv: IDBUser) => ({ ...pv, customer: { ...pv.customer, ...u } }))
	}
	const updateBusinessData = (u: any) => {
		setUser((pv: IDBUser) => ({ ...pv, business: { ...pv.business, ...u } }))
	}
	const updateUserType = (newType: UserType, userEmail: string): void => {
		setUserType(newType);
		saveUserTypeToStorage(userEmail, newType);
	};

	useEffect(() => {
		setLoading(true);
		setBusinessDwollaId(user?.business?.dwollaId || "")
		setCustomerDwollaId(user?.customer?.dwollaId || "")
		setLoading(false);
	}, [user])

	const state: IState = {
		user,
		isLoading,
		userType,
		updateUserType,
		updateCustomerData,
		updateBusinessData,
		businessDwollaId,
		customerDwollaId,
		updateUserData,
	};

	return (
		<UserContext.Provider value={state}>{children}</UserContext.Provider>
	);
};

	// useEffect(() => {
	// 	updateUserData();
	// }, [authStatus, userEmail])


	// const typeUpdate = async () => {
	// 	setLoading(true);
	// 	if (userEmail && authStatus === AuthStatus.SignedIn) {
	// 		const verifiedCustomer = user?.verifiedCustomer;
	// 		const verifiedBusiness = user?.verifiedBusiness;
	// 		if (verifiedBusiness || verifiedCustomer) {
	// 			if (verifiedBusiness && verifiedCustomer) {
	// 				const latestSelectedType = await getLatestSelectedAccountType(userEmail);
	// 				updateUserType(latestSelectedType as UserType);
	// 			} else if (verifiedCustomer) {
	// 				updateUserType(UserType.Customer)
	// 			} else if (verifiedBusiness) {
	// 				updateUserType(UserType.Business)
	// 			}
	// 		} else {
	// 			updateUserType(UserType.NotVerified);
	// 		}
	// 	}
	// 	setLoading(false);
	// }

	// const updateUserData = async () => {
	// 	setLoading(true);
	// 	if ((authStatus === AuthStatus.SignedIn) && userEmail) {
	// 		const userData = await UserAPI.getUserByEmail(userEmail);
	// 		if (userData) {
	// 			setUser({ ...userData })
	// 			return;
	// 		} else {
	// 			setUser(initialUserState)
	// 		}
	// 	}
	// 	setLoading(false);
	// }

// const initialUserState = {
// 	dbId: "" as unknown as ObjectId,
// 	consent: false,
// 	email: '',
// 	verifiedCustomer: false,
// 	verifiedBusiness: false,
// 	customer: 
// 	{
// 		firstName: "aaa",
// 		lastName: "eee",
// 		address1: "eeee",
// 		address2: "eeee",
// 		city: "eeee",
// 		dwollaId: "",
// 		state: "",
// 		postalCode: "1232",
// 		avatar: "",
// 		tag: "dsadsa",
// 	},
// 	business: {
// 		story: "ewqeqwew",
// 		tag: "ewqeqw",
// 		avatar: "eqwewq",
// 		type: "eqwewq",
// 		rbn: "eqwewqe",
// 		industry: "ewqewq",
// 		ein: "ewqewq",
// 		address1: "eqwewq",
// 		address2: "eqweqw",
// 		city: "eqweqw",
// 		state: "ewqeqw",
// 		postalCode: "eqweqw",
// 		phoneNumber: "eqweqw",
// 		dwollaId: "",
// 		resourceUri: "",
// 		owner: {
// 			firstName: "eqweqw",
// 			lastName: "ewqeqw",
// 			address1: "ewqewq",
// 			address2: "eqwewq",
// 			city: "ewqeqw",
// 			state: "eqwewq",
// 			postalCode: "eqweqw",
// 		}
// 	}
// }

// const createBusiness = async (): Promise<boolean> => {
// if (!user.email) {
// 	user.email = userEmail;
// }
// const response = await UserAPI.createBusiness(user);
// if (isSuccessResponse(response)) {
// 	const newUser: IDBUser = response?.data
// 	if (newUser?.verifiedBusiness) {
// 		setUser(newUser);
// 		updateUserType(UserType.Business);
// 	}
// }
// setLoading(false);
// return isSuccessResponse(response);
// }

// const createCustomer = async (): Promise<boolean> => {
// setLoading(true);
// if (!user?.customer) return false
// if (!user.email) {
// 	user.email = userEmail;
// }
// user.customer.avatar = "avatarlink";
// const response = await UserAPI.createCustomer(user);
// if (isSuccessResponse(response)) {
// 	const newUser: IDBUser = response?.data
// 	if (newUser?.verifiedCustomer) {
// 		setUser(newUser);
// 		updateUserType(UserType.Customer);
// 	}
// }
// setLoading(false);
// return isSuccessResponse(response);
// }
