import _ from 'lodash';
import { useCallback, useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import { AsyncStorage } from "react-native";
import { makeId } from "src/utils/common";
import { CreditCardDetails, PaymentState, WithdrawPaymentDetails } from "src/utils/types";

const storeId = "PAYMENT_DETAILS_RECORD";

const defaultCardData = () => ({
	id: makeId(),
	number: '',
	expireMonth: '',
	expireYear: '',
	cvc: ''
})

const defaultState = {
	amount: '0',
	status: true,
	type: '',
	selected: defaultCardData(),
	cards: [],
	withdrawDetails: {
		number: '',
		ownerName: ''
	}
};

const store = createStore<PaymentState>(storeId, defaultState as PaymentState);
let loaded = false;

const usePaymentDetails = () => {
	const [details] = useStore<PaymentState>(storeId);

	useEffect(() => {
		async function readStorage() {
			if (!loaded) {
				try {
					const data: string | null = await AsyncStorage.getItem(storeId);
					if (data) {
						store.setState({...defaultState, ...JSON.parse(data) as PaymentState });
					}
				} catch (error) {
					// Error saving data
				}
				loaded = true;
			}
		}

		readStorage();
	}, []);

	const storeInMemory = async (newState: PaymentState) => {
		try {
			await AsyncStorage.setItem(
				storeId,
				JSON.stringify(newState)
			);
		} catch (error) {
			// Error saving data
		}
	}

	const update = useCallback(
		async (data: Partial<PaymentState>) => {
			const currentState = store.getState();
			const newState = {
				...currentState,
				...data
			};
			store.setState({
				...currentState,
				...data
			});
			await storeInMemory(newState);
		}, []);

	const addCard = useCallback(
		async () => {
			const currentState = store.getState();
			const newState = _.cloneDeep(currentState);
			newState.cards.push(currentState.selected);
			newState.selected = defaultCardData();
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	const editSelectedCard = useCallback(
		async (data: Partial<CreditCardDetails>) => {
			const currentState = store.getState();
			const newState = {
				...currentState,
				selected: {
					...currentState.selected,
					...data
				}
			};
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	const clearSelectedCard = useCallback(
		async () => {
			const currentState = store.getState();
			const newState = {
				...currentState,
				selected: defaultCardData()
			};
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	const getCard = useCallback(
		(id: string | undefined) => {
			const currentState = store.getState();
			return currentState.cards.find(card => id && card.id === id);
		}, []);

	const removeCard = useCallback(
		async (id: string | undefined) => {
			const currentState = store.getState();
			const newState = {
				...currentState,
				cards: currentState.cards.filter(card => card.id !== id)
			};
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	const updateWithdraw = useCallback(
		async (data: Partial<WithdrawPaymentDetails>) => {
			const currentState = store.getState();
			const newState: PaymentState = {
				...currentState,
				withdrawDetails: {
					...currentState.withdrawDetails,
					...data
				}
			};
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	return {
		details,
		cards: details.cards,
		update,
		addCard,
		getCard,
		removeCard,
		editSelectedCard,
		clearSelectedCard,
		updateWithdraw
	}
};

export default usePaymentDetails;