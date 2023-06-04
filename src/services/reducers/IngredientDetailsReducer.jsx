import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingridient: {},
};

export const ingredientDetails = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    addIngridientDetails: (state, action) => {
      state.ingridient = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addIngridientDetails } = ingredientDetails.actions;

export default ingredientDetails.reducer;
