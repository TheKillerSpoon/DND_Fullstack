export default function Input({ type, id, blur, layer, character, update }) {
  return (
    <input
      type={!type ? "text" : type}
      id={id}
      {...(type == "checkbox"
        ? {
            onClick: (e) => {
              update(character._id, { [id]: e.target.checked });
            },
            defaultChecked: character[id],
          }
        : {
            onKeyDown: (e) => {
              if (e.key === "Enter") e.target.blur();
            },
          })}
      {...(!blur && type != "checkbox"
        ? {
            onBlur: (e) => {
              if (character[id] !== e.target.value) {
                update(character._id, { [id]: e.target.value });
              }
            },
            placeholder: character[id],
            defaultValue: character[id],
          }
        : blur == "object"
        ? {
            onBlur: (e) => {
              if (character[id] !== e.target.value && layer[0]) {
                update(character._id, {
                  // [layer[0]]: {
                  // else
                  // {...character[layer[0]][layer[1]],
                  // [id]: e.target.value,}
                  // },
                });
              }
            },
            placeholder: character[layer[0]][id],
            defaultValue: character[layer[0]][id],
          }
        : blur == "array"
        ? {
            onBlur: (e) => {
              if (!character[id].includes(e.target.value)) {
                update(character._id, {
                  [id]: [...character[id], e.target.value],
                });
                e.target.value = ""; // Clear input after saving
              }
            },
            placeholder: `Add to ${id}`,
          }
        : "")}
    />
  );
}
