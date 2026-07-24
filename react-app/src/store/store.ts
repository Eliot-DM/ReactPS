import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import favoritesReducer, { favoritesMiddleware } from "./favorites.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
