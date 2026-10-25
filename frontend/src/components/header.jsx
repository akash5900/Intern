import { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { IoBagHandle } from "react-icons/io5";
import { SiShopify } from "react-icons/si";
import useAuth from "../context/useAuth";
import useCart from "../context/useCart";
import Category from "../components/categorys";

export default function Header() {
  const { user, loading } = useAuth();
  const { totalItems } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      setSearchParams(params, { replace: true });
    }, 600);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <header>
      <div className="shadow-xs border rounded-2xl border-gray-200 md:mx-4 md:mt-2">
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

          <nav className="flex items-center gap-3 md:gap-6 text-gray-900">
            <Link
              to="/cart"
              className="flex items-center gap-1 hover:text-blue-600 mr-1"
            >
              <IoMdCart size={24} className="mt-1" />
              <span className="font-semibold text-sm mt-1">Cart</span>
              <span className="text-blue-800">{totalItems}</span>
            </Link>

            <Link
              to="/orders"
              className="flex items-center gap-1 hover:text-green-600"
            >
              <IoBagHandle size={25} />
              <span className="font-semibold text-sm mt-1">Orders</span>
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
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:text-red-500 mt-1"
                >
                  <BsPersonCircle size={22} />
                  <span className="font-semibold text-sm">Login</span>
                </Link>
              ))}
          </nav>
        </div>
        <div>
          <Category />
        </div>
      </div>
    </header>
  );
}
