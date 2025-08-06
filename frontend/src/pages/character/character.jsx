//? Styles -----------------------------------------------------
import styles from "./character.module.css";

//? Components --------------------------------------------------
import Input from "../../components/input/input.jsx";

//? React ------------------------------------------------------
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//? Hooks ------------------------------------------------------
import { fetchCharacter } from "../../hooks/character/FetchCharacter.jsx";

//? Character Page -----------------------------------------------
function CharacterPage() {
  const {
    getCharacterById,
    updateCharacter,
    deleteWeapon,
    updateWeapon,
    character,
  } = fetchCharacter();
  useEffect(() => {
    const CharacterID = localStorage.getItem("character");
    if (CharacterID) {
      getCharacterById(CharacterID);
    } else {
      useNavigate().navigate("/");
    }
  }, []);

  // This function is just for testing purposes, it logs the id and data to the console
  const test = (id, data) => {
    console.log("id", id);
    console.log("data", data);
  };

  const test1 = (id, aid, data) => {
    console.log("id", id);
    console.log("aid", aid);
    console.log("data", data);
  };

  useEffect(() => {
    character && console.log(character);
  }, [character]);

  const setCommonProperties = (weapon) => {
    const commonProperties = {
      character: character,
      update: updateCharacter,
      updateWeapon: updateWeapon,
      deleteWeapon: deleteWeapon,
      // update: test,
      // weaponUpdate: test1,
      // weaponDelete: test,
    };
    return commonProperties;
  };

  return (
    character && (
      <ul className={styles.test}>
        <li>
          <h1>Character</h1>
        </li>
        <li>
          <a href="/">Frontpage</a>
        </li>
        <li>
          <ul>
            <li>Character Name: {character.name}</li>
            <li>
              <Input
                id="name"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
          </ul>
        </li>
        <li>
          <ul>
            {Object.keys(character.stats)
              .sort()
              .map((key, index) => {
                return (
                  <li key={index}>
                    {key}: {character.stats[key]}
                    <Input
                      id={key}
                      type="number"
                      character={character}
                      updateCharacter={updateCharacter}
                      blur={"object"}
                      layer={"stats"}
                    />
                  </li>
                );
              })}
          </ul>
        </li>
        <li>
          <ul>
            <li>
              Class: {character.class}
              <Input
                id="class"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
            <li>
              Level: {character.level}
              <Input
                id="level"
                type="number"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
            <li>
              Race: {character.race}
              <Input
                id="race"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
            <li>
              Background: {character.background}
              <Input
                id="background"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
            <li>
              Alignment: {character.alignment}
              <Input
                id="alignment"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
            <li>
              Name: {character.playerName}
              <Input
                id="playerName"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
            <li>
              XP: {character.experience}
              <Input
                id="experience"
                type="number"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              Inspiration: {character.inspiration ? "True" : "False"}{" "}
              <Input
                id="inspiration"
                type="checkbox"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              proficiencyBonus: {character.proficiencyBonus}
              <input
                type="number"
                id="proficiencyBonus"
                placeholder={character.proficiencyBonus}
                onKeyUp={(e) => {
                  if (e.key === "Enter") e.target.blur();
                }}
                onBlur={(e) => {
                  if (character[e.target.id] !== e.target.value) {
                    update(character._id, { [e.target.id]: e.target.value });
                  }
                }}
                defaultValue={character.proficiencyBonus}
              />
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>Saving throws:</li>
            {character.saves.map((save, index) => (
              <li key={index}>
                {save}
                <button
                  id="saves"
                  onClick={(e) =>
                    update(character._id, {
                      [e.target.id]: character[e.target.id].filter(
                        (x) => x !== save
                      ),
                    })
                  }
                >
                  delete
                </button>
              </li>
            ))}
            <li>
              <Input
                id="saves"
                character={character}
                updateCharacter={updateCharacter}
                blur={"array"}
              />
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>Skills</li>
            {character.skills.map((skill, index) => (
              <li key={index}>
                {skill}

                <button
                  id="skills"
                  onClick={(e) =>
                    update(character._id, {
                      [e.target.id]: character[e.target.id].filter(
                        (x) => x !== skill
                      ),
                    })
                  }
                >
                  delete
                </button>
              </li>
            ))}
            <li>
              <Input
                id="skills"
                character={character}
                updateCharacter={updateCharacter}
                blur={"array"}
              />
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>Passive: {character.passiveWisdom}</li>
            <li>
              <Input
                id="passiveWisdom"
                type="number"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>ProfLang:</li>
            {character.otherProficiencies.map((proficiency, index) => (
              <li key={index}>
                {proficiency}

                <button
                  id="otherProficiencies"
                  onClick={(e) =>
                    update(character._id, {
                      [e.target.id]: character[e.target.id].filter(
                        (x) => x !== proficiency
                      ),
                    })
                  }
                >
                  delete
                </button>
              </li>
            ))}
            <li>
              <Input
                id="otherProficiencies"
                character={character}
                updateCharacter={updateCharacter}
                blur={"array"}
              />
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              Armor Class: {character.armorClass}
              <Input
                id="armorClass"
                type="number"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
            <li>
              Initiative: {character.initiative}
              <Input
                id="initiative"
                type="number"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
            <li>
              Speed: {character.speed}
              <Input
                id="speed"
                type="number"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
            <li>
              <p>Health:</p>
              <ul>
                {Object.keys(character.health).map((key, index) => {
                  return (
                    <li key={index}>
                      {key}: {character.health[key]}
                      <Input
                        id={key}
                        type="number"
                        character={character}
                        updateCharacter={updateCharacter}
                        blur={"object"}
                        layer={"health"}
                      />
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              Hit dice: D{character.dice}
              <Input
                id="dice"
                type="number"
                character={character}
                updateCharacter={updateCharacter}
              />
            </li>
            <li>
              <p>Death Saves:</p>
              <ul>
                {Object.keys(character.deathSaves).map((key, index) => {
                  return (
                    <li key={index}>
                      {key}: {character.deathSaves[key]}
                      <Input
                        id={key}
                        type="number"
                        character={character}
                        updateCharacter={updateCharacter}
                        blur={"object"}
                        layer={"deathSaves"}
                      />
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>Weapons:</li>
            {character.attack.map((weapon, windex) => (
              <li key={weapon?._id || windex}>
                <ul>
                  {weapon &&
                    Object.keys(weapon).map((key, index) => {
                      console.log("key:", [key], "index:", index);
                      if (key && index > 1) {
                        if (key !== "_id")
                          return (
                            <li key={key}>
                              {key}: {weapon[key]}
                              <Input
                                id={key}
                                type="number"
                                character={character}
                                updateCharacter={updateWeapon}
                                blur="attack"
                                weaponId={weapon._id}
                                layer={windex}
                              />
                            </li>
                          );
                      } else if (index === 0) {
                        var damage = weapon[key];
                        return (
                          <li key={key}>
                            {key}:{" "}
                            {Object.keys(damage)
                              .map((key) => damage[key])
                              .join("D")}
                            {Object.keys(damage).map((key) => (
                              <p key={key}>
                                {key}
                                <Input
                                  id={key}
                                  type="number"
                                  character={character}
                                  updateCharacter={updateWeapon}
                                  blur="attackDamage"
                                  weaponId={weapon._id}
                                  layer={windex}
                                  layer2="damage"
                                />
                              </p>
                            ))}
                          </li>
                        );
                      } else {
                        return (
                          <li key={key}>
                            {key}: {weapon[key]}
                            <button
                              id={key}
                              onClick={(e) =>
                                weaponDelete(character._id, weapon._id, {
                                  attack: character.attack.filter(
                                    (x) => x._id !== weapon._id
                                  ),
                                })
                              }
                            >
                              delete
                            </button>
                            <Input
                              id={key}
                              character={character}
                              updateCharacter={updateWeapon}
                              blur="attack"
                              weaponId={weapon._id}
                              layer={windex}
                            />
                          </li>
                        );
                      }
                    })}
                </ul>
              </li>
            ))}
            <li>
              <Input
                id="attackName"
                character={character}
                updateCharacter={updateCharacter}
                blur="weapon"
              />
            </li>
          </ul>
        </li>
        <li>
          <ul>
            Equipment:{" "}
            {character.equipment.map((equip) => (
              <li key={equip}>
                {equip}

                <button
                  id="equipment"
                  onClick={(e) =>
                    update(character._id, {
                      [e.target.id]: character[e.target.id].filter(
                        (x) => x !== equip
                      ),
                    })
                  }
                >
                  delete
                </button>
              </li>
            ))}
            <li>
              <Input
                id="equipment"
                character={character}
                updateCharacter={updateCharacter}
                blur={"array"}
              />
            </li>
          </ul>
        </li>
        <li>
          <ul>
            Personality
            {Object.keys(character.personality).map((key) => {
              return (
                <li key={key}>
                  {key}: {character.personality[key]}
                  <Input
                    id={key}
                    character={character}
                    updateCharacter={updateCharacter}
                    blur={"object"}
                    layer={"personality"}
                  />
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          <ul>
            Traits:
            {character.featuresTraits.map((trait, index) => (
              <li key={index}>
                {trait}

                <button
                  id="featuresTraits"
                  onClick={(e) =>
                    update(character._id, {
                      [e.target.id]: character[e.target.id].filter(
                        (x) => x !== trait
                      ),
                    })
                  }
                >
                  delete
                </button>
              </li>
            ))}
            <li>
              <Input
                id="featuresTraits"
                character={character}
                updateCharacter={updateCharacter}
                blur={"array"}
              />
            </li>
          </ul>
        </li>
      </ul>
    )
  );
}

export default CharacterPage;
