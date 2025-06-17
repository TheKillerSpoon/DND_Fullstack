function Personality({ character, update }) {
  return (
    <ul>
      Personality
      {Object.keys(character.personality).map((key) => {
        return (
          <li key={key}>
            {key}: {character.personality[key]}
          </li>
        );
      })}
    </ul>
  );
}

export default Personality;
