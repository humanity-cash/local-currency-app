import { useCallback, useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { Wallet } from "src/utils/types";
import { IMap } from 'src/utils/types';

const storeId = "PERSONAL_WALLET_RECORD";

type WalletState = Wallet;

const defaultState: WalletState = {
	totalBalance: 0,
	availableBalance: 0,
	address: '0x337f05a447e47bD5e3c8670775F1bD3d971843ea',
	userId: '0xce1f96143cf58b35c8788d6fcb7cb891fd40456abbb37af139cb3c40144c0285',
	createdBlock: '7287048'
};

const store = createStore<WalletState>(storeId, defaultState);
let loaded = false;

const usePersonalWallet = (): IMap => {
	const [ wallet ] = useStore<WalletState>(storeId);
	useEffect(() => {
		async function readStorage() {
			if (!loaded) {
				try {
					const data: string | null = await AsyncStorage.getItem(storeId);
					if (data) {
						store.setState({
							...defaultState,
							...JSON.parse(data)
						} as WalletState);
					}
				} catch (error) {
					// Error saving data
				}
				loaded = true;
			}
		}

		readStorage();
	}, []);

	const storeInMemory = async (newState: WalletState) => {
		try {
			await AsyncStorage.setItem(storeId, JSON.stringify(newState));
		} catch (error) {
			// Error saving data
		}
	}

	const update = useCallback(
		async (data: Partial<WalletState>) => {
			const currentState = store.getState();
			const newState: WalletState = {
				...currentState,
				...data
			};
			store.setState(newState);
			await storeInMemory(newState);
	}, []);

	const updateTotalBalance = useCallback(
		async (balance: number) => {
			const currentState = store.getState();
			try {
				const newState = {
					...currentState,
					totalBalance: balance
				}
				store.setState(newState);
				await storeInMemory(newState);
			} catch (error) {
				// todo handle error
			}
		}, []);

	const updateAvailableBalance = useCallback(
		async (balance: number) => {
			const currentState = store.getState();
			try {
				const newState = {
					...currentState,
					availableBalance: balance
				}
				store.setState(newState);
				await storeInMemory(newState);
			} catch (error) {
				// todo handle error
			}
		}, []);

	return {
		wallet: wallet,
		update,
		updateTotalBalance,
		updateAvailableBalance
	}
};

export default usePersonalWallet;