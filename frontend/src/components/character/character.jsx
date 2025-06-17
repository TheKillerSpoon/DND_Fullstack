function Character({ character, update }) {
  return (
    <ul>
      <li>Character Name:</li>
      <li>
        <input
          type="text"
          id="name"
          placeholder={character.name}
          onBlur={(e) => {
            if (character[e.target.id] !== e.target.value) {
              update(character._id, { [e.target.id]: e.target.value });
            }
          }}
          defaultValue={character.name}
        />
      </li>
    </ul>
  );
}

export default Character;
