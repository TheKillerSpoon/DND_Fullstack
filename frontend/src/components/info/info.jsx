//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Info({ character, update }) {
  return (
    <ul>
      <li>
        Class: {character.class}
        <Input id="class" character={character} update={update} />
      </li>
      <li>
        Level: {character.level}
        <Input id="level" type="number" character={character} update={update} />
      </li>
      <li>
        Race: {character.race}
        <Input id="race" character={character} update={update} />
      </li>
      <li>
        Background: {character.background}
        <Input id="background" character={character} update={update} />
      </li>
      <li>
        Alignment: {character.alignment}
        <Input id="alignment" character={character} update={update} />
      </li>
      <li>
        Name: {character.playerName}
        <Input id="playerName" character={character} update={update} />
      </li>
      <li>
        XP: {character.experience}
        <Input
          id="experience"
          type="number"
          character={character}
          update={update}
        />
      </li>
    </ul>
  );
}

export default Info;
