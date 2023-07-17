import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../actions/thunkFunctions";
import { IAllIngredients, IIngredient } from "../../utils/interfaces";

const initialState: IAllIngredients = {
  ingredients: [],
  isLoading: true,
  hasError: false,
};

export const allIngredients = createSlice({
  name: "allIngredients",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients = state.ingredients.map((ingr: IIngredient) => {
        if (ingr._id === action.payload.id) ingr.count += 1;
        return ingr;
      });
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.map((ingr) => {
        if (ingr._id === action.payload.id) ingr.count -= 1;

        return ingr;
      });
    },
    addBun: (state, action) => {
      state.ingredients = state.ingredients.map((ingr) => {
        if (ingr._id === action.payload.id) ingr.count = 2;
        if (ingr.type === "bun" && ingr._id !== action.payload.id)
          ingr.count = 0;

        return ingr;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload.map((ingredient: IIngredient) => {
        ingredient.count = 0;
        return ingredient;
      });
    });
  },
});

// Action creators are generated for each case reducer function
export const { addIngredient, removeIngredient, addBun } =
  allIngredients.actions;

export default allIngredients.reducer;
