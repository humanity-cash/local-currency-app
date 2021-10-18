import { combineReducers } from "redux";
import { transactionReducer } from "./transaction/transaction.reducer";

const reducer = combineReducers({
    transactionReducer
});

export default reducer;
