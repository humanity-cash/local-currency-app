import _ from "lodash";
import { useCallback, useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import { AsyncStorage } from "react-native";
import listOfMarketEntries from 'src/mocks/marketEntries';
import { MarketEntry, OrderType, ShareEntry } from "src/utils/types";

const storeId = "MARKET_ENTRIES_RECORD";

type MarketEntryState = {
	entries: MarketEntry[]
};

const store = createStore<MarketEntryState>(storeId, {
	entries: listOfMarketEntries
});
let loaded = false;

const useMarketEntry = () => {
	const [details] = useStore<MarketEntryState>(storeId);

	useEffect(() => {
		async function readStorage() {
			if (!loaded) {
				try {
					const data: string | null = await AsyncStorage.getItem(storeId);
					if (data) {
						store.setState(JSON.parse(data) as MarketEntryState);
					}
				} catch (error) {
					// Error saving data
				}
				loaded = true;
			}
		}

		// readStorage();
	}, []);

	const storeInMemory = async (newState: MarketEntryState) => {
		try {
			await AsyncStorage.setItem(storeId, JSON.stringify(newState));
		} catch (error) {
			// Error saving data
		}
	}

	const get = useCallback(
		(id: string) => {
			const currentState = store.getState();
			return currentState.entries.find(entry => entry.id === id);
		}, []);

	const addOrderToEntry = useCallback(
		async (id: string, order: ShareEntry) => {
			const currentState = store.getState();
			let newState = _.cloneDeep(currentState);
			newState = {
				...newState,
				entries: [
					...newState.entries.map(entry => {
						if (entry.id === id) {
							return {
								...(order.type === OrderType.BUY ? { wanted: [ ...entry.wanted, order ] } : {}),
								...(order.type === OrderType.SELL ? { offered: [ ...entry.offered, order ] } : {}),
								...entry
							}
						}
						return entry;
					})
				]
			};
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	return {
		marketEntries: details.entries,
		get,
		addOrderToEntry
	}
};

export default useMarketEntry;