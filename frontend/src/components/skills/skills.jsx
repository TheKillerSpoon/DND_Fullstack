//? component to display and edit character information
import Input from "../../components/input/input.jsx";

function Skills({ character, update }) {
  return (
    <ul>
      <li>Skills</li>
      {character.skills.map((skill, index) => (
        <li key={index}>
          {skill}

          <button
            id="skills"
            onClick={(e) =>
              update(character._id, {
                [e.target.id]: character[e.target.id].filter(
                  (x) => x !== skill
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
          id="skills"
          character={character}
          update={update}
          blur={"array"}
        />
      </li>
    </ul>
  );
}

export default Skills;
