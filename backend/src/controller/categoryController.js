import categoryModel from "../model/categoryModel.js";

export async function createCategory(req, res) {
    try {
        const { name, image = "Category" } = req.body;

        if (!name.trim()) {
            return res.status(400).json({
                message: "Enter category name"
            })
        }

        if (!/^[A-Za-z\s]+$/.test(name)) {
            return res.status(400).json({
                message: "Category name contain letters"
            })
        }

        if (!image.trim()) {
            return res.status(400).json({
                message: "Enter category imageURL"
            })
        }

        const alreadyExists = await categoryModel.findOne({ name });

        if (alreadyExists) {
            return res.status(409).json({
                message: "Category Already Exists"
            })
        };

        const category = await categoryModel.create({ name, image });

        return res.status(201).json({
            message: "Category Created Successfully",
            category
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            messsage: " server error "
        })

    }
};

export async function getCategory(req, res) {
    try {
        const categorys = await categoryModel.find();

        return res.status(200).json({
            message: "Category fetched successfully",
            categorys
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            messsage: "server error"
        })
    }
}

export async function getSingleCategory(req, res) {
    try {
        const { id } = req.params;

        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(400).json({
                message: "not found"
            })
        }

        return res.status(200).json({
            message: " category fetch successfully",
            category
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" });
    }
}


export async function updateCategory(req, res) {
    try {

        const { id } = req.params;
        const { name, image } = req.body;

        const category = await categoryModel.findById(id);

        if (!category) {
            return res.status(400).json({
                message: "not found"
            })
        };

        if (!name.trim()) {
            return res.status(400).json({
                message: "Enter category name"
            })
        }

        if (!/^[A-Za-z\s]+$/.test(name)) {
            return res.status(400).json({
                message: "Category name contain letters"
            })
        }
 
        if (!image.trim()) {
            return res.status(400).json({
                message: "Enter category imageURL"
            })
        }

        const updateCategory = await categoryModel.findByIdAndUpdate(id, { name: req.body.name, image: req.body.image });

        return res.status(200).json({
            message: "Category Updated",
            updateCategory
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" });
    }
}

export async function deleteCategory(req, res) {
    try {

        const { id } = req.params;

        const category = await categoryModel.findByIdAndDelete(id);

        return res.status(200).json({
            message: "category deleted successfully",
            category
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server Error" });
    }
}