
export default function Cart() {
    const cartItems = [
        {
            id: 1,
            name: "Classic Cotton T-Shirt",
            variant: "Black / Medium",
            price: 79.99,
            quantity: 1,
            image:
                "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
        },
        {
            id: 2,
            name: "Premium Running Shoes",
            variant: "White / Size 9",
            price: 129.99,
            quantity: 1,
            image:
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        Shopping Cart
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        2 items in your cart
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-5 border-b border-gray-100 p-5 last:border-b-0"
                                >
                                    {/* Product Image */}
                                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h2 className="font-semibold text-gray-900">
                                                    {item.name}
                                                </h2>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {item.variant}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="text-gray-400 transition hover:text-red-500"
                                            >
                                                <svg
                                                    className="h-5 w-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="mt-auto flex items-end justify-between pt-5">
                                            {/* Quantity */}
                                            <div className="flex items-center rounded-lg border border-gray-200">
                                                <button
                                                    type="button"
                                                    className="flex h-9 w-9 items-center justify-center text-lg text-gray-600 hover:bg-gray-50"
                                                >
                                                    −
                                                </button>

                                                <span className="flex h-9 w-10 items-center justify-center border-x border-gray-200 text-sm font-medium">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    className="flex h-9 w-9 items-center justify-center text-lg text-gray-600 hover:bg-gray-50"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Price */}
                                            <p className="font-semibold text-gray-900">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>

                        {/* Continue Shopping */}
                        <button
                            type="button"
                            className="mt-5 text-sm font-medium text-gray-600 hover:text-black"
                        >
                            ← Continue Shopping
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-6">

                            <h2 className="text-lg font-semibold text-gray-900">
                                Order Summary
                            </h2>

                            <div className="mt-6 space-y-4">

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>

                                    <span className="font-medium text-gray-900">
                                        $209.98
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Shipping
                                    </span>

                                    <span className="font-medium text-gray-900">
                                        $10.00
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Tax
                                    </span>

                                    <span className="font-medium text-gray-900">
                                        $21.00
                                    </span>
                                </div>

                            </div>

                            {/* Promo */}
                            <div className="mt-6 flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Promo code"
                                    className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-black"
                                />

                                <button
                                    type="button"
                                    className="rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                >
                                    Apply
                                </button>
                            </div>

                            {/* Total */}
                            <div className="mt-6 border-t border-gray-100 pt-5">
                                <div className="flex items-center justify-between">
                                    <span className="text-base font-semibold text-gray-900">
                                        Total
                                    </span>

                                    <span className="text-2xl font-bold text-gray-900">
                                        $240.98
                                    </span>
                                </div>
                            </div>

                            {/* Checkout */}
                            <button
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
            </div>
        </div>
    );
}
