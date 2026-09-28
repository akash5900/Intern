import addressModel from "../model/addressModel.js";

export async function createAddress(req, res) {
    try {

        const { username, mobilenumber, housenumber, city, pincode, state } = req.body;

        const Address = await addressModel.create({
            user: req.user.id,
            username,
            mobilenumber,
            housenumber, city,
            pincode,
            state
        });

        return res.status(201).json({
            message: "Address Created",
            Address
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
};

export async function getUserAddresses(req, res) {
    try {

        const Addresses = await addressModel.find({ user: req.user.id }).populate("user", "email");

        if (Addresses.length == 0) {
            return res.status(400).json({
                message: "Address not found"
            })
        }

        return res.status(200).json({
            message: "Address fetched",
            Addresses
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            error: error.message
        })

    }
}

export async function getAllAddresses(req, res) {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "unauthorized"
            })
        };

        const Addresses = await addressModel.find().populate("user", "email");

        if (Addresses.length == 0) {
            return res.status(400).json({
                message: "Address not found"
            })
        }

        return res.status(200).json({
            message: "Addresses fetched",
            Addresses
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            error: error.message
        })

    }
}

export async function updateAddress(req, res) {
    try {

        const { id } = req.params;

        const { username, mobilenumber, housenumber, city, pincode, state } = req.body;

        const address = await addressModel.findOne({ _id: id, user: req.user.id });

        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            });
        }


        const updateAddress = await addressModel.findByIdAndUpdate(id, { username: username, mobilenumber: mobilenumber, housenumber: housenumber, city: city, pincode: pincode, state: state }, { new: true }).populate("user", "email")

        return res.status(200).json({
            message: "Address updated",
            updateAddress
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }
}

export async function deleteAddress(req, res) {
    try {

        const { id } = req.params;

        const address = await addressModel.findByIdAndDelete({ _id: id, user: req.user.id });

        if (!address) {
            return res.status(400).json({
                message: "address not found",
                address
            })
        }

        return res.status(200).json({
            message: "address deleted",
            address
        });
    } catch (error) {

    }
}