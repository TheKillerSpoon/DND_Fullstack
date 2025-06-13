import { useState } from "react";

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

//! useFetch ----------------------------------------------------

export const useFetch = () => {
  const [characters, setCharacters] = useState([]);
  const [character, setCharacter] = useState(null);
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
      getAllCharacters(); // Refresh the list after creating a character
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
      getAllCharacters(); // Refresh the list after deleting a character
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
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
    createWeapon,
    updateWeapon,
    deleteWeapon,
  };
};
