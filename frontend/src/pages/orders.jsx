import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiRupee } from "react-icons/bi";

export default function Order() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getOrder() {
    try {
      const res = await fetch(
        `http://localhost:3000/api/order/userorder`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      setOrders(data.orders || null);
    } catch (error) {
      console.error("Get order error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrder();
  }, []);

  async function handleDelete(id) {
    try {

      const res = await fetch(`http://localhost:3000/api/order/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return
      }

      alert(data.message)

      getOrder();

    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading order...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">You have not placed any orders yet.</p>

          <button
            onClick={() => navigate("/")}
            className="text-blue-600 font-medium hover:underline"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Order Details
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                {orders.length} order
                {orders.length !== 1 ? "s" : ""}
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="text-blue-600 cursor-pointer font-medium "
            >
              Home
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
            >

              <div className="border-b border-gray-100 px-6 py-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID
                    </p>

                    <p className="mt-1 font-medium text-gray-900 break-all">
                      {order._id}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Placed on{" "}
                      {new Date(order.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1.5 text-sm font-medium ${order.orderStatus === "Delivered"
                      ? "bg-green-50 text-green-700"
                      : order.orderStatus === "Cancelled"
                        ? "bg-red-50 text-red-700"
                        : order.orderStatus === "Shipped"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>


              <div className="divide-y divide-gray-100">
                {order.products?.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 p-6"
                  >
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                      {item.product?.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {item.product?.name || "Product"}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <div className="flex items-center font-semibold text-gray-900">
                          <BiRupee />

                          {(
                            Number(item.price) *
                            Number(item.quantity)
                          ).toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-4">
                        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                          <span>
                            Qty: {item.quantity}
                          </span>

                          <span>·</span>

                          <span className="flex items-center">
                            <BiRupee />

                            {Number(item.price).toFixed(2)} each
                          </span>
                        </div>

                        <button onClick={() => handleDelete(order._id)} className="cursor-pointer mt-4 text-red-500 border rounded px-2">
                          Cancel Order
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 px-6 py-5">
                <h2 className="font-semibold text-gray-900">
                  Shipping Address
                </h2>

                <div className="mt-3 text-sm leading-6 text-gray-500">
                  <p className="font-medium text-gray-900">
                    {order.address?.username}
                  </p>

                  <p>
                    {order.address?.houseaddress}
                  </p>

                  <p>
                    {order.address?.city},{" "}
                    {order.address?.state} -{" "}
                    {order.address?.pincode}
                  </p>

                  <p>
                    {order.address?.mobilenumber}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 bg-gray-50 px-6 py-5">
                <div className="grid gap-5 sm:grid-cols-3">

                  <div>
                    <p className="text-sm text-gray-500">
                      Payment Method
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                      {order.paymentmethod}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Payment Status
                    </p>

                    <p
                      className={`mt-1 font-medium ${order.paymentstatus === "Paid"
                        ? "text-green-600"
                        : order.paymentstatus === "Cancelled"
                          ? "text-red-600"
                          : "text-yellow-600"
                        }`}
                    >
                      {order.paymentstatus}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="mt-1 flex items-center text-xl font-bold text-gray-900">
                      <BiRupee />

                      {Number(order.totalamount).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}