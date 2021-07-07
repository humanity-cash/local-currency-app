import _ from 'lodash';
import { useCallback, useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import { AsyncStorage } from "react-native";
import listOfOrders from 'src/mocks/orders';
import { Order } from "src/utils/types";

const storeId = "ORDERS_RECORD";

type OrdersState = {
	orders: Order[]
};

const store = createStore<OrdersState>(storeId, {
	orders: listOfOrders
});
let loaded = false;


const useOrders = () => {
	const [details] = useStore<OrdersState>(storeId);

	useEffect(() => {
		async function readStorage() {
			if (!loaded) {
				try {
					const data: string | null = await AsyncStorage.getItem(storeId);
					if (data) {
						store.setState(JSON.parse(data) as OrdersState);
					}
				} catch (error) {
					// Error saving data
				}
				loaded = true;
			}
		}

		// readStorage();
	}, []);

	const storeInMemory = async (newState: OrdersState) => {
		try {
			await AsyncStorage.setItem(
				storeId,
				JSON.stringify(newState)
			);
		} catch (error) {
			// Error saving data
		}
	}

	const add = useCallback(
		async (data: Order) => {
			const currentState = store.getState();
			const newState = {
				...currentState,
				orders: [
					data,
					...currentState.orders
				]
			}
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	const remove = useCallback(
		async (id: string) => {
			const currentState = store.getState();
			const newState = {
				...currentState,
				orders: [
					...currentState.orders.filter(order => order.id !== id),
				]
			};
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	const get = useCallback(
		(id: string) => {
			const currentState = store.getState();
			return currentState.orders.find(order => order.id === id);
		}, []);

	const update = useCallback(
		async (order: Order) => {
			const currentState = store.getState();
			const index = currentState.orders.findIndex(o => o.id === order.id);
			const newState = _.cloneDeep(currentState);
			newState.orders[index] = order;
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	return {
		orders: details.orders,
		add,
		remove,
		get,
		update
	}
};

export default useOrders;