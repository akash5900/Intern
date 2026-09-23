import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

function ProductSkeleton() {
  return (
    <div className="w-[300px] border border-gray-200 flex flex-col gap-2 p-4">

      <div className="flex justify-center">
        <div className="w-full h-[180px] rounded bg-gray-200 shimmer" />
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
  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const loadMoreRef = useRef(null);


  async function getProducts(pageNumber, reset = false) {
    if (loading && !reset) return;

    try {
      setLoading(true)

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

      params.append("limit", 15)

      const res = await fetch(
        `http://localhost:3000/api/products/allproducts?${params.toString()}`,
      );

      const data = await res.json();

      if (reset) {
        setProducts(data.products);
      } else {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...data.products,
        ]);
      }

      setHasMore(data.hasMore)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
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

        if (
          firstEntry.isIntersecting &&
          hasMore &&
          !loading
        ) {
          const nextPage = page + 1;

          setPage(nextPage);
          getProducts(nextPage);
        }
      },
      {
        rootMargin: "300px",
      }
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
    <div className="p-4 flex flex-col md:gap-6 2xl:gap-8">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">All Products</h1>
      </div>

      <div className="grid 2xl:grid-cols-5 2xl:mx-8 md:grid-cols-4 gap-8 2xl:gap-14">
        {loading && products.length === 0 ?
          Array.from({ length: 15 }).map((_, index) => (
            <ProductSkeleton key={index} />
          )) : products.map((product) => (
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

        {loading &&
          products.length > 0 &&
          Array.from({ length: 5 }).map((_, index) => (
            <ProductSkeleton key={`loading-${index}`} />
          ))}
      </div>



      {hasMore && (
        <div
          ref={loadMoreRef}
          className="flex justify-center mt-8 h-10"
        >
          {loading && (
            <p className="text-gray-500">
              Loading more products...
            </p>
          )}
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <p className="text-center text-gray-500 mt-8">
          No more products
        </p>
      )}
    </div>
  );
}

export default Products;
