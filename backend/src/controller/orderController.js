import orderModel from "../model/orderModel.js";

export async function createOrder(req, res) {
    try {

        const { products, totalamount, address, paymentmethod } = req.body;

        const order = await orderModel.create({
            user: req.user.id,
            products,
            totalamount,
            address,
            paymentmethod
        });

        return res.status(201).json({
            message: "Order Placed",
            order
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to place order",
            error: error.message
        });
    }
}

export async function getUserOrders(req, res) {
    try {

        const orders = await orderModel.find({ user: req.user.id }).populate("products.product");

        if (orders.length == 0) {
            return res.status(400).json({
                message: "orders not found"
            })
        }

        return res.status(200).json({
            message: "order fetched",
            orders
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "server error",
        })

    }
}

export async function getOrders(req, res) {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "unauthorized"
            })
        }

        const orders = await orderModel.find().populate("user", "username email").populate("products.product");

        return res.status(200).json({
            message: "orders fetched",
            orders
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

export async function deleteOrder(req, res) {
    try {
        const { id } = req.params;

        const order = await orderModel.findByIdAndDelete(id);

        if (!order) {
            return res.status(400).json({
                message: "order not found"
            })
        }

        return res.status(200).json({
            message: "order deleted successfully",
            order
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Failed to delete order",
            error: error.message
        });

    }
}