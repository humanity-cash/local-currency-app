import { createStore } from "react-hookstore";
import {
	TxDataStore, TxDataStoreActions, TxDataStoreReducer, TxFilterStoreActions,
	TxFilterStoreReducer,
	TxFilters
} from "src/utils/types";

export const BUSINESS_TX_DATA_STORE = "BUSINESS_TX_DATA_STORE";
createStore<TxDataStore
	, TxDataStoreReducer>
	(BUSINESS_TX_DATA_STORE
		, { txs: [] } as TxDataStore
		, (state, action) => {
			switch (action.type) {
				case TxDataStoreActions.UpdateTransactions:
					return {
						...state,
						txs: action.payload.txs
					};
				default:
					return state;
			}
		})

export const CUSTOMER_TX_DATA_STORE = "CUSTOMER_TX_DATA_STORE";
createStore<TxDataStore
	, { type: string, payload: any }>
	(CUSTOMER_TX_DATA_STORE
		, { txs: [] } as TxDataStore
		, (state, action) => {
			switch (action.type) {
				case 'updateTransactions':
					return {
						...state,
						txs: action.payload.txs
					};
				default:
					return state;
			}
		})

export const CUSTOMER_TX_FILTERS_STORE = "CUSTOMER_TX_FILTERS_STORE";
createStore<TxFilters, TxFilterStoreReducer>
	(CUSTOMER_TX_FILTERS_STORE
		, { selectedType: "All" } as TxFilters
		//@ts-ignore
		, (state, action) => {
			switch (action.type) {
				case TxFilterStoreActions.OpenStartDate:
					return {
						...state,
						isEndDate: false,
						isStartDate: true
					};
				case TxFilterStoreActions.OpenEndDate:
					return {
						...state,
						isStartDate: false,
						isEndDate: true
					};
				case TxFilterStoreActions.CloseStartDate:
					return {
						...state,
						isEndDate: false,
						isStartDate: false
					};
				case TxFilterStoreActions.CloseEndDate:
					return {
						...state,
						isStartDate: false,
						isEndDate: false
					};
				case TxFilterStoreActions.UpdateStartDate:
					return {
						...state,
						startDate: action.payload.startDate,
						isStartDate: false
					};
				case TxFilterStoreActions.UpdateEndDate:
					return {
						...state,
						endDate: action.payload.endDate,
						isEndDate: false
					};
				case TxFilterStoreActions.UpdateType:
					return {
						...state,
						selectedType: action.payload.type
					};
				case TxFilterStoreActions.ClearAll:
					return {
						...state,
						startDate: null,
						endDate: null,
						selectedType: "All"
					};
				default:
					return state;
			}
		})

export const BUSINESS_TX_FILTERS_STORE = "BUSINESS_TX_FILTERS_STORE";
createStore<TxFilters, TxFilterStoreReducer>(BUSINESS_TX_FILTERS_STORE
	, { selectedType: "All" } as TxFilters
	//@ts-ignore
	, (state, action) => {
		switch (action.type) {
			case TxFilterStoreActions.OpenStartDate:
				return {
					...state,
					isEndDate: false,
					isStartDate: true
				};
			case TxFilterStoreActions.OpenEndDate:
				return {
					...state,
					isStartDate: false,
					isEndDate: true
				};
			case TxFilterStoreActions.CloseStartDate:
				return {
					...state,
					isEndDate: false,
					isStartDate: false
				};
			case TxFilterStoreActions.CloseEndDate:
				return {
					...state,
					isStartDate: false,
					isEndDate: false
				};
			case TxFilterStoreActions.UpdateStartDate:
				return {
					...state,
					startDate: action.payload.startDate,
					isStartDate: false
				};
			case TxFilterStoreActions.UpdateEndDate:
				return {
					...state,
					endDate: action.payload.endDate,
					isEndDate: false
				};
			case TxFilterStoreActions.UpdateType:
				return {
					...state,
					selectedType: action.payload.type
				};
			case TxFilterStoreActions.ClearAll:
				return {
					...state,
					startDate: null,
					endDate: null,
					selectedType: "All"
				};
			default:
				return state;
		}
	})