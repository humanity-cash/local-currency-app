import { useCallback, useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { IMap, LoadingState } from "src/utils/types";

const storeId = "LOADING_SCREEN_RECORD";

const defaultState = {
	isLoading: false,
	screen: ''
};

const store = createStore<LoadingState>(storeId, defaultState);
let loaded = false;

const useMessages = (): IMap => {
	const [details] = useStore<LoadingState>(storeId);

	useEffect(() => {
		(async () => {
			if (!loaded) {
				try {
					const data: string | null = await AsyncStorage.getItem(storeId);
					if (data) {
						store.setState(JSON.parse(data) as LoadingState);
					}
				} catch (error) {
					// Error saving data
				}
				loaded = true;
			}
		})();
	}, []);

	const storeInMemory = async (newState: LoadingState) => {
		try {
			await AsyncStorage.setItem(storeId, JSON.stringify(newState));
		} catch (error) {
			// Error saving data
		}
	}

	const update = useCallback(
		async (data: Partial<LoadingState>) => {
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

	return {
		details,
		update
	}
};

export default useMessages;