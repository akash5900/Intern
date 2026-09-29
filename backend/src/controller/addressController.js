import addressModel from "../model/addressModel.js";

export async function createAddress(req, res) {
    try {

        const { username, mobilenumber, houseaddress, city, pincode, state } = req.body;

        if (!username) {
            return res.status(400).json({
                message: "Name is required",
            });
        };

        if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(username.trim())) {
            return res.status(400).json({
                message: "Name can contain only letters and spaces",
            });
        };

        if (!mobilenumber) {
            return res.status(400).json({
                message: "Mobilenumber is required",
            });
        };

        if (!/^[6-9]\d{9}$/.test(mobilenumber.trim())) {
            return res.status(400).json({
                message: "Please enter a valid mobile number",
            });
        };

        if (!houseaddress) {
            return res.status(400).json({
                message: "HouseAddress is required",
            });
        };

        if (!city) {
            return res.status(400).json({
                message: "City is required",
            });
        };

        if (!pincode) {
            return res.status(400).json({
                message: "Pincode is required",
            });
        }

        if (pincode.length < 6 || pincode.length > 6) {
            return res.status(400).json({
                message: "pincode must be 6 characters",
            });
        }

        if (!state) {
            return res.status(400).json({
                message: "State is required",
            });
        };

        const Address = await addressModel.create({
            user: req.user.id,
            username,
            mobilenumber,
            houseaddress,
            city,
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

        const { username, mobilenumber, houseaddress, city, pincode, state } = req.body;

        const address = await addressModel.findOne({ _id: id, user: req.user.id });

        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            });
        }


        const updateAddress = await addressModel.findByIdAndUpdate(id, { username: username, mobilenumber: mobilenumber, houseaddress: houseaddress, city: city, pincode: pincode, state: state }, { new: true }).populate("user", "email")

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