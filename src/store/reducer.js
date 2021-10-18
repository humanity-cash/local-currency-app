import { combineReducers } from "redux";
import { transactionReducer } from "./transaction/transaction.reducer";
import { walletReducer } from "./wallet/wallet.reducer";
import { loadingReducer } from "./loading/loading.reducer";

const reducer = combineReducers({
    transactionReducer,
    walletReducer,
    loadingReducer
});

export default reducer;
