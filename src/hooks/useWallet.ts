import { useContext, useEffect } from 'react';
import { LoadingScreenTypes } from 'src/utils/types';
import { WalletContext } from "src/contexts";
import { DwollaAPI } from "src/api";
import { useDispatch } from 'react-redux';
import { showLoadingProgress, hideLoadingProgress } from 'src/store/loading/loading.actions';

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

