//? Styles -----------------------------------------------------
import styles from "./createCard.module.css";

//? React ------------------------------------------------------
import { useForm } from "react-hook-form";
import { useEffect } from "react";

//? Hooks ------------------------------------------------------
import { fetchClass } from "../../hooks/class/FetchClass.jsx";
import { fetchSpecies } from "../../hooks/species/FetchSpecies.jsx";

//? CreateCard -------------------------------------------------
function CreateCard({ characters, createCharacter }) {
  const { getAllClasses, classes } = fetchClass();
  const { getAllSpeciess, species } = fetchSpecies();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    getAllClasses();
    getAllSpeciess();
  }, []);

  classes.sort((a, b) => a.className.localeCompare(b.className));
  species.sort((a, b) => a.speciesName.localeCompare(b.speciesName));

  const BackgroundInfo = (Feature, Proficiencies) => {
    return `Feat: ${Feature}. Proficiencies: ${Proficiencies.join(", ")}.`;
  };

  return (
    characters.length < 10 && (
      <div className={styles.characterCard}>
        <h2>New Character</h2>

        <form
          onSubmit={handleSubmit((data) => {
            createCharacter(data);
            setValue("name", "");
            setValue("class", "");
            setValue("race", "");
            setValue("background", "");
          })}
        >
          <input
            {...register("name", { required: true })}
            type="text"
            id="characterName"
            placeholder="Character Name *"
            required
          />

          <label htmlFor="class">Choose a class</label>
          <input
            type="text"
            placeholder="Class"
            list="class"
            {...register("class")}
          />

          <datalist id="class">
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem.className}>
                Ability:{" "}
                {classItem.primaryAbility.ability.length > 1
                  ? classItem.primaryAbility.amount > 1
                    ? classItem.primaryAbility.ability.join(" & ")
                    : classItem.primaryAbility.ability.join(" or ")
                  : classItem.primaryAbility.ability}
                . Hit die: D{classItem.hitPointDie}. Saves:{" "}
                {classItem.savingThrowProficiencies.join(" & ")}.
              </option>
            ))}
          </datalist>

          <label htmlFor="race">Choose a race</label>
          <input
            type="text"
            placeholder="Race"
            list="race"
            {...register("race")}
          />
          <datalist id="race">
            {species.map((speciesItem) => (
              <option key={speciesItem._id} value={speciesItem.speciesName}>
                {speciesItem.traits.join(", ")}.
              </option>
            ))}
          </datalist>

          <label htmlFor="background">Choose a background</label>
          <input
            type="text"
            placeholder="Background"
            list="background"
            {...register("background")}
          />
          <datalist id="background">
            <option value="Acolyte">
              {...BackgroundInfo("Magic Initiate (Cleric)", [
                "Insight",
                "Religion",
              ])}
            </option>
            <option value="Artisan">
              {...BackgroundInfo("Crafter", ["Investigation", "Persuation"])}
            </option>
            <option value="Charlatan">
              {...BackgroundInfo("Skilled", ["Deception", "Sleight of Hand"])}
            </option>
            <option value="Criminal">
              {...BackgroundInfo("Alert", ["Stealth", "Sleight of Hand"])}
            </option>
            <option value="Entertainer">
              {...BackgroundInfo("Musician", ["Acrobatics", "Performance"])}
            </option>
            <option value="Farmer">
              {...BackgroundInfo("Tough", ["Animal Handling", "Nature"])}
            </option>
            <option value="Guard">
              {...BackgroundInfo("Alert", ["Athletics", "Perception"])}
            </option>
            <option value="Guide">
              {...BackgroundInfo("Magic Initiate (Druid)", [
                "Stealth",
                "Survival",
              ])}
            </option>
            <option value="Hermit">
              {...BackgroundInfo("Healer", ["Medicine", "Religion"])}
            </option>
            <option value="Merchant">
              {...BackgroundInfo("Lucky", ["Animal Handling", "Persuasion"])}
            </option>
            <option value="Noble">
              {...BackgroundInfo("Skilled", ["History", "Persuasion"])}
            </option>
            <option value="Sage">
              {...BackgroundInfo("Magic Initiate (Wizard)", [
                "Arcana",
                "History",
              ])}
            </option>
            <option value="Sailor">
              {...BackgroundInfo("tavern Brawler", [
                "Acrobatics",
                "Perception",
              ])}
            </option>
            <option value="Scribe">
              {...BackgroundInfo("Skilled", ["Investigation", "Perception"])}
            </option>
            <option value="Soldier">
              {...BackgroundInfo("Savage Attacker", [
                "Athletics",
                "Intimidation",
              ])}
            </option>
            <option value="Wayfarer">
              {...BackgroundInfo("lucky", ["Insight", "Stealth"])}
            </option>
          </datalist>

          <button type="submit">Create Character</button>
        </form>
      </div>
    )
  );
}

export default CreateCard;
