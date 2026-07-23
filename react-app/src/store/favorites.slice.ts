import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Movie {
  title: string;
  src: string;
  star: string;
}

interface MovieList {
  favorite: Movie[];
}

const initialState: MovieList = {
  favorite: [],
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
  },
});

export const { addFavorite, deleteFavorite, toggleFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
