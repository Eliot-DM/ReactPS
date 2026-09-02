import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  title: string;
  src: string;
  star: string;
}

interface MovieList {
  favorite: Movie[];
  currentUser: string | null;
}

// Загрузка избранного для конкретного пользователя
const loadFavoritesForUser = (username: string | null): Movie[] => {
  if (!username) return [];

  try {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const allFavorites = JSON.parse(storedFavorites);
      return allFavorites[username] || [];
    }
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error);
  }
  return [];
};

// Сохранение избранного для конкретного пользователя
const saveFavoritesForUser = (username: string, favorites: Movie[]) => {
  try {
    const storedFavorites = localStorage.getItem("favorites");
    let allFavorites: Record<string, Movie[]> = {};

    if (storedFavorites) {
      allFavorites = JSON.parse(storedFavorites);
    }

    allFavorites[username] = favorites;
    localStorage.setItem("favorites", JSON.stringify(allFavorites));
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
  }
};

// Middleware для автоматической синхронизации
export const favoritesMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const result = next(action);

    if (
      action.type?.startsWith("favorites/") &&
      action.type !== "favorites/setCurrentUser" &&
      action.type !== "favorites/syncWithUser"
    ) {
      const state = store.getState().favorites;
      if (state.currentUser) {
        saveFavoritesForUser(state.currentUser, state.favorite);
      }
    }

    return result;
  };

const initialState: MovieList = {
  favorite: [],
  currentUser: null,
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Movie>) => {
      const isExists = state.favorite.some(
        (movie) => movie.title === action.payload.title,
      );
      if (!isExists) {
        state.favorite.push(action.payload);
      }
    },

    deleteFavorite: (state, action: PayloadAction<string>) => {
      state.favorite = state.favorite.filter(
        (movie) => movie.title !== action.payload,
      );
    },

    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const index = state.favorite.findIndex(
        (movie) => movie.title === action.payload.title,
      );
      if (index === -1) {
        state.favorite.push(action.payload);
      } else {
        state.favorite.splice(index, 1);
      }
    },

    // Синхронизация с текущим пользователем
    syncWithUser: (state, action: PayloadAction<string | null>) => {
      const username = action.payload;

      // Сохраняем текущие favorites перед сменой пользователя
      if (state.currentUser) {
        saveFavoritesForUser(state.currentUser, state.favorite);
      }

      // Обновляем пользователя и загружаем его favorites
      state.currentUser = username;
      state.favorite = loadFavoritesForUser(username);
    },

    // Очистка при выходе
    clearFavorites: (state) => {
      if (state.currentUser) {
        saveFavoritesForUser(state.currentUser, state.favorite);
      }
      state.favorite = [];
      state.currentUser = null;
    },
  },
});

export const {
  addFavorite,
  deleteFavorite,
  toggleFavorite,
  syncWithUser,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
