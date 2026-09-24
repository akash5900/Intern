import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { FaStar } from "react-icons/fa";

export default function ProductDetail() {

    const { id } = useParams()

    const [product, setProduct] = useState(null)

    async function getproduct() {
        try {
            const res = await fetch(`http://localhost:3000/api/products/${id}`);

            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            }

            setProduct(data.product);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getproduct()
    }, [id])

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className=" p-6 pl-30">
            <div className="grid grid-cols-2 ">
                <img src={product.image} className="h-[400px]" />

                <section className="flex flex-col gap-4">
                    <div className=" flex flex-col gap-2">
                        <h1 className="text-xl">{product.description} </h1>
                        <div className="flex items-center">
                            <BiRupee />
                            <h1 className="text-lg">{product.price}</h1>
                        </div>
                        <h1>{product.ratings}</h1>
                    </div>

                    <div className="flex gap-4">
                        <button className=" border rounded p-2">Buy Now</button>
                        <button className=" border rounded p-2">Add To Cart</button>
                    </div>
                </section>

            </div>
        </div>
    )
}