import { combineReducers } from "redux";
import { transactionReducer } from "./transaction/transaction.reducer";
import { loadingReducer } from "./loading/loading.reducer";

const reducer = combineReducers({
    transactionReducer,
    loadingReducer,
});

export default reducer;
