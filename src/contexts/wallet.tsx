import { IWallet } from "@humanity.cash/types";
import React, { useState } from "react";

interface PersonalFundingSource { availableFundingSource: boolean };

export const WalletContext = React.createContext<IState>({} as IState);
interface IState {
	customerWalletData: IWallet & PersonalFundingSource,
	businessWalletData: IWallet & PersonalFundingSource,
	updateBusinessWalletData: (u: any) => void,
	updateCustomerWalletData: (u: any) => void,
}

export const WalletProvider: React.FunctionComponent = ({ children }) => {
	const [customerWalletData, setCustomerWalletData] = useState<IWallet & PersonalFundingSource>({
		totalBalance: 0,
		createdTimestamp: "",
		availableBalance: 0,
		userId: "",
		address: "",
		createdBlock: "",
		availableFundingSource: false,
	});
	const [businessWalletData, setBusinessWalletData] = useState<IWallet & PersonalFundingSource>({
		totalBalance: 0,
		createdTimestamp: "",
		availableBalance: 0,
		userId: "",
		address: "",
		createdBlock: "",
		availableFundingSource: false,
	});
	const updateBusinessWalletData = (u: any) => setBusinessWalletData({ ...u });
	const updateCustomerWalletData = (u: any) => setCustomerWalletData({ ...u });

	const state: IState = {
		customerWalletData,
		businessWalletData,
		updateBusinessWalletData,
		updateCustomerWalletData
	}

	return (
		<WalletContext.Provider value={state}>{children}</WalletContext.Provider>
	);
};


// useEffect(() => {
// 	const isBusiness = userType === UserType.Business && user?.verifiedBusiness && businessDwollaId;
// 	const isCustomer = userType === UserType.Customer && user?.verifiedCustomer && customerDwollaId;
// 	const signedIn = authStatus === AuthStatus.SignedIn;
// 	const userId = isBusiness ? businessDwollaId : isCustomer ? customerDwollaId : undefined;
// 	if (userId && signedIn) {
// 		setTimeout(async () => {
// 			setIsLoading(true);
// 			const wData = await DwollaAPI.loadWallet(userId);
// 			if (wData?.userId?.length) {
// 				const isFundingSourceAvailable = await DwollaAPI.loadFundingSource(userId);
// 				setWalletData({ ...wData, availableFundingSource: isFundingSourceAvailable })
// 			}
// 			setIsLoading(false);
// 		}, 2000);
// 	}
// }, [user, customerDwollaId, userType, authStatus, businessDwollaId]);
// const { customerDwollaId, businessDwollaId, userType, user } = useContext(UserContext);