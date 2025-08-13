import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const authRoute = express.Router();

// Post login-data
authRoute.post("/auth/signin", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    /* TEST UDEN MODEL - NÅR I HAR LAVET MODELLEN KAN DETTE SLETTES */
    // const hashedPassword = await bcryptjs.hash("admin", 10); // lav en hash til testbrug
    // const user = {
    //   _id: "test-admin-id", // brug et test-id
    //   email: "a@b.com",
    //   hashedPassword,
    //   name: "Test admin",
    //   role: "admin",
    // };

    /* TEST SLUT */

    // Hvis brugeren ikke findes, returnér en fejl
    if (!user) {
      return res.status(401).send({
        status: "error",
        message: "Invalid email or password",
        data: null,
      });
    }

    // Sammenlign den indtastede adgangskode med den hash'ede adgangskode fra databasen
    const validPass = await bcryptjs.compare(
      req.body.password,
      user.hashedPassword
    );

    if (!validPass) {
      return res.status(401).send({
        status: "error",
        message: "Invalid email or password",
        data: null,
      });
    }

    // Hent JWT-secret fra miljøvariabler – skal bruges til at signere tokenet
    const jwtSecret = process.env.JWT_SECRET;

    // Hent udløbstid for token (standard: 1 time, hvis ikke angivet)
    const jwtExpiry = process.env.JWT_EXPIRES_IN || "1h";

    // Hvis secret mangler, log fejl og returnér serverfejl
    if (!jwtSecret) {
      console.error("Missing JWT_SECRET in environment variables");
      return res.status(500).send({
        status: "error",
        message: "Server configuration error",
        data: null,
      });
    }

    // Opret JWT-token med relevante brugerdata (kun det nødvendige!)
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      jwtSecret, // signering med hemmelig nøgle
      { expiresIn: jwtExpiry } // angiv hvor længe token er gyldig
    );

    // Hvis alt er OK, returnér succes og token
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
