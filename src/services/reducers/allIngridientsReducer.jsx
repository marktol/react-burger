import { createSlice } from "@reduxjs/toolkit";
import { getIngredients } from "../actions/thunkFunctions";

const initialState = {
  ingridients: [],
  isLoading: true,
  hasError: false,
};

export const allIngridients = createSlice({
  name: "allIngridients",
  initialState,
  reducers: {
    addIngridient: (state, action) => {
      state.ingridients = state.ingridients.map((ingr) => {
        if (ingr._id === action.payload.id) ingr.count += 1;
        return ingr;
      });
    },
    removeIngridient: (state, action) => {
      state.ingridients = state.ingridients.map((ingr) => {
        if (ingr._id === action.payload.id) ingr.count -= 1;
        console.log(action.payload.id);
        return ingr;
      });
    },
    addBun: (state, action) => {
      state.ingridients = state.ingridients.map((ingr) => {
        if (ingr._id === action.payload.id) ingr.count = 2;
        if (ingr.type === "bun" && ingr._id !== action.payload.id)
          ingr.count = 0;
        console.log(action.payload.id);
        return ingr;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingridients = action.payload.map((ingridient) => {
        ingridient.count = 0;
        return ingridient;
      });
    });
  },
});

// Action creators are generated for each case reducer function
export const { addIngridients, addIngridient, removeIngridient, addBun } =
  allIngridients.actions;

export default allIngridients.reducer;
