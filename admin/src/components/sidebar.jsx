import { BiSolidDownArrow } from "react-icons/bi";
import { useState } from "react";
import { Link } from "react-router-dom"

export default function Sidebar() {

    const [openproduct, setOpenproduct] = useState(false);
    const [opencategory, setOpencategory] = useState(false)
    return <div className="p-3">
        <h1 className="text-2xl font-semibold mb-4 text-gray-900">Admin Panel</h1>
        <ul className="space-y-2 ml-2">
            <li>
                <div onClick={() => setOpenproduct(!openproduct)} className="flex items-center gap-1 cursor-pointer text-blue-900">
                    <h1 className="text-lg font-semibold ">Products</h1>
                    <BiSolidDownArrow size={14} />
                </div>

                {openproduct && (
                    <ul className="ml-4 mt-2 space-y-1 text-gray-900">
                        <li>
                            <Link to={"/addproduct"} className="cursor-pointer font-semibold">Add Product</Link>
                        </li>

                        <li>
                            <Link to={"/allproducts"} className="cursor-pointer font-semibold">All products</Link>
                        </li>
                    </ul>
                )}
            </li>

            <li>
                <div onClick={() => setOpencategory(!opencategory)} className="flex items-center gap-1 cursor-pointer text-blue-900">
                    <h1 className="text-lg font-semibold">Category</h1>
                    <BiSolidDownArrow size={14} />
                </div>
                {opencategory && (
                    <ul className="ml-4 mt-2 space-y-1 text-gray-900">
                        <li>
                            <Link to={"/addcategory"} className="cursor-pointer font-semibold">Add Category</Link>
                        </li>
                        <li>
                            <Link to={"/allcategories"} className="cursor-pointer font-semibold">All Categories</Link>
                        </li>
                    </ul>
                )}

            </li>
        </ul>
    </div>
}