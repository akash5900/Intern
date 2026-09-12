import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

export async function createUser(req, res) {
    try {

        const { username, email, mobilenumber, password, role } = req.body;

        if (!username) {
            return res.status(400).json({
                message: "Name is required"
            })
        };

        if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(username.trim())) {
            return res.status(400).json({
                message: "Name can contain only letters and spaces"
            });
        }

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            })
        };

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
            return res.status(400).json({
                message: "Please enter a valid email address"
            });
        }

        if (!mobilenumber) {
            return res.status(400).json({
                message: "Mobilenumber is required"
            })
        };

        if (!/^[6-9]\d{9}$/.test(mobilenumber.trim())) {
            return res.status(400).json({
                message: "Please enter a valid mobile number"
            });
        }

        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            })
        };

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        const alreadyExists = await userModel.find({
            $or: [
                { email },
                { mobilenumber }
            ]
        });

        if (alreadyExists.length > 0) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            mobilenumber,
            password: hashPassword,
            role: "user",
        });

        return res.status(201).json({
            message: "User created",
            user: {
                name: user.username,
                email: user.email,
                mobileNumber: user.mobilenumber,
                role: user.role,
            }
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Server error"
        })
    }
};

export async function getUser(req, res) {
    try {

    } catch (error) {
        console.log(error);

    }
};

export async function getUsers(req, res) {
    try {

    } catch (error) {
        console.log(error);

    }
};

export async function updateUser(req, res) {
    try {

    } catch (error) {
        console.log(error);

    }
};

export async function deleteUser(req, res) {
    try {

    } catch (error) {
        console.log(error);

    }
};