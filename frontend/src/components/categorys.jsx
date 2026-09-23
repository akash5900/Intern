import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function CategorySkeleton() {
  return (
    <div className="w-[190px] border border-gray-200 rounded flex flex-col items-center gap-3 p-2 mx-8">
      <div className="w-full h-28 rounded shimmer"></div>

      <div className="h-5 w-24 rounded shimmer"></div>
    </div>
  )
}

export default function Category() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getCategory() {
    try {
      setLoading(true)

      const res = await fetch("http://localhost:3000/api/category/allcategory");

      const data = await res.json();

      setCategory(data.categorys);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="flex flex-col md:gap-6 2xl:gap-10 p-4 bg-gray-100 ">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">All Category</h1>
      </div>
      <div className="flex gap-4 md:mb-2 overflow-x-auto">
        {loading && category.length === 0 ?
          Array.from({ length: 7 }).map((_, index) => (
            <CategorySkeleton key={index} />
          )) : category.map((cat) => (
            <div
              className=" border border-gray-400 hover:shadow-lg rounded shrink-0 w-[190px] hover:bg-white flex flex-col items-center gap-3 p-2 mx-8 cursor-pointer"
              key={cat._id}
            >
              <div
                onClick={() => {
                  navigate(`/categoryproducts/${cat._id}`);
                }}
                className="flex flex-col items-center gap-3 "
              >
                <img className="object-cover rounded h-29" src={cat.image} />
                <h1 className="text-lg font-semibold">{cat.name}</h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
