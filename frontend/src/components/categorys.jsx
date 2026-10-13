import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Category() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  async function getCategory() {
    try {

      const res = await fetch("http://localhost:3000/api/category/allcategory");

      const data = await res.json();

      setCategory(data.categorys);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="p-4 bg-gray-50 border-t border-b border-gray-200 ">
      <div className="flex overflow-x-auto">
        {category.map((cat) => (
          <div
            className="flex items-center mx-8 cursor-pointer text-gray-600 hover:text-black"
            key={cat._id}
          >
            <div
              onClick={() => {
                navigate(`/categoryproducts/${cat._id}`);
              }}
              className="flex flex-col items-center  "
            >
              <h1 className="text-[15px] font-semibold">
                {cat.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
