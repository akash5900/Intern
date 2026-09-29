import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [addressForm, setAddressForm] = useState({
    username: "",
    mobilenumber: "",
    houseaddress: "",
    city: "",
    pincode: "",
    state: "",
  });

  const checkoutProduct = location.state;

  async function saveAddress() {
    if (
      !addressForm.username ||
      !addressForm.mobilenumber ||
      !addressForm.houseaddress ||
      !addressForm.city ||
      !addressForm.pincode ||
      !addressForm.state
    ) {
      alert("Please fill all address fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/address/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(addressForm),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      console.log("Address added:", data);

      setAddresses((prev) => [...prev, data.Address]);

      setSelectedAddress(data.Address);

      setShowAddressForm(false);

      setAddressForm({
        username: "",
        mobilenumber: "",
        houseaddress: "",
        city: "",
        pincode: "",
        state: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteAddress(id) {
    try {
      const res = await fetch(`http://localhost:3000/api/address/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setAddresses((prev) => prev.filter((address) => address._id !== id));

      if (selectedAddress?._id === id) {
        setSelectedAddress(null);
      }

      console.log(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAddresses() {
    try {
      const res = await fetch(
        "http://localhost:3000/api/address/useraddresses",
        {
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }

      setAddresses(data.Addresses || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAddresses();
  }, []);

  async function placeOrderCOD() {

    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    try {

      const totalamount = Number(checkoutProduct.price) * Number(checkoutProduct.quantity);

      const res = await fetch("http://localhost:3000/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          products: [
            {
              product: checkoutProduct.product._id,
              quantity: checkoutProduct.quantity,
              price: checkoutProduct.price,
            }
          ],
          totalamount,
          address: {
            username: selectedAddress.username,
            mobilenumber: selectedAddress.mobilenumber,
            houseaddress: selectedAddress.houseaddress,
            city: selectedAddress.city,
            pincode: selectedAddress.pincode,
            state: selectedAddress.state,
          },
          paymentmethod: "COD"
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to place order");
        return;
      }

      alert(data.message);

      navigate("/orders")

    } catch (error) {
      console.log(error);
    }
  }

  if (!checkoutProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No product selected for checkout.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-10 lg:px-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-5">Product</h2>

            <div className="flex gap-5">
              <img
                src={checkoutProduct.product.image}
                alt={checkoutProduct.product.name}
                className="w-32 h-32 object-contain bg-gray-50 rounded-lg"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {checkoutProduct.product.name}
                </h3>

                {checkoutProduct.variant && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>
                      Size:{" "}
                      <span className="font-medium">
                        {checkoutProduct.variant.size}
                      </span>
                    </p>

                    <p>
                      Color:{" "}
                      <span className="font-medium">
                        {checkoutProduct.variant.color}
                      </span>
                    </p>
                  </div>
                )}

                <div className="flex items-center mt-3">
                  <BiRupee />

                  <span className="text-xl font-bold">
                    {checkoutProduct.price}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Quantity: {checkoutProduct.quantity}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">Delivery Address</h2>

              <button
                onClick={() => setShowAddressForm((prev) => !prev)}
                className="cursor-pointer text-blue-600 font-medium"
              >
                + Add Address
              </button>
            </div>

            {showAddressForm && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-5">Add New Address</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>

                    <input
                      type="text"
                      required
                      value={addressForm.username}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          username: e.target.value,
                        })
                      }
                      placeholder="Enter name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Mobile Number
                    </label>

                    <input
                      type="tel"
                      required
                      value={addressForm.mobilenumber}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          mobilenumber: e.target.value,
                        })
                      }
                      placeholder="Enter mobile number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      House Address
                    </label>

                    <input
                      type="text"
                      required
                      value={addressForm.houseaddress}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          houseaddress: e.target.value,
                        })
                      }
                      placeholder="Enter house number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City
                    </label>

                    <input
                      type="text"
                      required
                      value={addressForm.city}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          city: e.target.value,
                        })
                      }
                      placeholder="Enter city"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Pincode
                    </label>

                    <input
                      type="number"
                      required
                      value={addressForm.pincode}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          pincode: e.target.value,
                        })
                      }
                      placeholder="Enter pincode"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      State
                    </label>

                    <input
                      type="text"
                      required
                      value={addressForm.state}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          state: e.target.value,
                        })
                      }
                      placeholder="Enter state"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  onClick={saveAddress}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg mb-2"
                >
                  Save Address
                </button>
              </div>
            )}

            {loading ? (
              <p className="text-gray-500">Loading addresses...</p>
            ) : addresses.length === 0 ? (
              <p className="text-gray-500">
                No address found. Please add an address.
              </p>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    onClick={() => setSelectedAddress(address)}
                    className={`border rounded-xl p-4 cursor-pointer transition ${selectedAddress?._id === address._id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        checked={selectedAddress?._id === address._id}
                        onChange={() => setSelectedAddress(address)}
                      />

                      <div className="flex  items-start justify-between gap-6 w-full">
                        <div>
                          <p className="font-semibold">{address.username}</p>

                          <p className="text-sm text-gray-600">
                            {address.mobilenumber}
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            {address.houseaddress}, {address.city},{" "}
                            {address.state} - {address.pincode}
                          </p>
                        </div>

                        <button
                          onClick={() => deleteAddress(address._id)}
                          className="cursor-pointer hover:text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            <div className="border border-blue-600 bg-blue-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <input type="radio" checked readOnly />

                <div>
                  <p className="font-semibold">Cash on Delivery</p>

                  <p className="text-sm text-gray-500">
                    Pay when your order is delivered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Product</span>

              <span className="font-medium">
                {checkoutProduct.product.name}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Quantity</span>

              <span>{checkoutProduct.quantity}</span>
            </div>

            <div className="border-t border-gray-200 my-5" />

            <div className="flex justify-between">
              <span className="text-lg font-semibold">Total</span>

              <div className="flex items-center">
                <BiRupee />

                <span className="text-xl font-bold">
                  {checkoutProduct.price * checkoutProduct.quantity}
                </span>
              </div>
            </div>

            <button
              disabled={!selectedAddress}
              onClick={placeOrderCOD}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg px-6 py-3 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
