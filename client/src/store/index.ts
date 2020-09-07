import { createStore } from "redux";
import appReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(appReducer, composeWithDevTools());

export default store;
