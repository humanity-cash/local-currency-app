import { useCallback, useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import { AsyncStorage } from "react-native";
import { AuthorizationDetails, IMap, OnboardingState, PersonalDetails, Status, Terms } from "src/utils/types";

const storeId = "ONBOARDING_DETAILS";

const defaultState: OnboardingState = {
	personalDetails: {
		countryOfResidence: 'swiss',
		username: '',
		avatar: '',
		story: '',
		phoneCountry: '+41',
		password: '',
		firstname: '',
		lastname: '',
		email: '',
		emailVerified: false,
		addressLine: '',
		addressLine2: '',
		zipCode: '',
		city: '',
		country: 'swiss'
	},
	authorization: {
		pin: '',
		pinInput: '',
		touchID: true
	},
	statuses: {
		personalDetails: false,
		cashAdded: false,
		terms: false,
		verifyId: false,
		notifications: false,
		serverVerified: false
	},
	terms: {
		terms: false,
		privacy: false,
		banking: false
	},
	loggedIn: false
}

const store = createStore<OnboardingState>(storeId, defaultState);
let loaded = false;

const useUserDetails = () => {
	const [details] = useStore<OnboardingState>(storeId);
	const { personalDetails, authorization, statuses, terms, loggedIn } = details;

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

	const updatePersonalDetails = useCallback(
		async (data: Partial<PersonalDetails>) => {
			const currentState: OnboardingState = store.getState();
			const newState: OnboardingState = {
				...currentState,
				personalDetails: {
					...currentState.personalDetails,
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

	const updateStatus = useCallback(
		async (data: Partial<Status>) => {
			const currentState: OnboardingState = store.getState();
			const newState: OnboardingState = {
				...currentState,
				statuses: {
					...currentState.statuses,
					...data
				}
			};
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	const updateTerms = useCallback(
		async (data: Partial<Terms>) => {
			const currentState: OnboardingState = store.getState();
			const newState: OnboardingState = {
				...currentState,
				terms: {
					...currentState.terms,
					...data
				}
			};
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	const setLoggedIn = useCallback(
		async (loggedIn: boolean) => {
			const currentState: OnboardingState = store.getState();
			const newState: OnboardingState = {
				...currentState,
				loggedIn
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
		personalDetails,
		authorization,
		statuses: statuses as IMap,
		terms,
		loggedIn,
		update,
		updatePersonalDetails,
		updateAuthorization,
		updateStatus,
		updateTerms,
		resetState,
		setLoggedIn
	}
};

export default useUserDetails;