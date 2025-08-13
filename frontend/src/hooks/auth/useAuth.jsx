import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function useAuth() {
  const [auth, setAuth] = useLocalStorage("auth", {});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(auth.token || null);
  const [signedIn, setSignedIn] = useState(!!auth.token);
  const [user, setUser] = useState(auth.token ? jwtDecode(auth.token) : null);

  const [error, setError] = useState(null);

  /* SignIn funktion der sender email og password til serveren for at få et token. */
  const signIn = async () => {
    setError(null);

    try {
      const response = await axios.post("http://localhost:3042/auth/signin", {
        email,
        password,
      });

      const receivedToken = response.data;
      const decodedUser = jwtDecode(receivedToken);

      setToken(receivedToken);
      setUser(decodedUser);
      setSignedIn(true);
      setAuth({ token: receivedToken });
    } catch (err) {
      setError("Login mislykkedes. Tjek dine oplysninger.");
      setSignedIn(false);
      setToken(null);
      setUser(null);
      setAuth({});
    }
  };

  /* SignOut funktion der logger brugeren ud ved at rydde state og localStorage */
  const signOut = () => {
    setSignedIn(false);
    setToken(null);
    setUser(null);
    setAuth({}); /* Rydder auth i localStorage */
  };

  return {
    //* error
    error,
    //* email
    email,
    setEmail,
    //* password
    password,
    setPassword,
    //* tokens
    token,
    signedIn,
    user,
    //* signIn and signOut
    signIn,
    signOut,
  };
}
