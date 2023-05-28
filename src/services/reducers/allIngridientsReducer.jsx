import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingridients: [],
  isLoading: true,
  hasError: false,
};

export const allIngridients = createSlice({
  name: "allIngridients",
  initialState,
  reducers: {
    addIngridients: (state, action) => {
      state.ingridients = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addIngridients } = allIngridients.actions;

export default allIngridients.reducer;
