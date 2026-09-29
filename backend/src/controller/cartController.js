import cartModel from "../model/cartModel.js";

export async function addToCart(req, res) {
  try {
    const { product, quantity } = req.body;

    const existing = await cartModel.findOne({ product, user: req.user.id });

    if (existing) {
      existing.quantity += quantity;
      await existing.save();
      return res.status(200).json({
        message: "Product Added To Cart",
        cart: existing,
      });
    }

    const cart = await cartModel.create({
      user: req.user.id,
      product,
      quantity,
    });

    return res.status(201).json({
      message: "Product Added To Cart",
      cart,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error ",
    });
  }
}

export async function getCart(req, res) {
  try {
    const cart = await cartModel
      .find({ user: req.user.id })
      .populate("user", "email")
      .populate("product");

    if (cart.length === 0) {
      return res.status(404).json({
        message: "Cart is empty",
      });
    }

    return res.status(200).json({
      message: "Cart Products",
      cart,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error ",
    });
  }
}

export async function removeFromCart(req, res) {
  try {
    const cart = await cartModel.findByIdAndDelete(req.params.id);

    if (cart.length === 0) {
      return res.status(404).json({
        message: "Cart is empty",
      });
    }

    return res.status(200).json({
      message: "Cart deleted",
      cart,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error ",
    });
  }
}
