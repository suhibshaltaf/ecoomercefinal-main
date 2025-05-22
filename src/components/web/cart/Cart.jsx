import React, { useContext } from "react";
import "./cart.css";
import { CartContext } from "../context/Cart";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Puff } from "react-loading-icons";

export default function Cart() {
  const {
    getCartContext,
    removeItemContext,
    clearCartContext,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const getCart = async () => {
    const res = await getCartContext();
    return res;
  };

  const removeItem = async (productId) => {
    await removeItemContext(productId);
  };

  const { data, isLoading, refetch } = useQuery("cart", getCart);

  const clearCart = async () => {
    await clearCartContext();
    refetch();
  };

  const increase = async (productId) => {
    await increaseQuantity(productId);
    refetch();
  };

  const decrease = async (productId) => {
    await decreaseQuantity(productId);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="loading">
        <Puff height="80" width="80" color="#1115e7" />
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="row">
          <div className="cart-items">
            <div className="products" id="products">
              <div className="item header">
                <div className="product-info">
                  <h2>Product</h2>
                </div>
                <div className="quantity">
                  <h2>Quantity</h2>
                </div>
                <div className="price">
                  <h2>Price</h2>
                </div>
                <div className="subtotal">
                  <h2>Subtotal</h2>
                </div>
              </div>

              {data && data.products.length > 0 ? (
                <>
                  {data.products.map((product, index) => (
                    <div className="item" key={index}>
                      <div className="product-info">
                        <img
                          src={product.details.mainImage.secure_url}
                          alt={product.details.name}
                        />
                        <div className="product-details">
                          <h2>{product.details.name}</h2>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              removeItem(product.details._id);
                              refetch();
                            }}
                          >
                            remove
                          </a>
                        </div>
                      </div>
                      <div className="quantity">
                        <button onClick={() => decrease(product.details._id)}>-</button>
                        <span>{product.quantity}</span>
                        <button onClick={() => increase(product.details._id)}>+</button>
                      </div>
                      <div className="price">${product.details.price}</div>
                      <div className="subtotal">
                        ${(product.quantity * product.details.price).toFixed(2)}
                      </div>
                    </div>
                  ))}

                  {/* زر Clear Cart تحت المنتجات مباشرة */}
                  <div className="clear-cart-button text-center">
                    <button className="btn btn-danger w-25 my-4 p-3 rounded-3" onClick={clearCart}>
                      Clear Cart
                    </button>
                  </div>
                </>
              ) : (
                <div className="empty-cart-message">
                  <h3>Your cart is currently empty.</h3>
                </div>
              )}
            </div>

            {/* ملخص السلة يظهر فقط إذا في منتجات */}
            {data && data.products.length > 0 && (
              <div className="cart-summary">
                <h2>Cart summary</h2>
                <div className="summery-items">
                  <div className="summary-item">
                    <div className="form-group">
                      <input type="radio" name="shipping" /> <label>Express shipping</label>
                    </div>
                    <span>$10.00</span>
                  </div>
                  <div className="summary-item">
                    <div className="form-group">
                      <input type="radio" name="shipping" /> <label>Pick Up</label>
                    </div>
                    <span>$21.00</span>
                  </div>
                  <div className="summary-footer">
                    <label>Subtotal</label>
                    <span>
                      $
                      {data.products
                        .reduce(
                          (acc, product) => acc + product.details.price * product.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="checkout">
                    <Link to="/createOrder">Checkout</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
