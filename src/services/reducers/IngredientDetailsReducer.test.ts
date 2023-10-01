import { IIngredient, IIngredientDetails } from "../../utils/interfaces";
import reducer, { addIngredientDetails } from "./IngredientDetailsReducer";

const initialState: IIngredientDetails = {
  ingredient: {} as IIngredient,
};

const ingrsToAdd: IIngredient = {
  count: 1,
  _id: "12",
  name: "string",
  type: "string",
  proteins: 12,
  fat: 32,
  carbohydrates: 12,
  calories: 12,
  price: 12,
  image: `string`,
  image_mobile: `string`,
  image_large: `string`,
  __v: 234,
};

test("should return the initial state IngredientDetailsReducer", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    ingredient: {} as IIngredient,
  });
});

test("should update List burger constructor", () => {
  const newState = reducer(initialState, addIngredientDetails(ingrsToAdd));

  expect(newState.ingredient).toEqual(ingrsToAdd);
});
