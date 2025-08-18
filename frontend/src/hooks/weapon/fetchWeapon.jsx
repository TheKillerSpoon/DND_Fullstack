//? React ------------------------------------------------------
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

//! fetchWeapons ----------------------------------------------------

export const fetchWeapon = () => {
  const [weapons, setWeapons] = useState([]);
  const [weapon, setWeapon] = useState(null);
  const [Error, setError] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  // Get all weapons
  const getAllWeapons = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/weapons/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch weapons");
      }
      const data = await response.json();
      setWeapons(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Get weapon by id
  const getWeaponById = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/weapon/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch weapon");
      }
      const data = await response.json();
      setWeapon(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Create weapon
  const createWeapon = async (data, id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/weapon/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create weapon");
      }
      getWeaponById(id); // Refresh the weapon data after updating
      getAllWeapons(id);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Update weapon
  const updateWeapon = async (id, data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/weapon/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update weapon");
      }
      getWeaponById(id); // Refresh the weapon data after updating
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete weapon
  const deleteWeapon = async (id, characterID) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/weapon/${id}/${characterID}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete weapon");
      }
      getWeaponById(id); // Refresh the weapon data after updating
      getAllWeapons(characterID);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    //* misc
    weapons,
    weapon,
    Error,
    IsLoading,
    //* Weapons
    getAllWeapons,
    getWeaponById,
    createWeapon,
    updateWeapon,
    deleteWeapon,
  };
};
