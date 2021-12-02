import { useContext, useEffect } from 'react';
import { DwollaAPI } from "src/api";
import { UserContext, WalletContext } from "src/contexts";

export const useBusinessWallet = (): void => {
	const { updateBusinessWalletData } = useContext(WalletContext);
	const { businessDwollaId } = useContext(UserContext);

	useEffect(() => {
		const handler = async () => {
			if (businessDwollaId) {
				const wData = await DwollaAPI.loadWallet(businessDwollaId);
				if (wData?.userId?.length) {
					const isFundingSourceAvailable = await DwollaAPI.loadFundingSource(businessDwollaId);
					updateBusinessWalletData({ ...wData, availableFundingSource: isFundingSourceAvailable })
				}
			}
		}
		handler()
	}, [businessDwollaId])
}

export const useCustomerWallet = (): void => {
	const { updateCustomerWalletData } = useContext(WalletContext);
	const { customerDwollaId } = useContext(UserContext);

	useEffect(() => {
		const handler = async () => {
			if (customerDwollaId) {
				const wData = await DwollaAPI.loadWallet(customerDwollaId);
				if (wData?.userId?.length) {
					const isFundingSourceAvailable = await DwollaAPI.loadFundingSource(customerDwollaId);
					updateCustomerWalletData({ ...wData, availableFundingSource: isFundingSourceAvailable })
				}
			}
		}
		handler()
	}, [customerDwollaId])
}

export const useUpdateCustomerWalletData = (): void => {
	const { customerDwollaId, user } = useContext(UserContext)
	const { customerWalletData, updateCustomerWalletData } = useContext(WalletContext)

	useEffect(() => {
		const timerId = setInterval(async () => {
			if (customerWalletData?.address !== user?.customer?.walletAddress && customerDwollaId) {
				const userWallet = await DwollaAPI.loadWallet(customerDwollaId)
				const fundingSource = await DwollaAPI.loadFundingSource(customerDwollaId)
				updateCustomerWalletData(({ ...userWallet, availableFundingSource: fundingSource }))
			}
		}, 1500);
		if (
			customerWalletData?.address.length
			&& customerWalletData?.address === user?.customer?.walletAddress) {
			clearInterval(timerId)
		}
		return () => clearInterval(timerId);
	}, [customerWalletData?.address, user?.customer?.walletAddress])
}

export const useUpdateBusinessWalletData = (): void => {
	const { businessDwollaId, user } = useContext(UserContext)
	const { businessWalletData, updateBusinessWalletData } = useContext(WalletContext)

	useEffect(() => {
		const timerId = setInterval(async () => {
			if (businessWalletData?.address !== user?.customer?.walletAddress && businessDwollaId) {
				const userWallet = await DwollaAPI.loadWallet(businessDwollaId)
				const fundingSource = await DwollaAPI.loadFundingSource(businessDwollaId)
				updateBusinessWalletData(({ ...userWallet, availableFundingSource: fundingSource }))
			}
		}, 1500);
		if (
			businessWalletData?.address.length
			&& businessWalletData?.address === user?.business?.walletAddress) {
			clearInterval(timerId)
		}
		return () => clearInterval(timerId);
	}, [businessWalletData?.address, user?.customer?.walletAddress])
}

