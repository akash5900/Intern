
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


function Products() {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [minprice, setMinprice] = useState("");
    const [maxprice, setMaxprice] = useState("");



    async function getProducts() {
        try {
            const res = await fetch("http://localhost:3000/api/products/allproducts");
            const data = await res.json()
            setProducts(data.products);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    // async function dltProduct(id) {
    //     try {
    //         const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    //             method: "DELETE"
    //         })

    //         const data = await res.json();
    //         console.log(data);
    //         alert("Product deleted")
    //         getProducts();

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    async function searchProducts() {
        try {

            const params = new URLSearchParams();

            if (search.trim() != "") {
                params.append("search", search.trim())
            };

            if (minprice != "") {
                params.append("minPrice", minprice)
            };

            if (maxprice != "") {
                params.append("maxPrice", maxprice)
            }

            if (params.toString() == "") {
                getProducts()
                return
            }

            const res = await fetch(`http://localhost:3000/api/products/search?${params.toString()}`);
            const data = await res.json();
            setProducts(data.products);
        }
        catch (error) {
            console.log(error);
        }
    };

    function clearFilter() {
        setSearch("")
        setMaxprice("")
        setMinprice("")
        getProducts()
    }


    return <div className="px-4 pl-2 py-4 flex flex-col gap-10">
        <div className="flex justify-between">
            <h1 className="text-lg font-semibold">All Products</h1>

            <div className="w-[400px] flex items-center gap-2 ">
                <FaSearch size={20} />
                <input
                    type="text"
                    placeholder="Search Product..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value) }}
                    className="border w-full rounded p-2 hover:shadow-xl"
                />
                <button className="border rounded cursor-pointer p-1 " onClick={() => searchProducts()}>Search</button>
            </div>

            {/* <Link to={"/addproduct"}><h1 className="text-lg font-semibold hover:text-red-500 ">+Add Products</h1></Link> */}
        </div>

        <div className=" border rounded p-2 w-[750px] flex items-center gap-10">
            <div className="">
                <label className=" text-sm font-medium mb-1">
                    Min Price
                </label>

                <input
                    type="number"
                    value={minprice}
                    onChange={(e) => { setMinprice(e.target.value) }}
                    placeholder="₹ 0"
                    className="border rounded-lg p-2 ml-1 w-[150px]"
                />
            </div>
            <div>
                <label className=" text-sm font-medium mb-1">
                    Max Price
                </label>

                <input
                    type="number"
                    value={maxprice}
                    onChange={(e) => { setMaxprice(e.target.value) }}
                    placeholder="₹ 0"
                    className="border rounded-lg p-2 ml-1 w-[150px]"
                />
            </div>
            <button className="border rounded px-1 cursor-pointer" onClick={() => searchProducts()}>Apply Filter</button>
            <button className="border rounded px-1 cursor-pointer" onClick={clearFilter}>Clear Filter</button>
        </div>

        <div className="grid 2xl:grid-cols-6 md:grid-cols-4 gap-8">
            {products.map((product) => (
                <div className="w-[300px] border border-gray-200 flex flex-col gap-2 hover:bg-gray-100 hover:shadow-xl p-4" key={product._id}>
                    <div className="flex justify-center">
                        <img src={product.image} alt={product.name} className=" h-[180px] object-cover rounded " />
                    </div>

                    <section className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl font-semibold text-gray-900">Name:  {product.name}</h1>
                            <h2 className="text-lg font-semibold text-gray-800">Price:  {product.price}</h2>
                            <h2 className="text-md font-semibold text-gray-700">Description:  {product.description}</h2>
                        </div>
                    </section>

                </div>
            ))}
        </div>
    </div>
}

export default Products