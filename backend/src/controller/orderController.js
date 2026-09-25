import orderModel from "../model/orderModel.js";

export async function createOrder(req, res) {
    try {
        console.log("BODY:", req.body);
        console.log("USER:", req.user);
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