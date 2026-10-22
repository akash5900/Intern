import { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { IoBagHandle } from "react-icons/io5";
import { SiShopify } from "react-icons/si";
import useAuth from "../context/useAuth";

export default function Header() {
  const { user, loading } = useAuth();
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

      setSearchParams((previous) => {
        const next = Object.fromEntries(previous.entries());

        delete next.search;

        if (search.trim()) {
          next.search = search.trim();
        }

        return next;
      });
    }, 600);

    return () => clearTimeout(timer);
  }, [search, setSearchParams]);

  function applyFilter() {
    setSearchParams((previous) => {
      const next = Object.fromEntries(previous.entries());

      delete next.minPrice;
      delete next.maxPrice;

      if (minprice !== "") next.minPrice = minprice;
      if (maxprice !== "") next.maxPrice = maxprice;

      return next;
    });
  }

  function clearFilter() {
    setSearch("");
    setMaxprice("");
    setMinprice("");
    setSearchParams({});
  }

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="px-4 md:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <SiShopify size={27} className="text-gray-900" />
          <h1 className="text-2xl text-gray-900 font-bold">Shopsy</h1>
        </Link>

        <div className="relative order-3 md:order-none w-full md:flex-1 md:max-w-[450px] md:mx-6">
          <FaSearch
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200"
          />
        </div>

        <nav className="flex items-center gap-3 md:gap-6 text-gray-700">
          <Link
            to="/orders"
            className="flex items-center gap-1 hover:text-green-600"
          >
            <IoBagHandle size={25} />
            <span className="font-semibold text-sm mt-1">Orders</span>
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <IoMdCart size={24} className="mt-1" />
            <span className="font-semibold text-sm mt-1">Cart</span>
          </Link>

          {!loading &&
            (user ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:text-red-500 "
              >
                <BsPersonCircle size={23} className="mt-1" />
                <span className="font-semibold text-sm mt-1">
                  {user.username}
                </span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:text-red-500 "
              >
                <BsPersonCircle size={22} />
                <span className="font-semibold text-sm">Login</span>
              </Link>
            ))}
        </nav>
      </div>

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
    </header>
  );
}
