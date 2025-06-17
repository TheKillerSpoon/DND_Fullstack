function Input({ type, id, blur, layer, character, update }) {
  return (
    <input
      type={!type ? "text" : type}
      id={id}
      onKeyUp={(e) => {
        if (e.key === "Enter") e.target.blur();
      }}
      {...(!blur
        ? {
            onBlur: (e) => {
              if (character[e.target.id] !== e.target.value) {
                update(character._id, { [e.target.id]: e.target.value });
              }
            },
            placeholder: character[id],
            defaultValue: character[id],
          }
        : blur == "object"
        ? {
            onBlur: (e) => {
              if (character[e.target.id] !== e.target.value && layer) {
                update(character._id, {
                  [layer]: {
                    ...character[layer],
                    [e.target.id]: e.target.value,
                  },
                });
              }
            },
            placeholder: character[layer][id],
            defaultValue: character[layer][id],
          }
        : blur == "array"
        ? ""
        : "")}
    />
  );
}

export default Input;
