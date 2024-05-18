import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  products: [],
  checked: [],
  radio: [],
  brandCheckBoxes: {},
  checkedBrands: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    setChecked(state, action) {
      state.checked = action.payload;
    },
    setRadio(state, action) {
      state.radio = action.payload;
    },
    setBrandCheckBoxes(state, action) {
      state.brandCheckBoxes = action.payload;
    },
    setCheckedBrands(state, action) {
      state.checkedBrands = action.payload;
    },
  },
});

export const {
  setCategories,
  setProducts,
  setChecked,
  setRadio,
  setBrandCheckBoxes,
  setCheckedBrands,
} = shopSlice.actions;

export default shopSlice.reducer;
