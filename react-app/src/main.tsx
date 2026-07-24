import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UserContextProvider } from "./context/user.context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layouts } from "./Page/Layouts/Layouts";
import axios from "axios";
import { PREFIX } from "./helpers/API";
import { RequireAuth } from "./helpers/RequireAuth";
import { Provider } from "react-redux";
import { store } from "./store/store";

const Body = lazy(() => import("./Page/Body/Body"));
const Login = lazy(() => import("./Page/Login/Login"));
const Movie = lazy(() => import("./Page/Movie/Movie"));
const Favorites = lazy(() => import("./Page/Favorites/Favorites"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layouts />
      </RequireAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Загрузка...</div>}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Загрузка...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/movie/:id",
        element: (
          <Suspense fallback={<div>Загрузка...</div>}>
            <Movie />
          </Suspense>
        ),
        loader: async ({ params }) => {
          try {
            const response = await axios.get(`${PREFIX}${params.id}`);
            return response.data;
          } catch (error) {
            console.error("Error loading movie:", error);
            throw new Response("Фильм не найден", { status: 404 });
          }
        },
      },
      {
        path: "/favorites",
        element: (
          <Suspense fallback={<div>Загрузка...</div>}>
            <Favorites />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </UserContextProvider>
  </StrictMode>,
);
