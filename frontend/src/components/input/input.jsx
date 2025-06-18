export default function Input({
  type,
  id,
  blur,
  layer,
  layer2,
  character,
  update,
  weaponId,
}) {
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
              if (character[id] !== e.target.value && layer) {
                update(character._id, {
                  [layer]: {
                    ...character[layer],
                    [id]: e.target.value,
                  },
                });
              }
            },
            placeholder: character[layer][id],
            defaultValue: character[layer][id],
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
        : blur == "attack"
        ? {
            onBlur: (e) => {
              if (character[blur][layer][id] !== e.target.value) {
                update(character._id, weaponId, { [id]: e.target.value });
              }
            },
            placeholder: character[blur][layer][id],
            defaultValue: character[blur][layer][id],
          }
        : blur == "attackDamage"
        ? {
            onBlur: (e) => {
              if (character.attack[layer][layer2][id] !== e.target.value) {
                update(character._id, weaponId, {
                  [layer2]: {
                    ...character.attack[layer][layer2],
                    [id]: e.target.value,
                  },
                });
              }
            },
            placeholder: character.attack[layer][layer2][id],
            defaultValue: character.attack[layer][layer2][id],
          }
        : blur == "weapon"
        ? {
            onBlur: (e) => {
              update(character._id, {
                attack: [...character.attack, { [id]: e.target.value }],
              });
              e.target.value = ""; // Clear input after saving
            },
            placeholder: `Add ${blur} (name)`,
          }
        : "")}
    />
  );
}
