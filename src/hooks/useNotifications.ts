import _ from "lodash";
import { useCallback, useEffect } from "react";
import { createStore, useStore } from "react-hookstore";
import { AsyncStorage } from "react-native";
import { Notification } from "src/utils/types";

const storeId = "NOTIFICATION_RECORD";

type NotificationsState = {
	notifications: Notification[]
};

const store = createStore<NotificationsState>(storeId, {
	notifications: []
});
let loaded = false;


const useNotifications = () => {
	const [details] = useStore<NotificationsState>(storeId);

	useEffect(() => {
		async function readStorage() {
			if (!loaded) {
				try {
					const data: string | null = await AsyncStorage.getItem(storeId);
					if (data) {
						store.setState(JSON.parse(data) as NotificationsState);
					}
				} catch (error) {
					// Error saving data
				}
				loaded = true;
			}
		}

		// readStorage();
	}, []);

	const storeInMemory = async (newState: NotificationsState) => {
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
		async (data: Notification) => {
			const currentState = store.getState();
			const newState = {
				...currentState,
				notifications: [
					data,
					...currentState.notifications
				]
			}
			store.setState(newState);
			await storeInMemory(newState);
		}, []);

	const getFirst = useCallback(
		async (): Promise<Notification | null> => {
			const currentState = store.getState();
			const newState = _.cloneDeep(currentState);
			if (newState.notifications.length === 0) {
				return null;
			}
			const item = newState.notifications.pop();
			store.setState(newState);
			await storeInMemory(newState);
			return item ? item : null;
		}, []);

	return {
		notifications: details.notifications,
		add,
		getFirst
	}
};

export default useNotifications;