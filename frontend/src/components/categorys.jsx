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

  // async function handleDelete(id) {
  //     try {
  //         const res = await fetch(`http://localhost:3000/api/category/${id}`, {
  //             method: "DELETE"
  //         });
  //         const data = await res.json();
  //         alert("Category Deleted");
  //         getCategory()
  //     }
  //     catch (error) {
  //         console.log(error);
  //     }
  // }

  return (
    <div className="flex flex-col md:gap-6 2xl:gap-10 p-4 bg-gray-100">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">All Category</h1>
        {/* <Link to={"/addcategory"} className="text-lg font-semibold  hover:text-red-500 ">+Add Category</Link> */}
      </div>
      <div className="flex gap-4 md:mb-2">
        {category.map((cat) => (
          <div
            className=" border border-gray-400 hover:shadow-lg rounded w-[190px] hover:bg-white flex flex-col items-center gap-3 p-2 mx-6 cursor-pointer"
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
