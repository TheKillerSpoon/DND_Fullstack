import { useState } from "react";

//! This hook provides functions to interact with a REST API for managing characters and their weapons.
const API_URL = "http://localhost:3042";

export const useFetch = () => {
  const [characters, setCharacters] = useState([]);
  const [Error, setError] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  //! Universal -------------------------------------------

  // Get all characters
  const getAllCharacters = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/characters`);
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      const data = await response.json();
      console.log("Characters fetched:", data.data);
      setCharacters(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Get character by id
  const getCharacterById = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/character/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch character");
      }
      const data = await response.json();
      return data;
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
      const data = await response.json();
      setCharacters((prev) => [...prev, data]);
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
      const data = await response.json();
      setCharacters((prev) =>
        prev.map((char) => (char.id === id ? data : char))
      );
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
      const response = await fetch(`${API_URL}/character/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete character");
      }
      setCharacters((prev) => prev.filter((char) => char.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //! Weapons ---------------------------------------------

  // Create weapon
  const createWeapon = async (id, weaponData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/weapon/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weaponData),
      });
      if (!response.ok) {
        throw new Error("Failed to create weapon");
      }
      const data = await response.json();
      setCharacters((prev) => [...prev, data]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update weapon
  const updateWeapon = async (id, weaponId, weaponData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/weapon/${id}/${weaponId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weaponData),
      });
      if (!response.ok) {
        throw new Error("Failed to update weapon");
      }
      const data = await response.json();
      setCharacters((prev) =>
        prev.map((char) =>
          char.id === id
            ? {
                ...char,
                weapons: char.weapons.map((w) =>
                  w.id === weaponId ? data : w
                ),
              }
            : char
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete weapon
  const deleteWeapon = async (id, weaponId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/weapon/${id}/${weaponId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete weapon");
      }
      setCharacters((prev) =>
        prev.map((char) => ({
          ...char,
          weapons: char.weapons.filter((w) => w.id !== weaponId),
        }))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    //* misc
    characters,
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
    createWeapon,
    updateWeapon,
    deleteWeapon,
  };
};
