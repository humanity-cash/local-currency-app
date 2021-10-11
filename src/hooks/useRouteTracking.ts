import { useCallback } from "react";
import { createStore, useStore } from "react-hookstore";
import { Route } from "src/utils/types";

const storeId = "ROUTE_TRACKING";

type RouteState = Route;

const store = createStore<RouteState>(storeId, {
	current: ''
});

const useRouteTracking = () => {
	const [details] = useStore<RouteState>(storeId);

	const update = useCallback(
		async (data: Route) => {
			const currentState = store.getState();
			store.setState({
				...currentState,
				...data
			});
		}, []);

	return {
		currentRoute: details.current,
		update
	}
};

export default useRouteTracking;