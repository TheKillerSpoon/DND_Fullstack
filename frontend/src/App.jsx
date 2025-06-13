import { useRoutes } from "react-router-dom";

// Importing the components for the different pages
import Frontpage from "./pages/frontpage/frontpage";
import CharacterPage from "./pages/character/character.jsx";

function App() {
  const routes = useRoutes([
    { path: "/", element: <Frontpage /> },
    { path: "/character", element: <CharacterPage /> },
  ]);

  return (
    <>
      <div className="content">{routes}</div>
    </>
  );
}

export default App;
