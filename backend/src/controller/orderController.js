import orderModel from "../model/orderModel.js";
import cartModel from "../model/cartModel.js"

export async function createOrder(req, res) {
  try {
    const userId = req.user.id

    const { products, totalamount, address, paymentmethod } = req.body;

    const order = await orderModel.create({
      user: userId,
      products,
      totalamount,
      address,
      paymentmethod,
    });

    await cartModel.deleteMany({ user: userId })

    return res.status(201).json({
      message: "Order Placed",
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
}

export async function getUserOrders(req, res) {
  try {
    const orders = await orderModel
      .find({ user: req.user.id })
      .populate("products.product");

    return res.status(200).json({
      message: "order fetched",
      orders,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "server error",
    });
  }
}

export async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { orderStatus: status },
      { new: true },
    );

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

export async function cancelOrder(req, res) {
  try {
    const { id, productId } = req.params;

    const order = await orderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const orderProduct = order.products.find(
      (item) => item.product.toString() === productId
    );

    if (!orderProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found in this order",
      });
    }

    if (orderProduct.orderStatus !== "Placed") {
      return res.status(400).json({
        success: false,
        message: "Product cannot be cancelled after shipping",
      });
    }

    orderProduct.orderStatus = "Cancelled";

    const allCancelled = order.products.every(
      (item) => item.orderStatus === "Cancelled"
    );

    if (allCancelled) {
      order.orderStatus = "Cancelled";

      if (order.paymentmethod === "COD") {
        order.paymentstatus = "Cancelled";
      }
    }

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Product cancelled successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getOrders(req, res) {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "unauthorized",
      });
    }

    const orders = await orderModel
      .find()
      .populate("user", "username email")
      .populate("products.product");

    return res.status(200).json({
      message: "orders fetched",
      orders,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export async function deleteOrder(req, res) {
  try {
    const { id, productId } = req.params;

    const order = await orderModel.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const productIndex = order.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in this order",
      });
    }

    const item = order.products[productIndex];

    if (item.orderStatus !== "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Only cancelled products can be deleted",
      });
    }

    order.products.splice(productIndex, 1);

    if (order.products.length === 0) {
      await orderModel.findByIdAndDelete(id);
    } else {
      order.totalamount = order.products.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      await order.save();
    }

    return res.status(200).json({
      success: true,
      message: "Cancelled product deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
}
