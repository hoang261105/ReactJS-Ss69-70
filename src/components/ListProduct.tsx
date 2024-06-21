import { useDispatch, useSelector } from "react-redux";
import { Products } from "../interface/Product";
import { actionProduct } from "../actions/action";
import { useState } from "react";

export default function ListProduct() {
  const [showAdd, setShowAdd] = useState<string | null>(null);
  const productState: any = useSelector((state) => {
    return state;
  });

  const dispatch = useDispatch();

  const handleAdd = (product: Products) => {
    dispatch(actionProduct("ADD", product));
    setShowAdd(`Them ${product.name} vào giỏ thành công`);
    dispatch(actionProduct("DECREASE_QUANTITY", product));
    setTimeout(() => {
      setShowAdd(null);
    }, 2000);
  };

  return (
    <>
      {showAdd && (
        <div className="alert alert-success" role="alert" id="mnotification">
          {showAdd}
        </div>
      )}

      {productState.productReducer.map((product: Products) => (
        <div>
          <div className="media product">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src={product.img} alt="pizza" />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{product.name}</h4>
              <p>{product.describe}</p>
              <input
                name={`quantity-product-${product.id}`}
                type="number"
                value={product.quantity}
              />
              <button
                data-product={product.id}
                className="price"
                onClick={() => handleAdd(product)}
                disabled={product.quantity <= 0}
              >
                {product.price} USD{" "}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
