import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaArrowRotateRight } from "react-icons/fa6";
import useAuth from "../context/useAuth";

export default function Banner() {
  const { user } = useAuth();
  return (
    <section className="w-full px-3 py-4 md:px-4">
      <div className="flex flex-col items-center overflow-hidden rounded-2xl bg-[#f8f2e8] md:min-h-[400px] md:flex-row md:gap-2 2xl:gap-10 ">
        <div className="flex w-full flex-col gap-4 px-5 py-8 sm:px-8 md:w-1/2 md:py-4 lg:px-8 2xl:ml-[10px]">
          <div className="flex items-center gap-2 text-xl font-semibold text-slate-900">
            <h1 className="text-2xl font-bold text-gray-700">Hello {user?.username || "Guest"}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-widest text-slate-600 sm:text-sm">
            <span>NEW SEASON</span>
            <span>•</span>
            <span>NEW STYLES</span>
            <span>•</span>
            <span>JUST FOR YOU</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold leading-tight text-blue-700 sm:text-4xl lg:text-5xl">
              Up to 50% Off
              <span className="mt-1 block text-4xl text-slate-950">
                On Your Favourite Picks
              </span>
            </h2>

            <p className="max-w-lg text-sm leading-6 text-slate-600 sm:text-base">
              Trendy fashion, latest gadgets, home essentials and more. Shop
              smarter, live better.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Shop Now
              <span aria-hidden="true" className="text-xl">
                →
              </span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 pt-2 text-xs font-medium text-slate-700 sm:gap-x-5 sm:text-sm">
            <div className="flex items-center gap-2">
              <TbTruckDelivery size={23} />
              <span>Fast Delivery</span>
            </div>

            <div className="hidden h-7 border-l border-slate-300 sm:block" />

            <div className="flex items-center gap-2">
              <RiSecurePaymentFill size={21} />
              <span>Secure Payments</span>
            </div>

            <div className="hidden h-7 border-l border-slate-300 sm:block" />

            <div className="flex items-center gap-2">
              <FaArrowRotateRight size={19} />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center px-4 pb-6 md:w-1/2 md:self-stretch md:px-2 md:pr-0 md:pb-0 ">
          <img
            src="/images/shopsy-products.png"
            alt="Fashion accessories, sneakers, headphones and electronics"
            className="h-auto max-h-[420px] w-full object-contain 2xl:ml-[250px]"
          />
        </div>
      </div>
    </section>
  );
}
