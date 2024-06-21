import { combineReducers, createStore } from "redux";
import productReducer from "./reducer/productReducer";
import cartReducer from "./reducer/cartReducer";

const rootProducts = combineReducers({
    productReducer,
    cartReducer
})

const combineProducts = createStore(rootProducts);
export default combineProducts