function Info({ character, update }) {
  return (
    <ul>
      <li>
        Class:{" "}
        <input
          type="text"
          id="class"
          placeholder={character.class}
          onBlur={(e) => {
            if (character[e.target.id] !== e.target.value) {
              update(character._id, { [e.target.id]: e.target.value });
            }
          }}
          defaultValue={character.class}
        />
      </li>
      <li>
        Level:{" "}
        <input
          type="number"
          id="level"
          placeholder={character.level}
          onBlur={(e) => {
            if (character[e.target.id] !== e.target.value) {
              update(character._id, { [e.target.id]: e.target.value });
            }
          }}
          defaultValue={character.level}
        />
      </li>
      <li>
        Race:{" "}
        <input
          type="text"
          id="race"
          placeholder={character.race}
          onBlur={(e) => {
            if (character[e.target.id] !== e.target.value) {
              update(character._id, { [e.target.id]: e.target.value });
            }
          }}
          defaultValue={character.race}
        />
      </li>
      <li>
        Background:{" "}
        <input
          type="text"
          id="background"
          placeholder={character.background}
          onBlur={(e) => {
            if (character[e.target.id] !== e.target.value) {
              update(character._id, { [e.target.id]: e.target.value });
            }
          }}
          defaultValue={character.background}
        />
      </li>
      <li>
        Alignment:{" "}
        <input
          type="text"
          id="alignment"
          placeholder={character.alignment}
          onBlur={(e) => {
            if (character[e.target.id] !== e.target.value) {
              update(character._id, { [e.target.id]: e.target.value });
            }
          }}
          defaultValue={character.alignment}
        />
      </li>
      <li>
        Name:{" "}
        <input
          type="text"
          id="playerName"
          placeholder={character.playerName}
          onBlur={(e) => {
            if (character[e.target.id] !== e.target.value) {
              update(character._id, { [e.target.id]: e.target.value });
            }
          }}
          defaultValue={character.playerName}
        />
      </li>
      <li>
        XP:{" "}
        <input
          type="number"
          id="experience"
          placeholder={character.experience}
          onBlur={(e) => {
            if (character[e.target.id] !== e.target.value) {
              update(character._id, { [e.target.id]: e.target.value });
            }
          }}
          defaultValue={character.experience}
        />
      </li>
    </ul>
  );
}

export default Info;
