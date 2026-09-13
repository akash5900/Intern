import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function userSignup(req, res) {
  try {
    const { username, email, mobilenumber, password, role } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(username.trim())) {
      return res.status(400).json({
        message: "Name can contain only letters and spaces",
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      return res.status(400).json({
        message: "Please enter a valid email address",
      });
    }

    if (!mobilenumber) {
      return res.status(400).json({
        message: "Mobilenumber is required",
      });
    }

    if (!/^[6-9]\d{9}$/.test(mobilenumber.trim())) {
      return res.status(400).json({
        message: "Please enter a valid mobile number",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const alreadyExists = await userModel.findOne({ email });

    if (alreadyExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      mobilenumber,
      password: hashPassword,
      role: "user",
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    return res.status(201).json({
      statusCode: 201,
      message: "Signup Successfully",
      Token: token,
      user: {
        username: user.username,
        email: user.email,
        mobilenumber: user.mobilenumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, mobilenumber, password } = req.body;

    if (!email && !mobilenumber) {
      return res.status(400).json({
        message: "Email or mobile number is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const user = await userModel.findOne({
      $or: [{ email }, { mobilenumber }],
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid user",
      });
    }

    const isPassworValid = await bcrypt.compare(password, user.password);

    if (!isPassworValid) {
      return res.status(404).json({
        message: "Invalid assword",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    return res.status(200).json({
      statuscode: "200",
      message: "User Login Successfully",
      Token: token,
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function allUsers(req, res) {
  try {
    const users = await userModel.find();

    return res.status(200).json({
      statuscode: "200",
      message: "users fetched successfully",
      users,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function userLogout(req, res) {
  try {
    const { id } = req.params;

    const user = await userModel.findByIdAndDelete(id);

    return res.status(200).json({
      statuscode: "200",
      message: "user delted",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
}
