import _ from "lodash";
import { useCallback, useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import { AsyncStorage } from "react-native";
import listOfShares from 'src/mocks/shares';
import { Share } from "src/utils/types";

const storeId = "SHARES_RECORD";

type SharesState = {
	shares: Share[]
};

const store = createStore<SharesState>(storeId, {
	shares: listOfShares
});
let loaded = false;

const useShares = () => {
	const [details] = useStore<SharesState>(storeId);

	useEffect(() => {
		async function readStorage() {
			if (!loaded) {
				try {
					const data: string | null = await AsyncStorage.getItem(storeId);
					if (data) {
						store.setState(JSON.parse(data) as SharesState);
					}
				} catch (error) {
					// Error saving data
				}
				loaded = true;
			}
		}

		// readStorage();
	}, []);

	const storeInMemory = async (newState: SharesState) => {
		try {
			await AsyncStorage.setItem(storeId, JSON.stringify(newState));
		} catch (error) {
			// Error saving data
		}
	}

	const getByMarketEntryId = useCallback(
		(id: string) => {
			const currentState = store.getState();
			return currentState.shares.find(share => share.marketEntryId === id);
		}, []);

	const updateShare = useCallback(
		async (share: Partial<Share>) => {
			const currentState = store.getState();
			const index = currentState.shares.findIndex(o => o.id === share.id);
			const newState = _.cloneDeep(currentState);
			newState.shares[index] = { ...newState.shares[index], ...share };
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	return {
		shares: details.shares,
		getByMarketEntryId,
		updateShare
	}
};

export default useShares;