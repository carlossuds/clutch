import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageData } from "./enums";

const router = createBrowserRouter(Object.values(PageData));

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
