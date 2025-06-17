//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Character({ character, update }) {
  return (
    <ul>
      <li>Character Name: {character.name}</li>
      <li>
        <Input id="name" character={character} update={update} />
      </li>
    </ul>
  );
}

export default Character;
