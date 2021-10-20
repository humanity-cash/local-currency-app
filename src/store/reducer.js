import { combineReducers } from "redux";
import { transactionReducer } from "./transaction/transaction.reducer";
import { walletReducer } from "./wallet/wallet.reducer";
import { loadingReducer } from "./loading/loading.reducer";
import { fundingSourceReducer } from "./funding-source/funding-source.reducer";

const reducer = combineReducers({
    transactionReducer,
    walletReducer,
    loadingReducer,
    fundingSourceReducer
});

export default reducer;
