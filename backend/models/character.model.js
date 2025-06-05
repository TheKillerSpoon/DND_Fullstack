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
      maxlength: 500,
      minlength: 0,
      default: "",
    };
  });
  return TIBFObject;
};

const characterSchema = new Schema(
  {
    //* Character name ----------------------------------------------------------------------
    name: { type: String, required: [true, "Name is required"] },
    //* class -------------------------------------------------------------------------------
    class: {
      type: String,
      enum: {
        values: [
          "barbarian",
          "bard",
          "cleric",
          "druid",
          "fighter",
          "monk",
          "paladin",
          "ranger",
          "rogue",
          "sorcerer",
          "warlock",
          "wizard",
          "artificer",
        ],
        message: "Invalid class",
      },
      lowercase: true,
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
      enum: {
        values: [
          "human",
          "elf",
          "dwarf",
          "halfling",
          "dragonborn",
          "gnome",
          "half-elf",
          "half-orc",
          "tiefling",
        ],
        message: "Invalid race",
      },
      lowercase: true,
    },
    //* background --------------------------------------------------------------------------
    background: {
      type: String,
      enum: {
        values: [
          "acolyte",
          "charlatan",
          "criminal",
          "entertainer",
          "folk hero",
          "guild artisan",
          "hermit",
          "noble",
          "outlander",
          "sage",
          "soldier",
          "urchin",
        ],
        message: "Invalid background",
      },
      lowercase: true,
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
    },
    //* experience --------------------------------------------------------------------------
    experience: {
      type: Number,
      default: 0,
      min: [0, "Charaters xp can't go below 0"],
    },
    //* player name -------------------------------------------------------------------------
    playerName: {
      type: String,
      maxlength: [50, "Player name can't be longer than 50 characters"],
      minlength: [1, "Player name can't be empty"],
    },
    //* stats -------------------------------------------------------------------------------
    ...statsTypes(),
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
      type: Number,
      hitPoints: {
        max: { type: Number, default: 1, min: 1 },
        current: { type: Number, default: 0, min: 0 },
        temporary: { type: Number, default: 0, min: 0 },
      },
    },
    //* hit dice ----------------------------------------------------------------------------
    dice: {
      type: Number,
      default: 4,
      enum: hitDice,
    },
    //* death saves -------------------------------------------------------------------------
    deathSaves: {
      successes: { type: Number, default: 0, min: 0, max: 3 },
      failures: { type: Number, default: 0, min: 0, max: 3 },
    },
    //* attacks and spellcasting ------------------------------------------------------------
    attack: [
      {
        attackName: {
          type: String,
          minlength: 1,
          maxlength: 100,
          required: true,
        },
        attackBonus: { type: Number, default: 0, min: -20, max: 20 },
        damage: {
          hits: { type: Number, default: 1, min: 1, required: true },
          hitDice: {
            type: Number,
            enum: hitDice,
            required: true,
          },
        },
        damageType: { type: Number, min: 1, max: 50 },
      },
    ],
    //* equipment ---------------------------------------------------------------------------
    equipment: {
      type: [String],
      default: [],
    },
    //* personal traits, ideals, bonds, and flaws -------------------------------------------
    ...traitsIdealsBondsFlaws(),
    //* features and traits -----------------------------------------------------------------
    featuresTraits: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, strict: true }
);

const character = mongoose.model("character", characterSchema);

character.deleteMany({}).then(() => {
  const _character = new character({
    name: "Test Character",
    class: "barbarian",
    strength: 15,

    saves: ["strength", "constitution"],

    attack: {
      attackName: "Test Attack",
      attackBonus: 5,
      damage: {
        hits: 1,
        hitDice: 4,
      },
      damageType: 1,
    },
  });
  _character
    .save()
    .then(() => console.log("Character saved successfully"))
    .catch((error) => console.error("Error saving character:", error));
});

export default mongoose.model("character", characterSchema);
