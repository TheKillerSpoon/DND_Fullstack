function Inspiration({ character, update }) {
  return (
    <ul>
      <li>Inspiration: {character.inspiration ? "True" : "False"}</li>
    </ul>
  );
}

export default Inspiration;
