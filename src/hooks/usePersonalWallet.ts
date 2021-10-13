import { useState, useEffect, useContext } from "react";
import { AuthContext } from 'src/auth';
import { Wallet } from "src/utils/types";
import { UserAPI } from "src/api";
import { IMap } from 'src/utils/types';

type WalletState = Wallet;

const walletInitialState: WalletState = {
	totalBalance: 10,
	availableBalance: 10,
	address: '0x337f05a447e47bD5e3c8670775F1bD3d971843ea',
	userId: '0xce1f96143cf58b35c8788d6fcb7cb891fd40456abbb37af139cb3c40144c0285',
	createdBlock: '7287048'
};

const usePersonalWallet = (): IMap => {
	const { customerDwollaId } = useContext(AuthContext);
	const [ wallet, setWallet ] = useState<WalletState>(walletInitialState);

	useEffect(() => {
		if (customerDwollaId) {
			updateWallet(customerDwollaId);
		}
	}, [customerDwollaId]);

	const updateWallet = async (dwollaId: string) => {
		const response = await UserAPI.getUser(dwollaId);
		if (response?.data) {
			const wallets  = response?.data as WalletState[];
			setWallet(wallets[0]);
		}
	}

	return {
		wallet: wallet,
		updateWallet,
	}
};

export default usePersonalWallet;