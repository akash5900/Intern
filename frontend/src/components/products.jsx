import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  async function getProducts() {
    try {
      const params = new URLSearchParams();

      if (search) {
        params.append("search", search);
      }

      if (minPrice) {
        params.append("minPrice", minPrice);
      }

      if (maxPrice) {
        params.append("maxPrice", maxPrice);
      }

      const res = await fetch(
        `http://localhost:3000/api/products/allproducts?${params.toString()}`,
      );

      const data = await res.json();

      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, [search, minPrice, maxPrice]);
  return (
    <div className="p-4 flex flex-col md:gap-6 2xl:gap-8">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">All Products</h1>
      </div>

      <div className="grid 2xl:grid-cols-5 2xl:mx-8 md:grid-cols-4 gap-8 2xl:gap-14">
        {products.map((product) => (
          <div
            className="w-[300px] border border-gray-200 flex flex-col gap-2 hover:bg-gray-100 hover:shadow-xl p-4"
            key={product._id}
          >
            <div className="flex justify-center">
              <img
                src={product.image}
                alt={product.name}
                className=" h-[180px] object-cover rounded "
              />
            </div>

            <section className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <h1 className="text-xl font-semibold text-gray-900">
                  Name: {product.name}
                </h1>
                <h2 className="text-lg font-semibold text-gray-800">
                  Price: {product.price}
                </h2>
                <h2 className="text-md font-semibold text-gray-700">
                  Description: {product.description}
                </h2>
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
