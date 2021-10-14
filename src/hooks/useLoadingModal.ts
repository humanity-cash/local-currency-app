import { useCallback } from "react";
import { createStore, useStore } from "react-hookstore";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { IMap, LoadingState, LoadingScreenTypes } from "src/utils/types";

const storeId = "LOADING_SCREEN_RECORD";

const defaultState = {
	isLoading: false,
	screen: LoadingScreenTypes.PAYMENT_PENDING
};

const store = createStore<LoadingState>(storeId, defaultState);

const useLoadingModal = (): IMap => {
	const [details] = useStore<LoadingState>(storeId);

	const storeInMemory = async (newState: LoadingState) => {
		try {
			await AsyncStorage.setItem(storeId, JSON.stringify(newState));
		} catch (error) {
			// Error saving data
		}
	}

	const updateLoadingStatus = useCallback(
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
		updateLoadingStatus
	}
};

export default useLoadingModal;