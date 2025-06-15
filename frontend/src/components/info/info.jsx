function Info({
  characterClass,
  level,
  race,
  background,
  alignment,
  playerName,
  xp,
}) {
  return (
    <ul>
      <li>{characterClass}</li>
      <li>{race}</li>
      <li>{background}</li>
      <li>{alignment}</li>
      <li>{playerName}</li>
      <li>{xp}</li>
      <li>{level}</li>
    </ul>
  );
}

export default Info;
