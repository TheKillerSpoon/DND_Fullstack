function Saving({ saves }) {
  return (
    <ul>
      <li>Saving throws:</li>
      {saves.map((save, index) => (
        <li key={index}>{save}</li>
      ))}
    </ul>
  );
}

export default Saving;
