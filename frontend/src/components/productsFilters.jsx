import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ProductsFilters() {
  const [minprice, setMinprice] = useState("");
  const [maxprice, setMaxprice] = useState("");
  const [, setSearchParams] = useSearchParams();

  async function applyFilter() {
    const params = {};

    if (minprice !== "") {
      params.minPrice = minprice;
    }

    if (maxprice !== "") {
      params.maxPrice = maxprice;
    }

    setSearchParams(params);
  }

  function clearFilter() {
    setMaxprice("");
    setMinprice("");
    setSearchParams({});
  }
  return (
    <div>
      <div className="px-4 md:px-8 pb-3">
        <div className="flex flex-wrap items-center gap-3 border border-gray-200 rounded-xl bg-gray-50 p-3 md:px-4">
          <div className="flex items-center gap-2 mr-2">
            <FaFilter size={14} className="text-gray-600" />
            <h2 className="font-semibold text-sm text-gray-700">
              Filter Products
            </h2>
          </div>

          <input
            type="number"
            value={minprice}
            onChange={(e) => setMinprice(e.target.value)}
            placeholder="₹ Min Price"
            className="border border-gray-300 rounded-lg p-2 w-32 md:w-[140px] bg-white text-sm outline-none focus:border-blue-400"
          />

          <input
            type="number"
            value={maxprice}
            onChange={(e) => setMaxprice(e.target.value)}
            placeholder="₹ Max Price"
            className="border border-gray-300 rounded-lg p-2 w-32 md:w-[140px] bg-white text-sm outline-none focus:border-blue-400"
          />

          <button
            onClick={applyFilter}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 text-sm hover:bg-blue-700"
          >
            Apply Filter
          </button>

          <button
            onClick={clearFilter}
            className="border border-gray-300 bg-white rounded-lg px-4 py-2 text-sm hover:bg-gray-100"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
