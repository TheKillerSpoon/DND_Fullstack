import { useRoutes } from "react-router-dom";

// Importing the components for the different pages
import Frontpage from "./pages/frontpage/frontpage";

function App() {
  const routes = useRoutes([{ path: "/", element: <Frontpage /> }]);

  return (
    <>
      <div className="content">{routes}</div>
    </>
  );
}

export default App;
