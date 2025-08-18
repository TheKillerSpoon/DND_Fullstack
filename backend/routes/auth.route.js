import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const authRoute = express.Router();

// Post login-data
authRoute.post("/auth/signin", async (req, res) => {
  try {
    console.log(
      "Received sign-in request:",
      await userModel.findOne({ email: req.body.email })
    );
    const user = await userModel.findOne({ email: req.body.email });

    // if user not found, return error
    if (!user) {
      return res.status(401).send({
        status: "error",
        message: "Invalid email or password",
        data: null,
      });
    }

    // compare password with hashed password
    const validPass = await bcryptjs.compare(
      req.body.password,
      user.hashedPassword
    );
    // if password is not valid, return error
    if (!validPass) {
      return res.status(401).send({
        status: "error",
        message: "Invalid email or password",
        data: null,
      });
    }

    // get JWT secret and expiry from environment variables
    const jwtSecret = process.env.JWT_SECRET;

    // get JWT expiry time from environment variables or set default
    const jwtExpiry = process.env.JWT_EXPIRES_IN || "1h";

    // if JWT secret is not set, return error
    if (!jwtSecret) {
      console.error("Missing JWT_SECRET in environment variables");
      return res.status(500).send({
        status: "error",
        message: "Server configuration error",
        data: null,
      });
    }

    // create JWT token with relevant user data (only what is necessary for the client)
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      jwtSecret, // signature secret
      { expiresIn: jwtExpiry } // generate token with expiry
    );

    // if everything is OK, return success and token
    return res.status(200).send({
      status: "ok",
      message: `${user.role} signed in successfully`,
      data: token,
    });
  } catch (error) {
    console.error("Unexpected error during sign-in:", error);
    return res.status(500).json({
      status: "error",
      message: "Unexpected server error",
    });
  }
});

export default authRoute;
