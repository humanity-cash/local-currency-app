import { useContext, useEffect } from 'react';
import { DwollaAPI } from "src/api";
import { UserContext, WalletContext } from "src/contexts";

export const useWallet = (dwollaId: string) => {
	const { updateWalletData } = useContext(WalletContext);

	useEffect(() => {
		const handler = async () => {
			if (dwollaId) {
				const wData = await DwollaAPI.loadWallet(dwollaId);
				if (wData?.userId?.length) {
					const isFundingSourceAvailable = await DwollaAPI.loadFundingSource(dwollaId);
					updateWalletData({ ...wData, availableFundingSource: isFundingSourceAvailable })
				}
			}
			console.log("🚀 ~ Loaded wallet for:", dwollaId)
		}
		handler()
	}, [dwollaId])
}

export const useUpdateCustomerWalletData = () => {
	const { customerDwollaId, user } = useContext(UserContext)
	const { walletData, updateWalletData } = useContext(WalletContext)

	useEffect(() => {
		const timerId = setInterval(async () => {
			if (walletData?.address !== user?.customer?.walletAddress && customerDwollaId) {
				const userWallet = await DwollaAPI.loadWallet(customerDwollaId)
				const fundingSource = await DwollaAPI.loadFundingSource(customerDwollaId)
				updateWalletData(({ ...userWallet, availableFundingSource: fundingSource }))
			}
		}, 1500);
		return () => clearInterval(timerId);
	}, [walletData?.address, user?.customer?.walletAddress])
}


