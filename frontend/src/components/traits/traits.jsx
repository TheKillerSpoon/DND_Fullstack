function Traits({ traits }) {
  return (
    <ul>
      Traits:
      {traits.map((trait, index) => (
        <li key={index}>{trait}</li>
      ))}
    </ul>
  );
}

export default Traits;
