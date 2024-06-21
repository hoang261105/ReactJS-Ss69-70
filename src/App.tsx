import "./css/bootstrap.css";
import "./css/style.css";

import Cart from "./components/Cart";

import ListProduct from "./components/ListProduct";

export default function App() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="row">
        <div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h1 className="panel-title">List Products</h1>
              </div>
              <div className="panel-body" id="list-product">
                <ListProduct />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Cart />
        </div>
      </div>
    </div>
  );
}
