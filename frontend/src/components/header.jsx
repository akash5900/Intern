import { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { IoBagHandle } from "react-icons/io5";

export default function Header() {
  const [, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState("");
  const [minprice, setMinprice] = useState("");
  const [maxprice, setMaxprice] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = {};

      if (search.trim() !== "") {
        params.search = search.trim();
      }

      setSearchParams(params);
    }, 600)

    return () => clearTimeout(timer);
  }, [search])

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
    setSearch("");
    setMaxprice("");
    setMinprice("");

    setSearchParams({});
  }

  return (
    <div className="px-8 py-4 flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="text-2xl text-gray-800 font-semibold mt-1">Shopy</h1>

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
              className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2 pl-9 pr-3 text-xs outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
            />
          </div>
        </div>

        <section className="flex gap-15 text-gray-700 ml-2 ">
          <Link to={"/orders"} className=" flex items-center gap-1 cursor-pointer hover:text-green-500">
            <IoBagHandle size={25} />
            <h1 className="text-md font-semibold pt-1">Orders</h1>
          </Link>

          <Link to={"/cart"} className=" flex items-center gap-1 cursor-pointer hover:text-blue-500">
            <IoMdCart size={25} className="mt-1" />
            <h1 className="text-md font-semibold pt-1">Cart</h1>
          </Link>

          <Link to={"/profile"} className=" flex items-center gap-1 cursor-pointer hover:text-red-500 ">
            <BsPersonCircle size={25} />
            <h1 className="text-md font-semibold pt-1">Profile</h1>
          </Link>
        </section>
      </div>

      <div className="w-full border border-gray-200 rounded-xl p-4 bg-gray-50 shadow-sm flex gap-20">
        <div className="flex items-center gap-2 mb-4">
          <FaFilter size={15} className="text-gray-600" />

          <h2 className="font-semibold text-gray-700">Filter Products</h2>
        </div>

        <div className="flex items-end gap-4">
          <input
            type="number"
            value={minprice}
            onChange={(e) => setMinprice(e.target.value)}
            placeholder="₹ Min Price"
            className="border border-gray-300 rounded-lg p-2 w-[180px] bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
          />

          <input
            type="number"
            value={maxprice}
            onChange={(e) => setMaxprice(e.target.value)}
            placeholder="₹  Max Price"
            className="border border-gray-300 rounded-lg p-2 w-[180px] bg-white outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
          />

          <button
            onClick={applyFilter}
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
