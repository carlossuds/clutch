import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Confirmation } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/confirmation",
    element: <Confirmation />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
