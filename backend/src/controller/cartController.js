import cartModel from "../model/cartModel";

export async function addToCart(req, res) {
    try {

        const { product, quantity } = req.body;

        

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error "
        })
    }
}

export async function getCart(req, res) {
    try {

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error "
        })
    }
}

export async function removeFromCart(req, res) {
    try {

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error "
        })
    }
}