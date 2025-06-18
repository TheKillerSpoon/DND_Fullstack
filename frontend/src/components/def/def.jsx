//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Def({ character, update }) {
  return (
    <ul>
      <li>
        Armor Class: {character.armorClass}
        <Input
          id="armorClass"
          type="number"
          character={character}
          update={update}
        />
      </li>
      <li>
        Initiative: {character.initiative}
        <Input
          id="initiative"
          type="number"
          character={character}
          update={update}
        />
      </li>
      <li>
        Speed: {character.speed}
        <Input id="speed" type="number" character={character} update={update} />
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
                  update={update}
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
        <Input id="dice" type="number" character={character} update={update} />
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
                  update={update}
                  blur={"object"}
                  layer={"deathSaves"}
                />
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
}

export default Def;
