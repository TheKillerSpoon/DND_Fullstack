//? Fetch Data -------------------------------------------------
import { customFetch } from "../../hooks/generalFetch/fetch";

//? Form Input -------------------------------------------------
export default function FormInput({ location, register }) {
  // generic fetch for all locations
  const { data } = customFetch(
    location === "class" ? `${location}e` : location
  );

  return (
    <>
      <fieldset>
        <legend>Choose a {location}</legend>
        <input
          type="text"
          placeholder={location.charAt(0).toUpperCase() + location.slice(1)} //? Capitalize first letter
          list={location}
          {...register(location)}
        />
        <datalist id={location}>
          {location === "class" && //? If location is class, map through classes
            data.map((item) => (
              <option key={item._id} value={item.name}>
                Ability:{" "}
                {item.primaryAbility.ability.length > 1
                  ? item.primaryAbility.amount > 1
                    ? item.primaryAbility.ability.join(" & ")
                    : item.primaryAbility.ability.join(" or ")
                  : item.primaryAbility.ability}
                . Hit die: D{item.hitPointDie}. Saves:{" "}
                {item.savingThrowProficiencies.join(" & ")}.
              </option>
            ))}

          {location === "race" && //? If location is race, map through races
            data.map((item) => (
              <option key={item._id} value={item.name}>
                {item.traits.join(", ")}.
              </option>
            ))}

          {location === "background" && //? If location is background, map through backgrounds
            data.map((item) => (
              <option key={item._id} value={item.name}>
                {`skills: ${item.skillProficiencies.join(", ")}. `}
                {item.toolProficiencies.length
                  ? `tools: ${item.toolProficiencies.join(", ")}. `
                  : ""}
                {item.languages
                  ? `You can choose ${item.languages} language(s)`
                  : ""}
              </option>
            ))}
        </datalist>
      </fieldset>
    </>
  );
}
