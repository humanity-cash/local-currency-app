import { useCallback, useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import AsyncStorage  from "@react-native-async-storage/async-storage";
import { 
	AuthorizationDetails, 
	IMap, 
	OnboardingState, 
	ClientDetails,
} from "src/utils/types";

const storeId = "ONBOARDING_DETAILS";

const defaultState: OnboardingState = {
	clientDetails: {
		email: '',
		emailVerified: false
	},
	authorization: {
		touchID: true,
		cashierView: true
	}
}

const store = createStore<OnboardingState>(storeId, defaultState);
let loaded = false;

const useUserDetails = (): IMap => {
	const [details] = useStore<OnboardingState>(storeId);
	const { clientDetails, authorization } = details;

	useEffect(() => {
		async function readStorage() {
			try {
				if (!loaded) {
					const data: string | null = await AsyncStorage.getItem(storeId);

					if (data) {
						store.setState({
							...defaultState,
							...JSON.parse(data)
						} as OnboardingState);
					}
					loaded = true;
				}
			} catch (error) {
				// Error saving data
			}
		}
		readStorage();
	}, []);

	const storeInMemory = async (newState: OnboardingState) => {
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
		async (data: Partial<OnboardingState>) => {
			const currentState = store.getState();
			const newState: OnboardingState = {
				...currentState,
				...data
			};
			store.setState(newState);
			await storeInMemory(newState);
	}, []);

	const updateClientDetails = useCallback(
		async (data: Partial<ClientDetails>) => {
			const currentState: OnboardingState = store.getState();
			const newState: OnboardingState = {
				...currentState,
				clientDetails: {
					...currentState.clientDetails,
					...data
				}
			};
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	const updateAuthorization = useCallback(
		async (data: Partial<AuthorizationDetails>) => {
			const currentState: OnboardingState = store.getState();
			const newState: OnboardingState = {
				...currentState,
				authorization: {
					...currentState.authorization,
					...data
				}
			};
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	const resetState = useCallback(
		async () => {
			store.setState(defaultState);
			await storeInMemory(defaultState);
		}, []);

	return {
		clientDetails,
		authorization,
		update,
		updateClientDetails,
		updateAuthorization,
		resetState
	}
};

export default useUserDetails;