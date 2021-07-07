import { useCallback, useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import { AsyncStorage } from "react-native";
import { makeId } from "src/utils/common";
import { Transaction, TransactionType, Wallet, WalletMinimum } from "src/utils/types";

const storeId = "WALLET_RECORD";

type WalletState = Wallet;

const defaultState: WalletState = {
	amount: 293.89,
	reservationAmount: 2345.50,
	reservations: [
		{
			id: makeId(),
			title: 'Cham Group',
			price: 110,
			shares: 10,
			type: TransactionType.RESERVATION,
			created: new Date('2020-08-15'),
		},
		{
			id: makeId(),
			title: 'CKW',
			price: 120,
			shares: 20,
			type: TransactionType.RESERVATION,
			created: new Date('2020-08-14'),
		}
	],
	transactions: [
		{
			id: makeId(),
			title: 'CKW',
			price: 271,
			shares: 2,
			type: TransactionType.BUY,
			created: new Date('2020-08-15'),
		},
		{
			id: makeId(),
			price: 3000,
			account: 'NL 12 ABCD 1234 5678 90',
			type: TransactionType.ADDCASH,
			created: new Date('2020-08-15'),
		},
		{
			id: makeId(),
			title: 'Weisse Arena Laax',
			price: 150,
			shares: 3,
			type: TransactionType.SELL,
			created: new Date('2020-08-15'),
		},
		{
			id: makeId(),
			title: 'Lienhardt & Partner Privatbank Zuürich',
			price: 271,
			shares: 2,
			type: TransactionType.BUY,
			created: new Date('2020-08-13'),
		},
		{
			id: makeId(),
			title: 'Lienhardt & Partner Privatbank Zuürich',
			price: 271,
			shares: 18,
			type: TransactionType.BUY,
			created: new Date('2020-08-12'),
		},
		{
			id: makeId(),
			price: 271,
			account: 'NL 12 ABCD 1234 5678 90',
			type: TransactionType.WITHDRAW,
			created: new Date('2020-08-10'),
		}
	],
	minimum: {
		amount: 0,
		number: '',
		expireMonth: '',
		expireYear: '',
		cvc: '',
		enabled: false
	},
	details: {
		walletId: '0x023D4e01773baBB4E6D25Fb9Ae72F5026CD04384',
		iban: 'CH01 LIEN 1234 5678 90'
	}
};

const store = createStore<WalletState>(storeId, defaultState);
let loaded = false;

const useWallet = () => {
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

	const updateAmount = useCallback(
		async (amount: number) => {
			const currentState = store.getState();
			try {
				const newState = {
					...currentState,
					amount: amount
				}
				store.setState(newState);
				await storeInMemory(newState);
			} catch (error) {
				// todo handle error
			}
		}, []);

	const updateReservationAmount = useCallback(
		async (amount: number) => {
			const currentState = store.getState();
			try {
				const newState = {
					...currentState,
					reservationAmount: amount
				}
				store.setState(newState);
				await storeInMemory(newState);
			} catch (error) {
				// todo handle error
			}
		}, []);

	const updateMinimum = useCallback(
		async (minimum: Partial<WalletMinimum>) => {
			const currentState = store.getState();
			try {
				const newState = {
					...currentState,
					minimum: {
						...currentState.minimum,
						...minimum
					}
				}
				store.setState(newState);
				await storeInMemory(newState);
			} catch (error) {
				// todo handle error
			}
		}, []);

	const addTransaction = useCallback(
		async (transaction: Transaction) => {
			const currentState = store.getState();
			try {
				const newState = {
					...currentState,
					transactions: [
						transaction,
						...currentState.transactions
					]
				}
				store.setState(newState);
				await storeInMemory(newState);
			} catch (error) {
				// todo handle error
			}
		}, []);

	const addMoney = useCallback(
		async (amount: number) => {
			const currentState = store.getState();
			try {
				const newState = {
					...currentState,
					amount: currentState.amount + amount
				}
				store.setState(newState);
				await storeInMemory(newState);
			} catch (error) {
				// todo handle error
			}
		}, []);

	const removeMoney = useCallback(
		async (amount: number) => {
			const currentState = store.getState();
			try {
				const newState = {
					...currentState,
					amount: currentState.amount - amount
				}
				store.setState(newState);
				await storeInMemory(newState);
			} catch (error) {
				// todo handle error
			}
		}, []);

	const resetWallet = useCallback(
		async () => {
			try {
				store.setState(defaultState);
				await storeInMemory(defaultState);
			} catch (error) {
				// todo handle error
			}
		}, []);

	return {
		wallet: wallet,
		updateAmount,
		updateMinimum,
		addTransaction,
		addMoney,
		removeMoney,
		resetWallet
	}
};

export default useWallet;