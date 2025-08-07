import { useRoutes } from "react-router-dom";

// Importing the components for the different pages
import SelectPage from "./pages/select/select.jsx";
import CharacterPage from "./pages/character/character.jsx";

function App() {
  const routes = useRoutes([
    { path: "/", element: <SelectPage /> },
    { path: "/character", element: <CharacterPage /> },
  ]);

  return (
    <>
      <div className="content">{routes}</div>
    </>
  );
}

export default App;
