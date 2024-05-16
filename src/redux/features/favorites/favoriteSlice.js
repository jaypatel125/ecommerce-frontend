import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      if (!state.some((favorite) => favorite._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFromFavorite: (state, action) => {
      return state.filter((favorite) => favorite._id !== action.payload);
    },
    setFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addFavorite, removeFromFavorite, setFavorites } =
  favoriteSlice.actions;

export const selectFavorites = (state) => state.favorites;
export default favoriteSlice.reducer;
