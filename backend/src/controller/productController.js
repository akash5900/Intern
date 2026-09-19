import productModel from "../model/product.js";

export async function createProduct(req, res) {
  try {
    const { name, price, description, category = "Product", image } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Enter the product name",
      });
    }

    if (/^\d+$/.test(name)) {
      return res.status(400).json({
        message: "Name cannot contain only numbers",
      });
    }

    if (!price || Number(price) <= 50) {
      return res.status(400).json({
        message: "Enter valid price",
      });
    }

    if (!description.trim()) {
      return res.status(400).json({
        message: "Enter the product description",
      });
    }

    if (!category) {
      return res.status(400).json({
        message: "Select category",
      });
    }

    if (!image.trim()) {
      return res.status(400).json({
        message: "Enter product imageURL",
      });
    }

    const product = await productModel.create({
      name,
      price,
      description,
      category,
      image,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function getProducts(req, res) {
  try {
    const { search, minPrice, maxPrice, page = 1, limit = 15 } = req.query;

    const query = {};

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (minPrice) {
      const min = Number(minPrice);
      if (!Number.isNaN(min)) {
        query.price = {
          ...query.price,
          $gte: min,
        };
      }
    }

    if (maxPrice) {
      const max = Number(maxPrice);
      if (!Number.isNaN(max)) {
        query.price = {
          ...query.price,
          $lte: max,
        };
      }
    }

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    const products = await productModel.find(query).populate("category").skip(skip).limit(limitNumber);

    const totalProducts = await productModel.countDocuments(query);

    const hasMore = skip + products.length < totalProducts;

    return res.status(200).json({
      message: "Products Fetched Successfully",
      products,
      hasMore
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function getProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function getProductsByCategory(req, res) {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        message: "category not found",
      });
    }

    const products = await productModel
      .find({ category: category })
      .populate("category");

    return res.status(200).json({
      message: "Category Products",
      products,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, price, description, category, image } = req.body;

    const product = await productModel.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Enter the product name",
      });
    }

    if (/^\d+$/.test(name)) {
      return res.status(400).json({
        message: "Name cannot contain only numbers",
      });
    }

    if (!price || Number(price) <= 50) {
      return res.status(400).json({
        message: "Enter valid price",
      });
    }

    if (!description.trim()) {
      return res.status(400).json({
        message: "Enter the product description",
      });
    }

    if (!category) {
      return res.status(400).json({
        message: "Select category",
      });
    }

    if (!image.trim()) {
      return res.status(400).json({
        message: "Enter product imageURL",
      });
    }

    const updatedProduct = await productModel
      .findByIdAndUpdate(
        id,
        {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          category: req.body.category,
          image: req.body.image,
        },
        { new: true },
      )
      .populate("category");

    return res.status(200).json({
      message: "Product Updated Successfully",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await productModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: " Product Deleted Sucessfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}
