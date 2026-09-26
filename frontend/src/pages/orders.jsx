export default function Order() {

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

                <div className="mb-8">
                    <button
                        type="button"
                        className="mb-5 text-sm font-medium text-gray-500 hover:text-black"
                    >
                        ← Back to Orders
                    </button>

                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Order
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                                Placed on
                            </p>
                        </div>

                        <span className="w-fit rounded-full bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
                           
                        </span>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">

                    <div className="lg:col-span-2">
                        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

                            <div className="border-b border-gray-100 px-6 py-5">
                                <h2 className="font-semibold text-gray-900">
                                    Order Items
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                     products
                                </p>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 p-6"
                                    >
                                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">
                                                        {item.name}
                                                    </h3>

                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item.variant}
                                                    </p>
                                                </div>

                                                <p className="font-semibold text-gray-900">
                                                    $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </p>
                                            </div>

                                            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                                                <span>
                                                    Qty: {item.quantity}
                                                </span>

                                                <span>·</span>

                                                <span>
                                                    $
                                                    {item.price.toFixed(2)} each
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
                            <h2 className="font-semibold text-gray-900">
                                Shipping Address
                            </h2>

                            <div className="mt-4 text-sm leading-6 text-gray-500">
                                <p className="font-medium text-gray-900">
                                    John Doe
                                </p>
                                <p>123 Main Street</p>
                                <p>New York, NY 10001</p>
                                <p>United States</p>
                                <p className="mt-1">+1 234 567 890</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:sticky lg:top-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Order Summary
                            </h2>

                            <div className="mt-6 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Subtotal
                                    </span>

                                    <span className="font-medium">
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        Shipping
                                    </span>

                                    <span className="font-medium">
                                        ${shipping.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-gray-100 pt-5">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">
                                        Total
                                    </span>

                                    <span className="text-2xl font-bold">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
