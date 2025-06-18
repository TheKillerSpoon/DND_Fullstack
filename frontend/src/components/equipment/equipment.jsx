//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Equipment({ character, update }) {
  return (
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
          update={update}
          blur={"array"}
        />
      </li>
    </ul>
  );
}

export default Equipment;
