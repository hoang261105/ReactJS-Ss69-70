import { useDispatch, useSelector } from "react-redux";
import { Products } from "../interface/Product";
import { actionProduct } from "../actions/action";
import { useState } from "react";

export default function Cart() {
  const [showDelete, setShowDelete] = useState<string | null>(null);
  const [showError, setShowError] = useState<string | null>(null);
  const [localQuantities, setLocalQuantities] = useState<{
    [key: number]: number;
  }>({});

  const cartState = useSelector((state: any) => state.cartReducer);
  const productState = useSelector((state: any) => state.productReducer);
  const dispatch = useDispatch();

  const handleDelete = (product: Products) => {
    const confirmDelete = confirm(
      `Bạn có chắc chắn muốn xóa ${product.name} không?`
    );
    if (confirmDelete) {
      dispatch(actionProduct("DELETE", product));
      setShowDelete("Xóa sản phẩm thành công");
      setTimeout(() => {
        setShowDelete(null);
      }, 2000);
    }
  };

  const handleChange = (productId: number, value: number) => {
    setLocalQuantities((prev) => ({ ...prev, [productId]: value }));
  };

  const handleEdit = (product: Products) => {
    const quantity = localQuantities[product.id];
    const productInStock = productState.find(
      (p: Products) => p.id === product.id
    );

    if (quantity > productInStock.quantity) {
      setShowError(
        `Số lượng ${product.name} không được vượt quá ${productInStock.quantity}`
      );
      setTimeout(() => {
        setShowError(null);
      }, 3000);
    } else {
      dispatch(actionProduct("UPDATE", { ...product, quantity }));
      setShowError(null);
    }
  };

  return (
    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h1 className="panel-title">Your Cart</h1>
        </div>
        <div className="panel-body">
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="my-cart-body">
              {cartState.map((item: Products, index: number) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.price} USD</td>
                  <td>
                    <input
                      name={`cart-item-quantity-${item.id}`}
                      type="number"
                      value={localQuantities[item.id] ?? item.quantity}
                      onChange={(e) =>
                        handleChange(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <a
                      className="label label-info update-cart-item"
                      data-product=""
                      onClick={() => handleEdit(item)}
                    >
                      Update
                    </a>
                    <a
                      className="label label-danger delete-cart-item"
                      data-product=""
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot id="my-cart-footer">
              <tr>
                <td colSpan={4}>
                  There are <b>{cartState.length}</b> items in your shopping
                  cart.
                </td>
                <td colSpan={2} className="total-price text-left">
                  {cartState.reduce(
                    (total: number, item: Products) =>
                      total + item.price * item.quantity,
                    0
                  )}{" "}
                  USD
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {showDelete && (
        <div className="alert alert-danger" role="alert" id="mnotification">
          {showDelete}
        </div>
      )}
      {showError && (
        <div className="alert alert-danger" role="alert" id="mnotification">
          {showError}
        </div>
      )}
    </div>
  );
}
