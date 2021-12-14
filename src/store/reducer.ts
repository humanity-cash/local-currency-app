import { combineReducers } from "redux";
import { loadingReducer } from "./loading/loading.reducer";

const reducer = combineReducers({
    loadingReducer,
});

export default reducer;
