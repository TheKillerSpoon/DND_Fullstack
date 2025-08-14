import mongoose, { Schema } from "mongoose";

mongoose.set("runValidators", true);

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  hashedPassword: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  characterIDs: {
    type: [Schema.Types.ObjectId],
    ref: "character",
    default: [],
  },
});

export default mongoose.model("user", userSchema);
