import { dbConnect } from "../dbConnect.js";
import classModel from "../models/class.model.js";

// Get all class
export const getClass = async () => {
  try {
    await dbConnect();
    const classes = await classModel.find({});
    return classes;
  } catch (error) {
    throw new Error("Der skete en fejl:");
  }
};

// create a new class
export const createClass = async (body) => {
  try {
    await dbConnect();
    const classes = await classModel.create(body);
    return classes;
  } catch (error) {
    console.error("something went wrong:", error);
    throw new Error("something went wrong:", error);
  }
};
