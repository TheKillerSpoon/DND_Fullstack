import express from "express";
import User from "../models/user.model.js";

const userRoute = express.Router();

// get all users
userRoute.get("/users", async (req, res) => {
  try {
    const result = await User.find({});

    return res.status(200).send({
      status: "ok",
      message: "Users blev fundet",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: `${error.message}`,
      data: [],
    });
  }
});

// get user by id
userRoute.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).send({
        status: "error",
        message: "id mangler",
        data: result,
      });
    }
    const result = await user.findById(id);

    return res.status(200).send({
      status: "ok",
      message: "Users blev fundet",
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: `${error.message}`,
      data: [],
    });
  }
});

// create a new user
userRoute.post("/users", async (req, res) => {
  try {
    const { name, email, hashedPassword, role } = req.body;

    if (!name || !email || !hashedPassword || !role) {
      throw new Error("Mangler enten name, email, hashedPassword eller role");
    }

    const user = { name, email, hashedPassword, role };

    const result = await User.create(user);

    return res.status(200).send({
      status: "ok",
      message: "Operettet med success user blev.",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: `${error.message}`,
      data: [],
    });
  }
});

// delete a user by id
userRoute.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).send({
        status: "error",
        message: "ikke noget ID",
        data: [],
      });
    }

    const result = await User.findByIdAndDelete(id);

    return res.status(200).send({
      status: "ok",
      message: "fjernet",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: `${error.message}`,
      data: [],
    });
  }
});

// update a user
userRoute.put("/users", async (req, res) => {
  try {
    const { id, name, email, hashedPassword, role } = req.body;

    if (!id) {
      throw new Error("ingen id");
    }

    if (!name || !email || !hashedPassword || !role) {
      throw new Error("Mangler enten name, email, hashedPassword eller role");
    }

    const newData = {
      name,
      email,
      hashedPassword,
      role,
    };

    const result = await model.findByIdAndUpdate(id, newData);

    return res.status(200).send({
      status: "ok",
      message: "opdateret",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: `${error.message}`,
      data: [],
    });
  }
});

export default userRoute;
