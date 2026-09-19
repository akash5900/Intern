import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

export default function Allproducts() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    async function getProducts(pageNumber) {
        try {
            const res = await fetch(
                `http://localhost:3000/api/products/allproducts?page=${pageNumber}&limit=12`
            );

            const data = await res.json();

            setProducts((prevProducts) => [
                ...prevProducts,
                ...data.products,
            ]);

            setHasMore(data.hasMore);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts(1)
    }, [])

    function handleLoadMore() {
        const nextPage = page + 1;

        setPage(nextPage);
        getProducts(nextPage);
    }

    async function dltProduct(id) {
        try {
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "DELETE"
            })

            const data = await res.json();
            console.log(data);
            alert("Product deleted")

            setProducts([]);
            setPage(1);
            setHasMore(true);

            getProducts(1);

        } catch (error) {
            console.log(error)
        }
    }

    return <div className="space-y-4 text-gray-900">
        <div className="flex justify-between text-xl font-semibold">
            <h1>All Products</h1>
            <Link to={"/addproduct"} className="cursor-pointer">+Add Product</Link>
        </div>
        <div className="w-full overflow-x-auto">
            <table className="w-full border border-gray-200 border-collapse table-fixed">
                <thead className="bg-blue-200">
                    <tr className="text-lg pl-1">
                        <th className="p-2 text-left">Image</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Price</th>
                        <th className="p-2 md:text-left">Description</th>
                        <th className="p-2">Edit</th>
                        <th className="p-2">Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}
                            className="border-b border-gray-200 font-semibold"
                        >
                            <td> <img src={product.image} alt={product.name} className="w-25 h-18 object-cover rounded my-4 ml-2" /></td>
                            <td className="p-3 align-middle">{product.name}</td>
                            <td className="p-3 align-middle">{product.price}</td>
                            <td className="p-3 align-middle break-words">{product.description}</td>
                            <td className="p-3 align-middle text-center ">
                                <Link to={`/updateproduct/${product._id}`} className="border border-gray-800 px-2 rounded hover:bg-blue-300 cursor-pointer">
                                    Edit
                                </Link>
                            </td>
                            <td className="p-3 align-middle text-center ">
                                <button onClick={() => dltProduct(product._id)} className="border border-gray-800 px-2 rounded hover:bg-red-500 cursor-pointer">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
        {hasMore && (
            <div className="flex justify-center mt-6">
                <button
                    onClick={handleLoadMore}
                    className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-400"
                >
                    Load More
                </button>
            </div>
        )}

        {!hasMore && products.length > 0 && (
            <p className="text-center text-gray-500 mt-6">
                No more products
            </p>
        )}

    </div>
}