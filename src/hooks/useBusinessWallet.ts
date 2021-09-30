import { useCallback, useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { Wallet } from "src/utils/types";
import { IMap } from 'src/utils/types';

const storeId = "BUSINESS_WALLET_RECORD";

type WalletState = Wallet;

const defaultState: WalletState = {
	totalBalance: 0,
	availableBalance: 0,
	address: '',
	userId: '',
	createdBlock: ''
};

const store = createStore<WalletState>(storeId, defaultState);
let loaded = false;

const useBusinessWallet = (): IMap => {
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

export default useBusinessWallet;