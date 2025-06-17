function Inspiration({ character, update }) {
  return (
    <ul>
      <li>
        Inspiration: {character.inspiration ? "True" : "False"}{" "}
        <input
          type="checkbox"
          id="inspiration"
          onClick={(e) => {
            update(character._id, { [e.target.id]: e.target.checked });
          }}
          defaultChecked={character.inspiration}
        />
      </li>
    </ul>
  );
}

export default Inspiration;
