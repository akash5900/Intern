import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: Number
    }],
    totalamount: {
        type: Number,
        required: true
    },
    address: {
        username: String,
        mobilenumber: Number,
        housenumber: String,
        city: String,
        pincode: Number,
        state: String
    },
    paymentmethod: {
        type: String,
        enum: ["COD"],
        required: true
    },
    paymentstatus: {
        type: String,
        enum: ["Pending", "Paid", "Cancelled"],
        default: "Pending"
    },
    orderStatus: {
        type: String,
        enum: ["Placed", "Shipped", "Delivered", "Cancelled"],
        default: "Placed",
    },
}, { timestamps: true });

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;