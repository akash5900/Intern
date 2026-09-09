import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


function Updateproduct() {
    const { id } = useParams();
    const navigate = useNavigate()

    const [formdata, setFormdata] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        image: ""
    })


    const [category, setCategory] = useState([]);

    async function getCategory() {
        try {
            const res = await fetch("http://localhost:3000/api/category/allcategory");
            const data = await res.json();
            setCategory(data.categorys)
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        async function getProduct() {
            try {
                const res = await fetch(`http://localhost:3000/api/products/${id}`);
                const data = await res.json();
                console.log(data);

                setFormdata({
                    name: data.product.name,
                    price: data.product.price,
                    description: data.product.description,
                    category: data.product.category,
                    image: data.product.image
                })

            } catch (error) {
                console.log(error);
            }
        }

        getProduct()
        getCategory()
    }, [id])


    async function handlesubmit(e) {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata)
            });

            const data = await res.json();

            if(!res.ok){
                alert(data.message);
                return
            }

            alert(data.message);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormdata((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return <div className="flex items-center justify-center mt-[100px]">
        <div className="w-[400px] flex flex-col  gap-[20px] p-5">

            <form className="border border-blue-200 rounded-lg flex flex-col justify-center items-center gap-5 px-4 py-10 bg-gray-50 hover:shadow-xl" onSubmit={handlesubmit} >
                <h1 className="text-xl font-semibold pb-3">Update Products</h1>
                <input type="text" required name="name" value={formdata.name} onChange={handleChange} placeholder="Enter name" className="w-full bg-white border border-gray-400 rounded-lg p-2" />
                <input type="number" required name="price" value={formdata.price} onChange={handleChange} placeholder="Enter description" className="w-full  bg-white border border-gray-400  rounded-lg p-2" />
                <input type="text" required name="description" value={formdata.description} onChange={handleChange} placeholder="Enter Description" className="w-full  bg-white border border-gray-400 rounded-lg p-2" />
                <select
                    name="category"
                    required
                    value={formdata.category}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-400 rounded-lg p-2 "
                >
                    <option value="">Select Category</option>

                    {category.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                <input type="text" name="image" required value={formdata.image} onChange={handleChange} placeholder="Enter imageURL" className="w-full bg-white border border-gray-400 rounded-lg p-2" />
                <button className="border border-gray-500  rounded-md bg-white p-2 cursor-pointer hover:bg-blue-100 w-[200px]" type="submit">Submit</button>
            </form>
        </div>
    </div>
}

export default Updateproduct;