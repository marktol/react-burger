import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IBurgerIngredient, IIngredient } from "../../utils/interfaces";

export interface IBurgerConstructor {
  ingredients: Array<IBurgerIngredient>;
  bun: IIngredient | null;
  totalPrice: number;
}

const initialState: IBurgerConstructor = {
  ingredients: [],
  bun: null,
  totalPrice: 0,
};

const recalcTotal = (state: IBurgerConstructor) => {
  const bunPrice = state.bun ? state.bun.price * 2 : 0;

  state.totalPrice =
    state.ingredients
      .map((ingredient) => ingredient.item.price)
      .reduce((partialSum, a) => partialSum + a, 0) + bunPrice;
};

export const burgerConstructor = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addToBurgerConstructor: (state, action) => {
      state.ingredients.push({
        item: action.payload.item,
        id: action.payload.id,
      });

      recalcTotal(state);
    },
    deleteFromBurgerConstructor: (state, action) => {
      const { id } = action.payload;
      state.ingredients = state.ingredients.filter((item) => item.id !== id);
      recalcTotal(state);
    },
    updateListBurgerConstructor: (state, action) => {
      const { newList } = action.payload;
      state.ingredients = [...newList];
      recalcTotal(state);
    },
    addBunToBurgerConstructor: (state, action) => {
      const { item } = action.payload; // Добавляем эти строки для определения переменных item и id
      state.bun = item;
      recalcTotal(state);
    },
  },
});

export const {
  addToBurgerConstructor,
  deleteFromBurgerConstructor,
  updateListBurgerConstructor,
  addBunToBurgerConstructor,
} = burgerConstructor.actions;

export default burgerConstructor.reducer;
