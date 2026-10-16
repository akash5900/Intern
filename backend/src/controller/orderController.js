import orderModel from "../model/orderModel.js";

export async function createOrder(req, res) {
  try {
    const { products, totalamount, address, paymentmethod } = req.body;

    const order = await orderModel.create({
      user: req.user.id,
      products,
      totalamount,
      address,
      paymentmethod,
    });

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
    const order = await orderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus !== "Placed") {
      return res.status(400).json({
        message: "Order cannot be cancelled after shipping",
      });
    }

    order.orderStatus = "Cancelled";
    if (order.paymentmethod === "COD") {
      order.paymentstatus = "Cancelled";
    }
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled ",
    });
  } catch (error) {
    return res.status(500).json({
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
    const { id } = req.params;

    const order = await orderModel.findByIdAndDelete(id);

    if (!order) {
      return res.status(400).json({
        message: "order not found",
      });
    }

    return res.status(200).json({
      message: "order deleted successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to delete order",
      error: error.message,
    });
  }
}
