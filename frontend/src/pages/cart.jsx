import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCart() {
    try {
      const res = await fetch("http://localhost:3000/api/cart/usercart", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        setCartItems([]);
        return;
      }

      setCartItems(data.cart || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const shipping = 0;

  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Add some products to your cart and they will appear here.
            </p>

            <Link
              to="/products"
              className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-5 border-b border-gray-100 p-5 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Product Information */}
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-semibold text-gray-900">
                            {item.product.name}
                          </h2>

                          <p className="mt-1 text-sm text-gray-500">
                            ₹{item.product.price}
                          </p>
                        </div>
                      </div>

                      <div className="mt-auto flex items-end justify-between pt-5">
                        <div className="flex items-center rounded-lg border border-gray-200 p-2">
                          <p>Quantity: {item.quantity}</p>
                        </div>

                        <p className="font-semibold text-gray-900">
                          ₹{(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/products"
                className="mt-5 inline-block text-sm font-medium text-gray-600 hover:text-black"
              >
                ← Continue Shopping
              </Link>
            </div>

            <div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>

                    <span className="font-medium text-gray-900">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>

                    <span className="font-medium text-green-600">Free</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-gray-900">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() =>
                    navigate("/checkout", { state: { cartItems } })
                  }
                  type="button"
                  className="mt-6 w-full rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Proceed to Checkout
                </button>

                <p className="mt-4 text-center text-xs text-gray-400">
                  Secure checkout · Free returns
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
