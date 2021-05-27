import { createStore, useStore } from "react-hookstore";
import { useCallback } from "react";
import { Order, OrderType, StatusType } from "../utils/types";
import { makeId } from "../utils/common";

const storeId = "TRANSACTION_RECORD";

type TransactionState = Order

const defaultState = () => ({
	id: makeId(),
	name: '',
	type: OrderType.SELL,
	quantity: 0,
	price: 0,
	expires: new Date(),
	created: new Date(),
	status: StatusType.PROGRESS
});

const store = createStore<TransactionState>(storeId, defaultState());

export const useTransaction = () => {
	const [transaction] = useStore<TransactionState>(storeId);

	const update = useCallback(
		async (data: Partial<Order>) => {
			const currentState = store.getState();
			store.setState({
				...currentState,
				...data
			});
		}, []);

	const resetState = useCallback(
		async () => {
			store.setState(defaultState());
		}, []);

	return {
		transaction,
		update
	}
};
