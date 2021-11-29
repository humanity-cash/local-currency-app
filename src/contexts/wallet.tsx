import React, { useState } from "react";
import { IWallet } from "@humanity.cash/types";

interface PersonalFundingSource { availableFundingSource: boolean };

export const WalletContext = React.createContext<IState>({} as IState);
interface IState {
	updateWalletData: (u: any) => void
	walletData: IWallet & PersonalFundingSource
}

export const WalletProvider: React.FunctionComponent = ({ children }) => {
	const [walletData, setWalletData] = useState<IWallet & PersonalFundingSource>({
		totalBalance: 0,
		createdTimestamp: "",
		availableBalance: 0,
		userId: "",
		address: "",
		createdBlock: "",
		availableFundingSource: false,
	});
	const updateWalletData = (u: any) => setWalletData({ ...u });

	const state: IState = {
		walletData,
		updateWalletData,
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