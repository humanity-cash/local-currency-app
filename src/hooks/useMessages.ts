import { useCallback, useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import { AsyncStorage } from "react-native";
import { makeId } from "src/utils/common";
import { Message } from "src/utils/types";

const storeId = "MESSAGES_RECORD";

type MessagesState = {
	messages: Message[]
};

const defaultState = {
	messages: [
		{
			id: makeId(),
			title: 'Welcome to DATE',
			text: [
				'Hi Wouter, a sell order for AEK Energy has been completed. You sold 10 of 20 shares against your put ask price of CHF 380.',
				'The remaining ask is of 10 shares is still open and visible to the DATE market place.',
				'We have emailed you a PDF with summary of your completed sell order'
			],
			created: new Date(),
			unread: true
		}
	]
};

const store = createStore<MessagesState>(storeId, defaultState);
let loaded = false;

const useMessages = () => {
	const [details] = useStore<MessagesState>(storeId);

	useEffect(() => {
		async function readStorage() {
			if (!loaded) {
				try {
					const data: string | null = await AsyncStorage.getItem(storeId);
					if (data) {
						store.setState(JSON.parse(data) as MessagesState);
					}
				} catch (error) {
					// Error saving data
				}
				loaded = true;
			}
		}

		// readStorage();
	}, []);

	const storeInMemory = async (newState: MessagesState) => {
		try {
			await AsyncStorage.setItem(storeId, JSON.stringify(newState));
		} catch (error) {
			// Error saving data
		}
	}

	const get = useCallback(
		(id: string) => {
			const currentState = store.getState();
			return currentState.messages.find(message => message.id === id);
		}, []);

	return {
		messages: details.messages,
		get
	}
};

export default useMessages;