import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { FaStar, FaShoppingCart, FaBolt } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { HiMiniShieldCheck } from "react-icons/hi2";
import Footer from "../components/footer";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [moreProducts, setMoreProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);

  async function getProduct() {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`);

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }

      setProduct(data.product);

      if (data.product?.variants) {
        try {
          const variants =
            typeof data.product.variants === "string"
              ? JSON.parse(data.product.variants)
              : data.product.variants;

          if (variants.length > 0) {
            setSelectedVariant(variants[0]);
          } else {
            setSelectedVariant(null);
          }
        } catch (error) {
          console.log("Invalid variants:", error);
        }
      } else {
        setSelectedVariant(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getMoreProducts() {
    try {
      const res = await fetch(
        "http://localhost:3000/api/products/allproducts?page=1&limit=30",
      );

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }

      const filteredProducts = (data.products || []).filter(
        (item) => item._id !== id,
      );

      setMoreProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setProduct(null);
    setSelectedVariant(null);

    getProduct();
    getMoreProducts();
  }, [id]);

  let variants = [];

  try {
    variants =
      typeof product?.variants === "string"
        ? JSON.parse(product.variants)
        : product?.variants || [];
  } catch (error) {
    console.log("Invalid variants:", error);
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  function buyNow() {
    navigate("/checkout", {
      state: {
        product,
        price: currentPrice,
        variant: selectedVariant,
        quantity,
      },
    });
  }

  async function addToCart() {
    try {
      const matchingVariant = selectedVariant
        ? variants.find(
            (variant) => String(variant._id) === String(selectedVariant._id),
          )
        : null;

      const res = await fetch("http://localhost:3000/api/cart/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: product._id,
          quantity,
          variant: matchingVariant,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(data.message);
      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  }

  const currentPrice = selectedVariant?.price ?? product.price;

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="px-4 md:px-10 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <div className="flex items-center justify-center bg-gray-50 rounded-xl p-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-lg h-[450px] object-contain rounded-lg"
            />
          </div>

          <section className="flex flex-col ml-15 gap-5">
            <span className="w-fit bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              {product.category?.name || "N/A"}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-md">
                <span className="text-sm font-medium">
                  {product.ratings || 0}
                </span>

                <FaStar className="text-xs" />
              </div>

              <span className="text-gray-500 text-sm">Customer Rating</span>
            </div>

            <div className="flex items-center gap-1">
              <BiRupee className="text-3xl text-gray-900" />

              <span className="text-3xl font-bold text-gray-900">
                {currentPrice}
              </span>
            </div>

            <div className="border-t border-gray-200" />
            <div>
              <p className="text-gray-600 leading-7">{product.description}</p>
            </div>

            {variants.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Select Variant</h2>

                <div className="flex flex-wrap gap-4">
                  {variants.map((variant) => (
                    <button
                      key={variant._id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`border rounded-xl px-4 py-3 transition ${
                        selectedVariant?._id === variant._id
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      <div className="font-medium">{variant.size}</div>

                      <div className="text-sm text-gray-500">
                        {variant.color}
                      </div>

                      <div className="text-sm font-semibold">
                        ₹{variant.price}
                      </div>

                      <div className="text-xs text-gray-500">
                        Stock: {variant.stock}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <TbTruckDelivery color="green" />

                <h1 className="text-[13px]">Free Delivery</h1>
              </div>

              <div className="flex items-center gap-1">
                <HiMiniShieldCheck color="blue" />

                <h1 className="text-[13px]">1 Year Warranty</h1>
              </div>

              <div className="flex items-center gap-1">
                <FaArrowRotateLeft size={11} color="red" />

                <h1 className="text-[13px]"> 30-day returns </h1>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-3">
              <button
                onClick={buyNow}
                className="flex items-center justify-center gap-2 cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg px-6 py-3 transition"
              >
                <FaBolt />
                Buy Now
              </button>

              <button
                onClick={addToCart}
                className="flex items-center justify-center gap-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg px-6 py-3 transition"
              >
                <FaShoppingCart />
                Add To Cart
              </button>
            </div>
          </section>
        </div>

        {moreProducts.length > 0 && (
          <section className="mt-12 mb-4 ml-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
                More Products
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-16 ">
              {moreProducts.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/productdetail/${item._id}`)}
                  className=" md:w-[270px] 2xl:w-[300px] border border-gray-200 flex flex-col gap-2 hover:bg-gray-100 hover:shadow-xl px-4 pt-4 pb-2 cursor-pointer"
                >
                  <div className="flex justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="md:h-[150px] 2xl:h-[210px] w-full object-cover rounded "
                    />
                  </div>

                  <section className="flex flex-col gap-2 text-gray-700">
                    <div className="flex justify-between">
                      <h1 className="md:text-md 2xl:text-[15px] font-semibold ">
                        {item.name}
                      </h1>

                      <div className="flex items-center">
                        <BiRupee />

                        <h2 className="md:text-md 2xl:text-md font-semibold text-gray-800">
                          {item.price}
                        </h2>
                      </div>
                    </div>

                    <p className="text-md truncate mb-1">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 ">
                        <FaStar size={12} color="orange" />
                        <p className="text-[15px] font-bold">{item.ratings}</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <FaArrowRotateLeft size={11} />

                        <h1 className="text-[13px]"> 30-day returns </h1>
                      </div>
                    </div>
                  </section>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
