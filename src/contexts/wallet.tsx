import React, { useContext, useState, useEffect } from "react";
import { IWallet } from "@humanity.cash/types";
import { AuthContext } from "./auth";
import { UserContext } from "./user";
import { AuthStatus, UserType } from "../auth/types";
import { UserAPI } from "src/api"

interface PersonalFundingSource { availableFundingSource: boolean };

export const WalletContext = React.createContext<IState>({} as IState);
interface IState {
	isLoading: boolean
	walletData: IWallet & PersonalFundingSource
}

export const WalletProvider: React.FunctionComponent = ({ children }) => {
	const { authStatus } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [walletData, setWalletData] = useState<IWallet & PersonalFundingSource>({
		totalBalance: 0,
		createdTimestamp: "",
		availableBalance: 0,
		userId: "",
		address: "",
		createdBlock: "",
		availableFundingSource: false,
	});
	const { customerDwollaId, businessDwollaId, userType, user } = useContext(UserContext);

	useEffect(() => {
		if (authStatus === AuthStatus.SignedIn) {
			setIsLoading(true);
			if (customerDwollaId || businessDwollaId && walletData.address.length > 0) {
				setIsLoading(false);
			}
			//@ts-ignore
			if (user != "initial" && !customerDwollaId && !businessDwollaId) {
				setIsLoading(false);
			}
		}
	}, [customerDwollaId, businessDwollaId, walletData, authStatus, userType, user])

	const loadFundingSource = async (uId: string): Promise<boolean> => {
		try {
			const fundingSource = await UserAPI.getFundingSources(uId);
			return fundingSource;
		} catch (error) {
			console.log(error)
			return false;
		}
	}

	const loadWallet = async (uId: string): Promise<IWallet> => {
		try {
			const wallet = await UserAPI.getUser(uId);
			const walletData = {
				totalBalance: wallet?.totalBalance,
				availableBalance: wallet?.availableBalance,
				userId: wallet?.userId,
				address: wallet?.address,
				createdTimestamp: wallet?.createdTimestamp,
				createdBlock: wallet?.createdBlock,
			}
			return walletData;
		} catch (error: any) {
			console.log(error)
			return {} as IWallet;
		}
	}


	useEffect(() => {
		const isBusiness = userType === UserType.Business && user?.verifiedBusiness;
		const isCustomer = userType === UserType.Customer && user?.verifiedCustomer;
		const signedIn = authStatus === AuthStatus.SignedIn;
		const userId = isBusiness ? businessDwollaId : isCustomer ? customerDwollaId : undefined;
		if (userId && signedIn) {
			const handler = async () => {
				setIsLoading(true);
				const wData = await loadWallet(userId);
				if (wData?.userId?.length) {
					const isFundingSourceAvailable = await loadFundingSource(userId);
					setWalletData({ ...wData, availableFundingSource: isFundingSourceAvailable })
				}
				setIsLoading(false);
			};
			handler()
		}
	}, [user, customerDwollaId, userType, authStatus, businessDwollaId]);

	const state: IState = {
		walletData,
		isLoading
	}

	return (
		<WalletContext.Provider value={state}>{children}</WalletContext.Provider>
	);
};
