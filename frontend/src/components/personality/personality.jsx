function Personality({ personality }) {
  return (
    <ul>
      Personality
      {Object.keys(personality).map((key) => {
        return (
          <li key={key}>
            {key}: {personality[key]}
          </li>
        );
      })}
    </ul>
  );
}

export default Personality;
