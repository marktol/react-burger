import { configureStore } from "@reduxjs/toolkit";
import allIngridientsReducer from "./allIngridientsReducer";
import ingredientDetailsReducer from "./IngredientDetailsReducer";
import burgerConstructorReducer from "./BurgerConstructorReducer";
// import { thunkMiddleware } from "redux-thunk";
import { applyMiddleware } from "redux";

import OrderDetailsReducer from "./OrderDetailsReducer";

export const store = configureStore({
  reducer: {
    allIngridients: allIngridientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: OrderDetailsReducer,
  },
  // middleware: [thunkMiddleware],
});
