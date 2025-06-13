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

//? Hooks ------------------------------------------------------
import { useFetch } from "../../hooks/useFetch.jsx";

//? Character Page -----------------------------------------------
function CharacterPage() {
  const { character } = useFetch();

  character && console.log("Selected Character:", character);

  return (
    <>
      Character
      <a href="/">test</a>
      <p></p>
      <Character />
      <p></p>
      <Info />
      <p></p>
      <Stats />
      <p></p>
      <Inspiration />
      <p></p>
      <Bonus />
      <p></p>
      <Saving />
      <p></p>
      <Skills />
      <p></p>
      <Passive />
      <p></p>
      <ProfLang />
      <p></p>
      <Def />
      <p></p>
      <Weapons />
      <p></p>
      <Equipment />
      <p></p>
      <Personality />
      <p></p>
      <Traits />
    </>
  );
}

export default CharacterPage;
