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

//? React ------------------------------------------------------
import { useEffect } from "react";

//? Hooks ------------------------------------------------------
import { useFetch } from "../../hooks/useFetch.jsx";

//? Character Page -----------------------------------------------
function CharacterPage() {
  const { getCharacterById, character } = useFetch();
  useEffect(() => {
    const CharacterID = localStorage.getItem("character");
    if (CharacterID) {
      getCharacterById(CharacterID);
    } else {
      window.location.pathname = "/";
    }
  }, []);

  character && console.log(character);

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
          <Character name={character.name} />
        </li>
        <li>
          <Info
            characterClass={character.class}
            level={character.level}
            race={character.race}
            background={character.background}
            alignment={character.alignment}
            playerName={character.playerName}
            xp={character.experience}
          />
        </li>
        <li>
          <Stats />
        </li>
        <li>
          <Inspiration />
        </li>
        <li>
          <Bonus />
        </li>
        <li>
          <Saving />
        </li>
        <li>
          <Skills />
        </li>
        <li>
          <Passive />
        </li>
        <li>
          <ProfLang />
        </li>
        <li>
          <Def />
        </li>
        <li>
          <Weapons />
        </li>
        <li>
          <Equipment />
        </li>
        <li>
          <Personality />
        </li>
        <li>
          <Traits />
        </li>
      </ul>
    )
  );
}

export default CharacterPage;
