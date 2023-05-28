import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingridients: [],
  bun: null,
  totalPrice: 0,
};

const recalcTotal = (state) => {
  const bunPrice = state.bun ? state.bun.price * 2 : 0;
  state.totalPrice =
    state.ingridients
      .map((ingredient) => ingredient.item.price)
      .reduce((partialSum, a) => partialSum + a, 0) + bunPrice;
};

export const burgerConstructor = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addToBurgerConstructor: (state, action) => {
      const { item, id } = action.payload; // Добавляем эти строки для определения переменных item и id
      state.ingridients.push({ item, id });
      recalcTotal(state);
    },
    deleteFromBurgerConstructor: (state, action) => {
      const { id } = action.payload;
      state.ingridients = state.ingridients.filter((item) => item.id !== id);
      recalcTotal(state);
    },
    updateListBurgerConstructor: (state, action) => {
      const { newList } = action.payload;
      state.ingridients = [...newList];
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
