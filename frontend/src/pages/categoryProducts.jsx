import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer"

function Categoryproducts() {

    const navigate = useNavigate()
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

    return <div className="pt-4 flex flex-col gap-6 ">
        <h1 className="px-8 text-2xl text-gray-900 font-semibold">Category Products</h1>
        <div className="px-8 grid md:grid-cols-4 2xl:grid-cols-5 gap-8">
            {products.map((product) => (
                <div className="w-[300px] cursor-pointer border border-gray-200 flex flex-col gap-2 hover:bg-gray-100 hover:shadow-xl p-4"
                    key={product._id}
                    onClick={() => navigate(`/productdetail/${product._id}`)}
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
        </div>
        <div>
            <Footer/>
        </div>
    </div>
}

export default Categoryproducts;