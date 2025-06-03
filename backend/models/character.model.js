import mongoose, { Schema } from "mongoose";

// validering
mongoose.set("runValidators", true);

const characterSchema = new Schema(
  {
    name: { type: String },
    class: { type: String, enum: ["Barbarian", "Bard", "Cleric", "Druid"] },
    strength: { type: Number, default: 0 },
    dexterity: { type: Number, default: 0 },
    constitution: { type: Number, default: 0 },
    intelligence: { type: Number, default: 0 },
    wisdom: { type: Number, default: 0 },
    charisma: { type: Number, default: 0 },
    skills: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.character ||
  mongoose.model("character", characterSchema);
