//? React ------------------------------------------------------
import { useEffect, useState } from "react";

//? Hooks ------------------------------------------------------
import useAuth from "../../hooks/auth/useAuth";

//! This hook provides functions to interact with a REST API for managing characters and their weapons.

const API_URL = (() => {
  if (!import.meta.env.VITE_BACKEND_URL) {
    throw new Error(
      "VITE_BACKEND_URL is not defined in the environment variables"
    );
  }

  let url = import.meta.env.VITE_BACKEND_URL;

  while (url.endsWith("/")) {
    url = url.slice(0, -1);
  }

  return url;
})();

//! fetchCharacter ----------------------------------------------------

export const fetchCharacter = () => {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState(null);
  const [Error, setError] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  //! Universal -------------------------------------------

  // Get all characters
  const getAllCharacters = async (userID) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/characters/${userID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      const data = await response.json();
      setCharacters(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCharacters(user._id);
  }, []);

  // Get character by id
  const getCharacterById = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/character/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch character");
      }
      const data = await response.json();
      setCharacter(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //! Characters ------------------------------------------
  // Create character
  const createCharacter = async (characterData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/character`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characterData),
      });
      if (!response.ok) {
        throw new Error("Failed to create character");
      }

      console.log("test:", await response.json());
      getAllCharacters(user._id); // Refresh the list after creating a character
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update character
  const updateCharacter = async (id, characterData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/character/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characterData),
      });
      if (!response.ok) {
        throw new Error("Failed to update character");
      }
      getCharacterById(id); // Refresh the character data after updating
      // setCharacter(await response.json().data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete character
  const deleteCharacter = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/character/${id}/${user._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete character");
      }
      getAllCharacters(user._id); // Refresh the list after deleting a character
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //! Weapons ---------------------------------------------

  // // Create weapon
  // const createWeapon = async (id, weaponData) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`${API_URL}/weapon/${id}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(weaponData),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to create weapon");
  //     }
  //     getCharacterById(id); // Refresh the character data after updating
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // // Update weapon
  // const updateWeapon = async (id, weaponId, weaponData) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`${API_URL}/weapon/${id}/${weaponId}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(weaponData),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to update weapon");
  //     }
  //     getCharacterById(id); // Refresh the character data after updating
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // // Delete weapon
  // const deleteWeapon = async (id, weaponId) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`${API_URL}/weapon/${id}/${weaponId}`, {
  //       method: "DELETE",
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to delete weapon");
  //     }
  //     getCharacterById(id); // Refresh the character data after updating
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return {
    //* misc
    characters,
    character,
    Error,
    IsLoading,
    //* Universal
    getAllCharacters,
    getCharacterById,
    //* Characters
    createCharacter,
    updateCharacter,
    deleteCharacter,
    //* Weapons
    // createWeapon,
    // updateWeapon,
    // deleteWeapon,
  };
};
