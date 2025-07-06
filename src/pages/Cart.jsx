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
        <h1 className="text-3xl font-bold mb-10 text-gray-900">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Your cart is empty.</p>
            <Link
              to="/"
              className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
            >
              ← Continue shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain"
                    />
                    <div>
                      <h2 className="font-semibold text-lg text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        ${item.price.toLocaleString()} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Total + Actions */}
            <div className="mt-10 border-t pt-6 flex justify-between items-center flex-wrap gap-4">
              <div className="text-lg font-semibold text-gray-800">
                Total: ${totalPrice.toLocaleString()}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
