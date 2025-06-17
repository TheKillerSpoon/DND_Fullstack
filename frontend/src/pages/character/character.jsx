//? Styles -----------------------------------------------------
import styles from "./character.module.css";

//? Components --------------------------------------------------
import Character from "../../components/character/character.jsx";
import Info from "../../components/info/info.jsx";
import Stats from "../../components/stats/stats.jsx";
import Inspiration from "../../components/inspiration/inspiration.jsx";
import Bonus from "../../components/bonus/bonus.jsx";
import Saving from "../../components/saving/saving.jsx";
import Skills from "../../components/skills/skills.jsx";
import Passive from "../../components/passive/passive.jsx";
import ProfLang from "../../components/proflang/proflang.jsx";
import Def from "../../components/def/def.jsx";
import Weapons from "../../components/weapons/weapons.jsx";
import Equipment from "../../components/equipment/equipment.jsx";
import Personality from "../../components/personality/personality.jsx";
import Traits from "../../components/traits/traits.jsx";

import Input from "../../components/input/input.jsx";

//? React ------------------------------------------------------
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//? Hooks ------------------------------------------------------
import { useFetch } from "../../hooks/useFetch.jsx";

//? Character Page -----------------------------------------------
function CharacterPage() {
  const { getCharacterById, updateCharacter, character } = useFetch();
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

  character && console.log(character);

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
          <a href="/">Frontpage</a>
        </li>
        <li>
          <Character {...setCommonProperties()} />
        </li>
        <li>
          <Info {...setCommonProperties()} />
        </li>
        <li>
          <Stats {...setCommonProperties()} />
        </li>
        <li>
          <Inspiration {...setCommonProperties()} />
        </li>
        <li>
          <Bonus {...setCommonProperties()} />
        </li>
        <li>
          <Saving {...setCommonProperties()} />
        </li>
        <li>
          <Skills {...setCommonProperties()} />
        </li>
        <li>
          <Passive {...setCommonProperties()} />
        </li>
        <li>
          <ProfLang {...setCommonProperties()} />
        </li>
        <li>
          <Def {...setCommonProperties()} />
        </li>
        <li>
          <Weapons {...setCommonProperties()} />
        </li>
        <li>
          <Equipment {...setCommonProperties()} />
        </li>
        <li>
          <Personality {...setCommonProperties()} />
        </li>
        <li>
          <Traits {...setCommonProperties()} />
        </li>
      </ul>
    )
  );
}

export default CharacterPage;
