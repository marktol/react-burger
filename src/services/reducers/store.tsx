import { configureStore } from "@reduxjs/toolkit";
import allIngredientsReducer from "./allIngredientsReducer";
import ingredientDetailsReducer from "./IngredientDetailsReducer";
import burgerConstructorReducer, {
  IBurgerConstructor,
} from "./BurgerConstructorReducer";
import userDataReducer from "./userReducer";

import OrderDetailsReducer from "./OrderDetailsReducer";
import {
  IAllIngredients,
  IIngredientDetails,
  IUser,
} from "../../utils/interfaces";

export interface IStore {
  allIngredients: IAllIngredients;
  ingredientDetails: IIngredientDetails;
  burgerConstructor: IBurgerConstructor;
  orderDetails: { orderNumber: string };
  userData: IUser;
}

export const store = configureStore({
  reducer: {
    allIngredients: allIngredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: OrderDetailsReducer,
    userData: userDataReducer,
  },
});
