//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Inspiration({ character, update }) {
  return (
    <ul>
      <li>
        Inspiration: {character.inspiration ? "True" : "False"}{" "}
        <Input
          id="inspiration"
          type="checkbox"
          character={character}
          update={update}
        />
      </li>
    </ul>
  );
}

export default Inspiration;
