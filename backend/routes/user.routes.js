import express from "express";
import bcryptjs from "bcryptjs";
import validator from "validator";
import User from "../models/user.model.js";
import { auth, adminAuth } from "../middelware/auth.middelware.js";

const userRoute = express.Router();

// get all users
userRoute.get("/users", adminAuth, async (req, res) => {
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
userRoute.get("/user/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).send({
        status: "error",
        message: "id mangler",
        data: result,
      });
    }

    const user = await User.findById(id);
    if (user._id !== req.user._id && user.role !== "admin") {
      return res.status(403).send({
        status: "error",
        message: "You cannot get others accounts",
        data: [],
      });
    }

    return res.status(200).send({
      status: "ok",
      message: "Users blev fundet",
      data: user,
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
userRoute.post("/user", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Mangler enten email eller password");
    }

    if (req.body.role === "admin") {
      throw new Error("admin role cant be set by user");
    }

    if (!validator.isEmail(email)) {
      return res.status(400).send({
        status: "error",
        message: "Invalid email format",
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = { email, hashedPassword };

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
userRoute.delete("/user/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(500).send({
        status: "error",
        message: "ikke noget ID",
        data: [],
      });
    }

    const user = await User.findById(id);
    if (user._id !== req.user._id && user.role !== "admin") {
      return res.status(403).send({
        status: "error",
        message: "You cannot delete other users.",
        data: [],
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).send({
      status: "ok",
      message: "fjernet",
      data: user,
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
userRoute.put("/user/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, role, characterIDs } = req.body;

    if (!id) {
      throw new Error("ingen id");
    }

    let hashedPassword = undefined;

    if (password) {
      hashedPassword = await bcryptjs.hash(password, 10);
    }

    const newData = {
      name,
      email,
      hashedPassword,
      role,
      characterIDs,
    };

    console.log("newData", newData);

    const user = await User.findById(id);

    if (user._id.toString() !== req.user._id && req.user.role !== "admin") {
      return res.status(403).send({
        status: "error",
        message: "You cannot update other users.",
        data: [],
      });
    }

    if (newData.role !== "user" && req.user.role !== "admin") {
      return res.status(403).send({
        status: "error",
        message: "only an admin can change the role",
        data: [],
      });
    }

    const result = await User.findByIdAndUpdate(id, newData);

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
