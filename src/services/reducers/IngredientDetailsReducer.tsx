import { createSlice } from "@reduxjs/toolkit";
import { IIngredient, IIngredientDetails } from "../../utils/interfaces";

const initialState: IIngredientDetails = {
  ingredient: {} as IIngredient,
};

export const ingredientDetails = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    addIngredientDetails: (state, action) => {
      state.ingredient = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addIngredientDetails } = ingredientDetails.actions;

export default ingredientDetails.reducer;
