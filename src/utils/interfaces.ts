export interface IIngredient {
  count: number;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IBurgerIngredient {
  id: string;
  item: IIngredient;
}
export interface IAllIngredients {
  ingredients: Array<IIngredient>;
  isLoading: boolean;
  hasError: boolean;
}
export interface IIngredientDetails {
  ingredient: IIngredient;
}
export interface IUser {
  name: string;
  email: string;
  accessToken: string;
  emailSent: boolean;
  auth: boolean;
}

export interface IOrder {
  length: number;
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IWs {
  wsConnected: boolean;
  orders: Array<IOrder> | null;
  total: number;
  totalToday: number;
  error?: Event;
}
