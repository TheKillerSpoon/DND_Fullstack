function Saving({ character, update }) {
  return (
    <ul>
      <li>Saving throws:</li>
      {character.saves.map((save, index) => (
        <li key={index}>
          {save}
          <button
            id="saves"
            onClick={(e) =>
              update(character._id, {
                [e.target.id]: character[e.target.id].filter((x) => x !== save),
              })
            }
          >
            delete
          </button>
        </li>
      ))}
      <li>
        <input
          type="text"
          id="saves"
          placeholder="set saving throws"
          onKeyUp={(e) => {
            if (e.key === "Enter") e.target.blur();
          }}
          onBlur={(e) => {
            if (!character[e.target.id].includes(e.target.value)) {
              update(character._id, {
                [e.target.id]: [...character.saves, e.target.value],
              });
              e.target.value = ""; // Clear input after saving
            }
          }}
        />
      </li>
    </ul>
  );
}

export default Saving;
