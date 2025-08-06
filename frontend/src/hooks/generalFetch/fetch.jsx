import { useState, useEffect } from "react";

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

//! Custom fetch ----------------------------------------------------
export const customFetch = (FetchLocation) => {
  const [data, setData] = useState([]);
  const [Error, setError] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  // Get all
  const getAll = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${FetchLocation}s`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setData(data.data.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    //* data
    data,
    //* misc
    Error,
    IsLoading,
  };
};
