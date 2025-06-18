//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Personality({ character, update }) {
  return (
    <ul>
      Personality
      {Object.keys(character.personality).map((key) => {
        return (
          <li key={key}>
            {key}: {character.personality[key]}
            <Input
              id={key}
              character={character}
              update={update}
              blur={"object"}
              layer={"personality"}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default Personality;
