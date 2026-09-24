import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Addproducts() {
    const navigate = useNavigate()

    const [formdata, setFormdata] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
        ratings: "",
        variants: []
    });

    const [variant, setVariant] = useState({
        size: "",
        price: "",
        color: "",
        stock: ""
    });


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
        getCategory()
    }, [])


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/products/createproduct", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata)
            })

            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }

            alert(data.message);
            navigate("/");

        }
        catch (error) {
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

    function addVariant() {
        setFormdata((prev) => ({
            ...prev,
            variants: [
                ...prev.variants,
                variant
            ]
        }));

        setVariant({
            size: "",
            price: "",
            color: "",
            stock: ""
        });
    }

    function handleVariantChange(e) {
        const { name, value } = e.target;

        setVariant((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    return <div className="flex items-center justify-center md:mt-[50px] 2xl:mt-[100px]">
        <div className="w-[400px] flex flex-col gap-[20px] p-5">
            <form className="border border-blue-200 rounded-lg flex flex-col justify-center items-center gap-5 px-4 py-10 bg-gray-50 hover:shadow-xl" onSubmit={handleSubmit}>
                <h1 className="text-xl font-semibold pb-3">Add Products</h1>
                <input type="text" name="name" required value={formdata.name} onChange={handleChange} placeholder="Enter name" className="w-full bg-white border border-gray-400 rounded-lg p-2 " />
                <input type="number" name="price" required value={formdata.price} onChange={handleChange} placeholder="Enter price" className="w-full  bg-white border border-gray-400  rounded-lg p-2 " />
                <input type="text" name="description" value={formdata.description} onChange={handleChange} placeholder="Enter Description" className="w-full  bg-white border border-gray-400  rounded-lg p-2 " />
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
                <input type="number" name="ratings" required value={formdata.ratings} onChange={handleChange} placeholder="Enter price" className="w-full  bg-white border border-gray-400  rounded-lg p-2 " />
                <input type="text" name="image" required value={formdata.image} onChange={handleChange} placeholder="Enter imageURL" className="w-full  bg-white border border-gray-400  rounded-lg p-2 " />
                <div className="w-full border border-gray-300 rounded-lg p-3">
                    <h1 className="font-semibold mb-3">Variants</h1>

                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            name="size"
                            value={variant.size}
                            onChange={handleVariantChange}
                            placeholder="Size (S, M, L)"
                            className="w-full bg-white border border-gray-400 rounded-lg p-2"
                        />

                        <input
                            type="number"
                            name="price"
                            value={variant.price}
                            onChange={handleVariantChange}
                            placeholder="Variant price"
                            className="w-full bg-white border border-gray-400 rounded-lg p-2"
                        />

                        <input
                            type="text"
                            name="color"
                            value={variant.color}
                            onChange={handleVariantChange}
                            placeholder="Color"
                            className="w-full bg-white border border-gray-400 rounded-lg p-2"
                        />

                        <input
                            type="number"
                            name="stock"
                            value={variant.stock}
                            onChange={handleVariantChange}
                            placeholder="Stock"
                            className="w-full bg-white border border-gray-400 rounded-lg p-2"
                        />

                        <button
                            type="button"
                            onClick={addVariant}
                            className="border border-blue-500 rounded-md p-2 bg-blue-100"
                        >
                            Add Variant
                        </button>
                    </div>

                    {formdata.variants.map((item, index) => (
                        <div key={index} className="mt-3 p-2 bg-gray-100 rounded">
                            <p>
                                {item.size} - {item.color} - ₹{item.price} - Stock: {item.stock}
                            </p>
                        </div>
                    ))}
                </div>

                <button className="border border-gray-500  rounded-md bg-white p-2 cursor-pointer hover:bg-blue-100 w-[200px] " type="submit">Submit</button>
            </form>
        </div>
    </div>
}

export default Addproducts;