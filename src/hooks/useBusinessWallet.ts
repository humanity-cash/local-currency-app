import { useState, useEffect, useContext } from "react";
import { AuthContext } from 'src/auth';
import { Wallet } from "src/utils/types";
import { UserAPI } from "src/api";
import { IMap } from 'src/utils/types';

type WalletState = Wallet;

const walletInitialState: WalletState = {
	totalBalance: 100,
	availableBalance: 100,
	address: '',
	userId: '',
	createdBlock: ''
};

const useBusinessWallet = (): IMap => {
	const { businessDwollaId } = useContext(AuthContext);
	const [ wallet, setWallet ] = useState<WalletState>(walletInitialState);

	useEffect(() => {
		if (businessDwollaId) {
			getWallet(businessDwollaId);
		}
	}, [businessDwollaId]);

	const getWallet = async (dwollaId: string) => {
		const response = await UserAPI.getUser(dwollaId);
		if (response?.data) {
			const wallets  = response?.data as WalletState[];
			setWallet(wallets[0]);
		}
	}

	return {
		wallet: wallet,
		getWallet,
	}
};

export default useBusinessWallet;