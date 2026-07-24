// store.ts или где вы конфигурируете store
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer, { favoritesMiddleware } from "./favorites.slice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    // ... другие редюсеры
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(favoritesMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
