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

//! fetchSpecies ----------------------------------------------------
export const fetchSpecies = () => {
  const [species, setSpecies] = useState([]);
  const [Error, setError] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  // Get all characters
  const getAllSpeciess = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/speciess`);
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      const data = await response.json();
      setSpecies(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    //* misc
    species,
    Error,
    IsLoading,
    //* class
    getAllSpeciess,
  };
};
