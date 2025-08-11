import { useRoutes } from "react-router-dom";

// Importing the components for the different pages
import Frontpage from "./pages/frontpage/Frontpage.jsx";
import Login from "./pages/login/login.jsx";
import SelectPage from "./pages/select/select.jsx";
import CharacterPage from "./pages/character/character.jsx";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Frontpage /> },
    { path: "/login", element: <Login /> },
    { path: "/select", element: <SelectPage /> },
    { path: "/character", element: <CharacterPage /> },
  ]);

  return (
    <>
      <div className="content">{routes}</div>
    </>
  );
}

export default App;
