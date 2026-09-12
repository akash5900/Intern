import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";

function Categoryproducts() {

    const { id } = useParams();
    const [products, setProducts] = useState([]);

    async function getProducts() {
        try {
            const res = await fetch(`http://localhost:3000/api/products/category?category=${id}`);
            const data = await res.json();
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {

        getProducts()
    }, [id])


    async function dltProduct(id) {
        try {
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "DELETE"
            })
            console.log(res);
            
            const data = await res.json();
            console.log(data);
            
            if (res.ok) {
                alert("Product deleted");

                getProducts();
            } else {
                alert(data.message || "Failed to delete product");
            }

        } catch (error) {
            console.log(error)
        }
    }


    return <div className="p-4 flex flex-col gap-4 ">
        <h1 className="text-xl font-semibold">Category Products</h1>
        <div className="grid md:grid-cols-4 2xl:grid-cols-6 gap-8">
            {products.map((product) => (
                <div className="w-[300px] border border-gray-200 flex flex-col gap-2 hover:bg-gray-100 hover:shadow-xl p-4" key={product._id}>
                    <div className="flex justify-center">
                        <img src={product.image} className=" h-[180px] object-cover rounded " />
                    </div>

                    <section className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl font-semibold text-gray-900">Name: {product.name}</h1>
                            <h2 className="text-lg font-semibold text-gray-800">Price: {product.price} </h2>
                            <h2 className="text-md font-semibold text-gray-700">Description: {product.description} </h2>
                        </div>
                    </section>
                </div>
            ))}
        </div>
    </div>
}

export default Categoryproducts;