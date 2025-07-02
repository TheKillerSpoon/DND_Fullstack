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

//! fetchClass ----------------------------------------------------
export const fetchClass = () => {
  const [classes, setClasses] = useState([]);
  const [Error, setError] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  // Get all characters
  const getAllClasses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/classes`);
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }
      const data = await response.json();
      setClasses(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    //* misc
    classes,
    Error,
    IsLoading,
    //* class
    getAllClasses,
  };
};
