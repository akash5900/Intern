import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

function ProductSkeleton() {
  return (
    <div className="md:w-[250px] 2xl:w-[300px] border border-gray-200 flex flex-col gap-2 p-4">
      <div className="flex justify-center">
        <div className="w-full md:h-[150px] 2xl:h-[180px] rounded bg-gray-200 shimmer" />
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="h-6 w-3/4 rounded bg-gray-200 shimmer" />

          <div className="h-5 w-1/3 rounded bg-gray-200 shimmer" />

          <div className="h-4 w-full rounded bg-gray-200 shimmer" />

          <div className="h-4 w-5/6 rounded bg-gray-200 shimmer" />

          <div className="h-4 w-2/3 rounded bg-gray-200 shimmer" />
        </div>
      </section>
    </div>
  );
}

function Categoryproducts() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getProducts() {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/api/products/category?category=${id}`,
      );
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, [id]);

  return (
    <div className="pt-4 flex flex-col gap-6 ">
      <h1 className="px-8 text-2xl text-gray-900 font-semibold">
        Category Products
      </h1>
      <div className="px-8 grid md:grid-cols-4 2xl:grid-cols-5 gap-8">
        {loading && products.length === 0
          ? Array.from({ length: 15 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : products.map((product) => (
              <div
                className="w-[300px] cursor-pointer border border-gray-200 flex flex-col gap-2 hover:bg-gray-100 hover:shadow-xl p-4"
                key={product._id}
                onClick={() => navigate(`/productdetail/${product._id}`)}
              >
                <div className="flex justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="md:h-[150px] 2xl:h-[210px] w-full object-cover rounded "
                  />
                </div>

                <section className="flex flex-col gap-2 text-gray-700">
                  <div className="flex justify-between">
                    <h1 className="md:text-md 2xl:text-[15px] font-semibold ">
                      {product.name}
                    </h1>

                    <div className="flex items-center">
                      <BiRupee />

                      <h2 className="md:text-md 2xl:text-md font-semibold text-gray-800">
                        {product.price}
                      </h2>
                    </div>
                  </div>

                  <p className="text-md truncate mb-1">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 ">
                      <FaStar size={12} color="orange" />
                      <p className="text-[15px] font-bold">{product.ratings}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <FaArrowRotateLeft size={11} />

                      <h1 className="text-[13px]"> 30-day returns </h1>
                    </div>
                  </div>
                </section>
              </div>
            ))}
        {loading &&
          products.length > 0 &&
          Array.from({ length: 5 }).map((_, index) => (
            <ProductSkeleton key={`loading-${index}`} />
          ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Categoryproducts;
