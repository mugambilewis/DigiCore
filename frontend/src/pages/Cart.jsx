import React from "react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/slices/cartSlice";
import Navigation from "../components/Navigation";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navigation />
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Your Cart</h1>
          <div className="mt-2 h-1 w-20 bg-blue-600 rounded-full"></div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="inline-block p-8 bg-gray-50 rounded-2xl">
              <p className="text-xl text-gray-600 mb-6">Your cart is empty.</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                ← Continue shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div className="flex items-center gap-6 flex-1">
                      <div className="w-24 h-24 bg-white rounded-xl border border-gray-200 p-2 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-semibold text-lg text-gray-900 mb-1">
                          {item.name}
                        </h2>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-900">Ksh {item.price.toLocaleString()}</span> × {item.quantity}
                        </p>
                      </div>
                      <div className="text-right mr-4">
                        <p className="text-lg font-bold text-gray-900">
                          Ksh {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-150"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Total + Actions */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-300">
                <span className="text-lg font-medium text-gray-600">Total Amount</span>
                <span className="text-3xl font-bold text-gray-900">
                  Ksh {totalPrice.toLocaleString()}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/checkout"
                  className="flex-1 px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 text-center shadow-sm hover:shadow-md"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="px-8 py-4 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-150"
              >
                ← Continue shopping
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;