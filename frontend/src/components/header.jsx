import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  const [search, setSearch] = useState("");
  const [minprice, setMinprice] = useState("");
  const [maxprice, setMaxprice] = useState("");

  async function searchProducts() {
    try {
      const params = new URLSearchParams();

      if (search.trim() !== "") {
        params.append("search", search.trim());
      }

      if (minprice !== "") {
        params.append("minPrice", minprice);
      }

      if (maxprice !== "") {
        params.append("maxPrice", maxprice);
      }

      if (params.toString() === "") {
        getProducts();
        return;
      }

      const res = await fetch(
        `http://localhost:3000/api/products/search?${params.toString()}`,
      );

      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }

  function clearFilter() {
    setSearch("");
    setMaxprice("");
    setMinprice("");

    getProducts();
  }

  return (
    <div className="px-5 pl-2 py-4 flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold ">Intern</h1>

        <div className="w-[450px] flex items-center gap-2">
          <div className="relative w-full">
            <FaSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchProducts();
                }
                
              }}
              className="border border-gray-300 w-full rounded-lg py-2 pl-9 pr-3 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={searchProducts}
            className="bg-blue-500 text-white border border-blue-500 rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        <Link
          to={"/profile"}
          className="text-xl hover:text-red-500 cursor-pointer font-semibold pt-1"
        >
          Profile
        </Link>
      </div>

      <div className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter size={15} className="text-gray-600" />

          <h2 className="font-semibold text-gray-700">Filter Products</h2>
        </div>

        <div className="flex items-end gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Min Price
            </label>

            <input
              type="number"
              value={minprice}
              onChange={(e) => setMinprice(e.target.value)}
              placeholder="₹ 0"
              className="border border-gray-300 rounded-lg p-2 w-[180px] bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">
              Max Price
            </label>

            <input
              type="number"
              value={maxprice}
              onChange={(e) => setMaxprice(e.target.value)}
              placeholder="₹ 0"
              className="border border-gray-300 rounded-lg p-2 w-[180px] bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
            />
          </div>

          <button
            onClick={searchProducts}
            className="bg-blue-500 text-white rounded-lg px-5 py-2 cursor-pointer hover:bg-blue-600"
          >
            Apply Filter
          </button>

          <button
            onClick={clearFilter}
            className="border border-gray-300 bg-white rounded-lg px-5 py-2 cursor-pointer hover:bg-gray-100"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
