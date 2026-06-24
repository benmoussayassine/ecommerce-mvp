import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const addItem = (product) => {
    dispatch(addCart(product));
  };

  const removeItem = (product) => {
    dispatch(delCart(product));
  };

  // EMPTY CART
  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">Your Cart is Empty</h4>
            <Link to="/" className="btn btn-outline-dark">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  // CART CONTENT
  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <section className="h-100">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            {/* ITEMS LIST */}
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart Items</h5>
                </div>

                <div className="card-body">
                  {state.map((item) => (
                    <div key={item.id}>
                      <div className="row align-items-center">
                        {/* IMAGE */}
                        <div className="col-lg-3 col-md-12">
                          <img
                            src={
                              item.image
                                ? `http://127.0.0.1:8000/uploads/products/${item.image}`
                                : "https://via.placeholder.com/100"
                            }
                            alt={item.name}
                            width={100}
                            height={75}
                          />
                        </div>

                        {/* NAME */}
                        <div className="col-lg-5 col-md-6">
                          <p>
                            <strong>{item.name}</strong>
                          </p>
                          <p className="text-muted">${item.price}</p>
                        </div>

                        {/* QTY CONTROL */}
                        <div className="col-lg-4 col-md-6">
                          <div className="d-flex align-items-center mb-3">
                            <button
                              className="btn btn-sm btn-outline-dark"
                              onClick={() => removeItem(item)}
                            >
                              -
                            </button>

                            <span className="mx-3">{item.qty}</span>

                            <button
                              className="btn btn-sm btn-outline-dark"
                              onClick={() => addItem(item)}
                            >
                              +
                            </button>
                          </div>

                          <p>
                            <strong>
                              {item.qty} x ${item.price}
                            </strong>
                          </p>
                        </div>
                      </div>

                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-header bg-light">
                  <h5>Order Summary</h5>
                </div>

                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      Products ({totalItems})
                      <span>${Math.round(subtotal)}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between">
                      Shipping
                      <span>${shipping}</span>
                    </li>

                    <li className="list-group-item d-flex justify-content-between fw-bold">
                      Total
                      <span>${Math.round(subtotal + shipping)}</span>
                    </li>
                  </ul>

                  <Link to="/checkout" className="btn btn-dark w-100 mt-3">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <>
      <Navbar />

      <div className="container my-3">
        <h1 className="text-center">Cart</h1>
        <hr />

        {state.length > 0 ? <ShowCart /> : <EmptyCart />}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
