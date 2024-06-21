import { ActionProducts, Products } from "../../interface/Product"

const listProduct: Products[] = JSON.parse(localStorage.getItem("listProducts") || "[]")

const productReducer = (state = listProduct, action: ActionProducts) => {
    switch (action.type) {
        case "DECREASE_QUANTITY":
            return state.map((product) =>
                product.id === action.payload.id
                ? { ...product, quantity: product.quantity - 1 }
                : product
            );
        default:
            return state
    }
}

export default productReducer