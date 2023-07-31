import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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
  IWs,
} from "../../utils/interfaces";
import { socketMiddleware } from "../actions/socketMiddleware";
import wsReducer from "./WSReducer";

export interface IStore {
  allIngredients: IAllIngredients;
  ingredientDetails: IIngredientDetails;
  burgerConstructor: IBurgerConstructor;
  orderDetails: { orderNumber: string };
  userData: IUser;
  ws: IWs;
}

const rootReducer = {
  allIngredients: allIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: OrderDetailsReducer,
  userData: userDataReducer,
  ws: wsReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsReducer)),
});
