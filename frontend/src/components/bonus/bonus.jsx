function Bonus({ character, update }) {
  return (
    <ul>
      <li>
        proficiencyBonus: {character.proficiencyBonus}
        <input
          type="number"
          id="proficiencyBonus"
          placeholder={character.proficiencyBonus}
          onKeyUp={(e) => {
            if (e.key === "Enter") e.target.blur();
          }}
          onBlur={(e) => {
            if (character[e.target.id] !== e.target.value) {
              update(character._id, { [e.target.id]: e.target.value });
            }
          }}
          defaultValue={character.proficiencyBonus}
        />
      </li>
    </ul>
  );
}

export default Bonus;
