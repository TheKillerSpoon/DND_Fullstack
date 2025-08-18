//? Styles -----------------------------------------------------
import styles from "./character.module.css";

//? Components --------------------------------------------------
import Input from "../../components/input/input.jsx";

//? React ------------------------------------------------------
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//? Hooks ------------------------------------------------------
import { fetchCharacter } from "../../hooks/character/FetchCharacter.jsx";
import { fetchWeapon } from "../../hooks/weapon/fetchWeapon.jsx";

//? Character Page -----------------------------------------------
function CharacterPage() {
  const { getCharacterById, updateCharacter, character } = fetchCharacter();
  const { getAllWeapons, deleteWeapon, updateWeapon, createWeapon, weapons } =
    fetchWeapon();
  useEffect(() => {
    const CharacterID = localStorage.getItem("character");
    if (CharacterID) {
      getCharacterById(CharacterID);
      getAllWeapons(CharacterID);
    } else {
      useNavigate().navigate("/select");
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

  const setCommonProperties = () => {
    const commonProperties = {
      character: character,
      update: updateCharacter,
      // update: test,
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
          <a href="/select">selcet page</a>
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
            {/* kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk */}
            <li>Weapons:</li>
            {weapons.map((weapon) => (
              <li key={weapon._id}>
                <input
                  type="text"
                  placeholder="weapon name"
                  defaultValue={weapon.name}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.target.blur();
                  }}
                  onBlur={(e) => {
                    if (
                      weapon.name !== e.target.value &&
                      weapon._id &&
                      e.target.value
                    ) {
                      updateWeapon(weapon._id, { name: e.target.value });
                    }
                  }}
                />
                <input
                  type="number"
                  placeholder="attack bonus"
                  defaultValue={weapon.bonus}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.target.blur();
                  }}
                  onBlur={(e) => {
                    if (
                      weapon.bonus !== e.target.value &&
                      weapon._id &&
                      e.target.value
                    ) {
                      updateWeapon(weapon._id, { bonus: e.target.value });
                    }
                  }}
                />

                <input
                  type="number"
                  placeholder="dice amount"
                  defaultValue={weapon.damage.hits}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.target.blur();
                  }}
                  onBlur={(e) => {
                    if (
                      weapon.damage.hits !== e.target.value &&
                      weapon._id &&
                      e.target.value
                    ) {
                      updateWeapon(weapon._id, {
                        damage: {
                          hitDice: weapon.damage.hitDice,
                          hits: e.target.value,
                        },
                      });
                    }
                  }}
                />
                <input
                  type="number"
                  placeholder="hit dice"
                  defaultValue={weapon.damage.hitDice}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.target.blur();
                  }}
                  onBlur={(e) => {
                    if (
                      weapon.damage.hitDice !== e.target.value &&
                      weapon._id &&
                      e.target.value
                    ) {
                      updateWeapon(weapon._id, {
                        damage: { ...weapon.damage, hitDice: e.target.value },
                      });
                    }
                  }}
                />

                <input
                  type="number"
                  placeholder="damage bonus"
                  defaultValue={weapon.extra}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.target.blur();
                  }}
                  onBlur={(e) => {
                    if (
                      weapon.extra !== e.target.value &&
                      weapon._id &&
                      e.target.value
                    ) {
                      updateWeapon(weapon._id, {
                        extra: e.target.value,
                      });
                    }
                  }}
                />

                <button
                  onClick={() => {
                    deleteWeapon(weapon._id, character._id);
                  }}
                >
                  delete
                </button>
              </li>
            ))}

            <li>
              <input
                type="text"
                id="name"
                placeholder="Enter weapon name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.target.blur();
                }}
                onBlur={(e) => {
                  if (e.target.value) {
                    createWeapon({ name: e.target.value }, character._id);
                  }
                }}
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
