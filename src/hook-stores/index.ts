import { createStore } from "react-hookstore";
import { BusinessTxDataStore, BusinessTxDataStoreActions, BusinessTxDataStoreReducer, BusinessTxFilterStore, BusinessTxFilterStoreActions, BusinessTxFilterStoreReducer, CustomerTxDataStore, CustomerTxFilterStore, CustomerTxFilterStoreActions, CustomerTxFilterStoreReducer } from "src/utils/types";

export const BUSINESS_TX_DATA_STORE = "BUSINESS_TX_DATA_STORE";
createStore<BusinessTxDataStore
	, BusinessTxDataStoreReducer>
	(BUSINESS_TX_DATA_STORE
		, { txs: [] } as BusinessTxDataStore
		, (state, action) => {
			switch (action.type) {
				case BusinessTxDataStoreActions.UpdateTransactions:
					return {
						...state,
						txs: action.payload.txs
					};
				default:
					return state;
			}
		})

export const CUSTOMER_TX_DATA_STORE = "CUSTOMER_TX_DATA_STORE";
createStore<CustomerTxDataStore
	, { type: string, payload: any }>
	(CUSTOMER_TX_DATA_STORE
		, { txs: [] } as CustomerTxDataStore
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
createStore<CustomerTxFilterStore, CustomerTxFilterStoreReducer>
	(CUSTOMER_TX_FILTERS_STORE
		, { selectedType: "All" } as CustomerTxFilterStore
		//@ts-ignore
		, (state, action ) => {
			switch (action.type) {
				case CustomerTxFilterStoreActions.OpenStartDate:
					return {
						...state,
						isEndDate: false,
						isStartDate: true
					};
				case CustomerTxFilterStoreActions.OpenEndDate:
					return {
						...state,
						isStartDate: false,
						isEndDate: true
					};
				case CustomerTxFilterStoreActions.CloseStartDate:
					return {
						...state,
						isEndDate: false,
						isStartDate: false
					};
				case CustomerTxFilterStoreActions.CloseEndDate:
					return {
						...state,
						isStartDate: false,
						isEndDate: false
					};
				case CustomerTxFilterStoreActions.UpdateStartDate:
					return {
						...state,
						startDate: action.payload.startDate,
						isStartDate: false
					};
				case CustomerTxFilterStoreActions.UpdateEndDate:
					return {
						...state,
						endDate: action.payload.endDate,
						isEndDate: false
					};
				case CustomerTxFilterStoreActions.UpdateType:
					return {
						...state,
						selectedType: action.payload.type
					};
				case CustomerTxFilterStoreActions.ClearAll:
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
createStore<BusinessTxFilterStore, BusinessTxFilterStoreReducer>(BUSINESS_TX_FILTERS_STORE
	, { selectedType: "All" } as BusinessTxFilterStore
	//@ts-ignore
	, (state, action) => {
		switch (action.type) {
			case BusinessTxFilterStoreActions.OpenStartDate:
				return {
					...state,
					isEndDate: false,
					isStartDate: true
				};
			case BusinessTxFilterStoreActions.OpenEndDate:
				return {
					...state,
					isStartDate: false,
					isEndDate: true
				};
			case BusinessTxFilterStoreActions.CloseStartDate:
				return {
					...state,
					isEndDate: false,
					isStartDate: false
				};
			case BusinessTxFilterStoreActions.CloseEndDate:
				return {
					...state,
					isStartDate: false,
					isEndDate: false
				};
			case BusinessTxFilterStoreActions.UpdateStartDate:
				return {
					...state,
					startDate: action.payload.startDate,
					isStartDate: false
				};
			case BusinessTxFilterStoreActions.UpdateEndDate:
				return {
					...state,
					endDate: action.payload.endDate,
					isEndDate: false
				};
			case BusinessTxFilterStoreActions.UpdateType:
				return {
					...state,
					selectedType: action.payload.type
				};
			case BusinessTxFilterStoreActions.ClearAll:
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