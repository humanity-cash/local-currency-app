import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunkMiddleware from 'redux-thunk';

export type AppState = ReturnType<typeof reducer>;

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
    )
);

export default store;
