import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function useAuth() {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [token, setToken] = useState(auth.token || null);
  const [user, setUser] = useState(auth.token ? jwtDecode(auth.token) : null);

  const [error, setError] = useState(null);

  /* SignIn funktion der sender email og password til serveren for at få et token. */
  const signIn = async ({ email, password }) => {
    setError(null);
    console.log("Signing in with:", email);
    console.log("Signing in with:", password);
    try {
      const response = await axios.post("http://localhost:3042/auth/signin", {
        email,
        password,
      });

      const receivedToken = response.data.data;
      const decodedUser = jwtDecode(receivedToken);

      console.log("decoded user:", decodedUser);

      setToken(receivedToken);
      setUser(decodedUser);
      setAuth({ token: receivedToken });
    } catch (err) {
      setError("Login mislykkedes. Tjek dine oplysninger.");
      setToken(null);
      setUser(null);
      setAuth({});
    }
  };

  /* SignOut funktion der logger brugeren ud ved at rydde state og localStorage */
  const signOut = () => {
    setToken(null);
    setUser(null);
    setAuth({}); /* Rydder auth i localStorage */
  };

  return {
    //* error
    error,
    //* tokens
    token,
    user,
    //* signIn and signOut
    signIn,
    signOut,
  };
}
