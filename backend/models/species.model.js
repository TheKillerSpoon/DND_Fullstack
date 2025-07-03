import mongoose, { Schema } from "mongoose";

// validering
mongoose.set("runValidators", true);

const speciesSchema = new Schema(
  {
    //* Species name ----------------------------------------------------------------------
    speciesName: { type: String, required: [true, "Name is required"] },
    //* Sub species names ------------------------------------------------------------------
    subSpecies: { type: [String] },
    //* Creature Type ---------------------------------------------------------------------
    creatureType: {
      type: String,
      default: "humanoid",
      lowercase: true,
      maxlength: [20, "Creature type is too long"],
    },
    //* Size ------------------------------------------------------------------------------
    size: { type: [Number], min: 1, max: 20, default: [6, 7] },
    //* Speed -----------------------------------------------------------------------------
    speed: { type: Number, min: 5, max: 100, default: 30 },
    //* Traits ----------------------------------------------------------------------------
    traits: { type: [String] },
  },

  { timestamps: true }
);

export default mongoose.model("species", speciesSchema);
