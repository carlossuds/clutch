import { Home } from "../pages";

export enum Pages {
  HOME = "HOME",
  CONFIRMATION = "CONFIRMATION",
}

export const PageData = {
  [Pages.HOME]: {
    path: "/",
    element: <Home />,
  },
};
