import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  title: string;
  src: string;
  star: string;
}

interface MovieList {
  favorite: Movie[];
  currentUser: string | null; // Добавляем поле для отслеживания текущего пользователя
}

// Функция для загрузки избранного из localStorage
const loadFavoritesFromStorage = (): Movie[] => {
  try {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      const allFavorites = JSON.parse(storedFavorites);
      // Возвращаем избранное для всех пользователей
      return allFavorites;
    }
  } catch (error) {
    console.error("Error loading favorites from localStorage:", error);
  }
  return [];
};

// Функция для сохранения избранного в localStorage
const saveFavoritesToStorage = (
  favorites: Movie[],
  username: string | null,
) => {
  try {
    if (username) {
      const storedFavorites = localStorage.getItem("favorites");
      let allFavorites: Record<string, Movie[]> = {};

      if (storedFavorites) {
        allFavorites = JSON.parse(storedFavorites);
      }

      // Сохраняем избранное для конкретного пользователя
      allFavorites[username] = favorites;
      localStorage.setItem("favorites", JSON.stringify(allFavorites));
    }
  } catch (error) {
    console.error("Error saving favorites to localStorage:", error);
  }
};

// Middleware для автоматической синхронизации с localStorage
export const favoritesMiddleware =
  (store: any) => (next: any) => (action: any) => {
    const result = next(action);

    // Проверяем, что действие относится к favorites слайсу
    if (
      action.type?.startsWith("favorites/") &&
      action.type !== "favorites/setCurrentUser"
    ) {
      const state = store.getState().favorites;
      if (state.currentUser) {
        saveFavoritesToStorage(state.favorite, state.currentUser);
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

    // Новый action для установки текущего пользователя и загрузки его избранного
    setCurrentUser: (state, action: PayloadAction<string | null>) => {
      const newUsername = action.payload;

      // Сохраняем текущее избранное перед сменой пользователя
      if (state.currentUser) {
        const storedFavorites = localStorage.getItem("favorites");
        let allFavorites: Record<string, Movie[]> = {};

        if (storedFavorites) {
          allFavorites = JSON.parse(storedFavorites);
        }

        allFavorites[state.currentUser] = state.favorite;
        localStorage.setItem("favorites", JSON.stringify(allFavorites));
      }

      // Устанавливаем нового пользователя
      state.currentUser = newUsername;

      // Загружаем избранное нового пользователя
      if (newUsername) {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
          const allFavorites = JSON.parse(storedFavorites);
          state.favorite = allFavorites[newUsername] || [];
        } else {
          state.favorite = [];
        }
      } else {
        state.favorite = [];
      }
    },

    // Очистка избранного при выходе пользователя
    clearFavorites: (state) => {
      state.favorite = [];
      state.currentUser = null;
    },
  },
});

export const {
  addFavorite,
  deleteFavorite,
  toggleFavorite,
  setCurrentUser,
  clearFavorites,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
