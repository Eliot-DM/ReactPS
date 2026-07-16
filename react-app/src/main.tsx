import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UserContextProvider } from "./context/user.context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Body } from "./Page/Body/Body";
import { Login } from "./Page/Login/Login";
import { Movie } from "./Page/Movie/Movie";
import { Favorites } from "./Page/Favorites/Favorites";
import { Layouts } from "./Page/Layouts/Layouts";
import axios from "axios";
import { PREFIX } from "./helpers/API";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      { path: "/", element: <Body data={[]} /> },
      { path: "/login", element: <Login /> },
      {
        path: "/movie:id",
        element: <Movie />,
        loader: async ({ params }) => {
          const data = await axios.get(`${PREFIX}${params.id}`);
          return data;
        },
      },
      { path: "/favorites", element: <Favorites /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>,
);
