import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    mobilenumber: {
        type: Number,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    address: {
        username: String,
        mobilenumber: Number,
        housenumber: String,
        city: String,
        pincode: Number,
        state: String
    }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;