import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";

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

function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const loadMoreRef = useRef(null);

  const navigate = useNavigate();

  async function getProducts(pageNumber, reset = false) {
    if (loading && !reset) return;

    try {
      setLoading(true);

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

      params.append("page", pageNumber);

      params.append("limit", 15);

      const res = await fetch(
        `http://localhost:3000/api/products/allproducts?${params.toString()}`,
      );

      const data = await res.json();

      if (reset) {
        setProducts(data.products);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
      }

      setHasMore(data.hasMore);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);

    getProducts(1, true);
  }, [search, minPrice, maxPrice]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;

          setPage(nextPage);
          getProducts(nextPage);
        }
      },
      {
        rootMargin: "300px",
      },
    );

    const currentRef = loadMoreRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [page, hasMore, loading]);
  return (
    <div className="flex flex-col md:gap-4 2xl:gap-6 md:px-4 2xl:px-6 py-3 ">
      <div>
        <h1 className="md:text-xl xl:text-2xl text-gray-800 font-semibold">
          Products for you
        </h1>
      </div>

      <div className="grid md:grid-cols-4 2xl:grid-cols-5 md:gap-15 2xl:gap-18 ">
        {loading && products.length === 0
          ? Array.from({ length: 15 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : products.map((product) => (
              <div
                className=" md:w-[280px] 2xl:w-[300px] border border-gray-200 flex flex-col gap-2 hover:bg-gray-100 hover:shadow-xl transition px-4 pt-4 pb-2 cursor-pointer"
                key={product._id}
                onClick={() => {navigate(`/productdetail/${product._id}`); window.scrollTo(0, 0);}}
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

      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center mt-8 h-10">
          {loading && <p className="text-gray-500">Loading more products...</p>}
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <p className="text-center text-gray-500 mt-8">No more products</p>
      )}
    </div>
  );
}

export default Products;
