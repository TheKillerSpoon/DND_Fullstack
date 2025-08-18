import mongoose, { Schema } from "mongoose";

// validering
mongoose.set("runValidators", true);

// Defining the different possible character stats
const stats = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
];

// Defining the possible hit dice for characters
const hitDice = [4, 6, 8, 10, 12, 20];

// Function to create a stats object with validation rules
const statsTypes = () => {
  let statsObject = {};
  stats.forEach((stat) => {
    statsObject[stat] = {
      type: Number,
      default: 0,
      min: [0, `Min ${stat} is 0`],
      max: [20, `Max ${stat} is 20`],
    };
  });
  return statsObject;
};

// Function to create traits, ideals, bonds, and flaws
const TIBF = ["personalityTraits", "ideals", "bonds", "flaws"];
const traitsIdealsBondsFlaws = () => {
  let TIBFObject = {};
  TIBF.forEach((_TIBF) => {
    TIBFObject[_TIBF] = {
      type: String,
      maxlength: [500, `${_TIBF} can't be longer than 500 characters`],
      minlength: [0, `Not possible to have less than 0 characters`],
      default: "",
    };
  });
  return TIBFObject;
};

const characterSchema = new Schema(
  {
    //* Character name ----------------------------------------------------------------------
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [50, "Name can't be longer than 50 characters"],
      minlength: [1, "Name can't be empty"],
    },
    //* class -------------------------------------------------------------------------------
    class: {
      type: String,
      lowercase: true,
      default: "barbarian",
    },
    //* level -------------------------------------------------------------------------------
    level: {
      type: Number,
      default: 1,
      min: [1, "Characthers level must be at least 1"],
      max: [20, "Max level is 20"],
    },
    //* race --------------------------------------------------------------------------------
    race: {
      type: String,
      lowercase: true,
      default: "human",
    },
    //* background --------------------------------------------------------------------------
    background: {
      type: String,
      enum: {
        values: [
          "acolyte",
          "artisan",
          "charlatan",
          "criminal",
          "entertainer",
          "farmer",
          "guard",
          "guide",
          "hermit",
          "merchant",
          "noble",
          "sage",
          "sailor",
          "scribe",
          "soldier",
          "wayfarer",
        ],
        message: "Invalid background",
      },
      lowercase: true,
      default: "acolyte",
    },
    //* alignment ---------------------------------------------------------------------------
    alignment: {
      type: String,
      enum: {
        values: [
          "lawful good",
          "neutral good",
          "chaotic good",
          "lawful neutral",
          "true neutral",
          "chaotic neutral",
          "lawful evil",
          "neutral evil",
          "chaotic evil",
        ],
        message: "Invalid alignment",
      },
      lowercase: true,
      default: "lawful good",
    },
    //* experience --------------------------------------------------------------------------
    experience: {
      type: Number,
      default: 0,
      min: [0, "Charaters xp can't go below 0"],
      max: [1000000, "Max experience is 1,000,000"],
    },
    //* player name -------------------------------------------------------------------------
    playerName: {
      type: String,
      default: "Nerd",
      maxlength: [50, "Player name can't be longer than 50 characters"],
      minlength: [1, "Player name can't be empty"],
    },
    //* stats -------------------------------------------------------------------------------
    stats: {
      ...statsTypes(),
    },
    //* inspiration -------------------------------------------------------------------------
    inspiration: {
      type: Boolean,
      default: false,
    },
    //* proficiency bonus -------------------------------------------------------------------
    proficiencyBonus: {
      type: Number,
      default: 2,
      min: [0, "Proficiency bonus can't be below 0"],
      max: [6, "Proficiency bonus can't be above 6"],
    },
    //* Saving Throws -----------------------------------------------------------------------
    saves: {
      type: [String],
      enum: { values: stats, message: "Invalid saving throw" },
      default: [],
    },
    //* skills ------------------------------------------------------------------------------
    skills: {
      type: [String],
      enum: {
        values: [
          "acrobatics",
          "animalHandling",
          "arcana",
          "athletics",
          "deception",
          "history",
          "insight",
          "intimidation",
          "investigation",
          "medicine",
          "nature",
          "perception",
          "performance",
          "persuasion",
          "religion",
          "sleightOfHand",
          "stealth",
          "survival",
        ],
        message: "Invalid skill",
      },
      default: [],
    },
    //* passive wisdom (perception) ---------------------------------------------------------
    passiveWisdom: {
      type: Number,
      default: 10,
      min: [0, "Passive wisdom can't be below 0"],
      max: [30, "Passive wisdom can't be above 30"],
    },
    //* other proficiencies and languages ---------------------------------------------------
    otherProficiencies: {
      type: [String],
      default: [],
      minlength: [1, "Proficiencies/Languages can't be empty"],
      maxlength: [
        100,
        "Proficiencies/Languages can't be longer than 100 characters",
      ],
    },
    //* armor class -------------------------------------------------------------------------
    armorClass: {
      type: Number,
      default: 0,
      min: [0, "Armor class can't be below 0"],
      max: [30, "Armor class can't be above 30"],
    },
    //* initiative --------------------------------------------------------------------------
    initiative: {
      type: Number,
      default: 0,
      min: [-20, "Initiative can't be below -20"],
      max: [20, "Initiative can't be above 20"],
    },
    //* speed -------------------------------------------------------------------------------
    speed: {
      type: Number,
      default: 30,
      min: [0, "Speed can't be below 0"],
      max: [120, "Speed can't be above 120"],
    },
    //* health ------------------------------------------------------------------------------
    health: {
      max: {
        type: Number,
        default: 1,
        min: [1, "Max health can't be below 0"],
        max: [1000, "Max health can't be above 1000"],
      },
      current: {
        type: Number,
        default: 0,
        min: [0, "Current health can't be below 0"],
        max: [1000, "Current health can't be above 1000"],
      },
      temporary: {
        type: Number,
        default: 0,
        min: [0, "Temporary health can't be below 0"],
        max: [1000, "Temporary health can't be above 1000"],
      },
    },
    //* hit dice ----------------------------------------------------------------------------
    dice: {
      type: Number,
      default: 4,
      enum: { values: hitDice, message: "Invalid hit dice" },
    },
    //* death saves -------------------------------------------------------------------------
    deathSaves: {
      successes: {
        type: Number,
        default: 0,
        min: [0, "successes can't be below 0"],
        max: [3, "successes can't be above 3"],
      },
      failures: {
        type: Number,
        default: 0,
        min: [0, "failures can't be below 0"],
        max: [3, "failures can't be above 3"],
      },
    },
    //* attacks and spellcasting ------------------------------------------------------------
    attack: {
      type: [Schema.Types.ObjectId],
      ref: "weapon",
      default: [],
    },
    //* equipment ---------------------------------------------------------------------------
    equipment: {
      type: [String],
      default: [],
    },
    //* personal traits, ideals, bonds, and flaws -------------------------------------------
    personality: {
      ...traitsIdealsBondsFlaws(),
    },
    //* features and traits -----------------------------------------------------------------
    featuresTraits: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const character = mongoose.model("character", characterSchema);

// character.deleteMany({}).then(() => {
//   const _character = new character({
//     name: "Test Character",
//     class: "bard",
//     strength: 15,

//     saves: ["strength", "constitution"],

//
//   });
//   _character
//     .save()
//     .then(() => console.log("Character saved successfully"))
//     .catch((error) => console.error("Error saving character:", error));
// });

export default mongoose.model("character", characterSchema);
