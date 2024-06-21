import { saveToLocal } from "../../data/saveToLocal";
import { ActionProducts, Products } from "../../interface/Product";

const cartProduct: Products[] = JSON.parse(localStorage.getItem("cart") || "[]");

const cartReducer = (state= cartProduct, action: ActionProducts) => {
    switch (action.type) {
        case "ADD":
            const productIndex = state.findIndex(product => product.id === action.payload.id);
            if(productIndex !== -1){
                state[productIndex].quantity += 1             
            }else{
                state.push({ ...action.payload, quantity: 1 })
            }
            saveToLocal("cart", state)
            return [...state];
        case "DELETE":
            const deleteIndex = state.findIndex(product => product.id === action.payload.id);
            state.splice(deleteIndex, 1)
            saveToLocal("cart", state)
            return [...state];

        case "UPDATE":
            const updateIndex = state.findIndex(product => product.id === action.payload.id);
            state[updateIndex].quantity = action.payload.quantity
            saveToLocal("cart", state)
            return [...state];
    
        default:
          return state
    }
}

export default cartReducer