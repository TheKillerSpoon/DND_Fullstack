function Traits({ character, update }) {
  return (
    <ul>
      Traits:
      {character.featuresTraits.map((trait, index) => (
        <li key={index}>{trait}</li>
      ))}
    </ul>
  );
}

export default Traits;
