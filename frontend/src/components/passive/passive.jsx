//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Passive({ character, update }) {
  return (
    <ul>
      <li>Passive: {character.passiveWisdom}</li>
      <li>
        <Input
          id="passiveWisdom"
          type="number"
          character={character}
          update={update}
        />
      </li>
    </ul>
  );
}

export default Passive;
