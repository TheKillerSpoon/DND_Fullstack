function Saving({ character, update }) {
  return (
    <ul>
      <li>Saving throws:</li>
      {character.saves.map((save, index) => (
        <li key={index}>{save}</li>
      ))}
    </ul>
  );
}

export default Saving;
