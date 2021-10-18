import { combineReducers } from "redux";
import { transactionReducer } from "./transaction/transaction.reducer";
import { walletReducer } from "./wallet/wallet.reducer";

const reducer = combineReducers({
    transactionReducer,
    walletReducer
});

export default reducer;
