import { IAllIngredients } from "../../utils/interfaces";
import { getIngredients } from "../actions/thunkFunctions";
import reducer, {
  addIngredient,
  removeIngredient,
  addBun,
} from "./allIngredientsReducer";

const initialState: IAllIngredients = {
  ingredients: [
    {
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
    },
    {
      count: 0,
      _id: "2",
      name: "string",
      type: "bun",
      proteins: 12,
      fat: 32,
      carbohydrates: 12,
      calories: 12,
      price: 12,
      image: `string`,
      image_mobile: `string`,
      image_large: `string`,
      __v: 234,
    },
  ],
  isLoading: true,
  hasError: false,
};

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    ingredients: [],
    isLoading: true,
    hasError: false,
  });
});

test("should change counter, +1 for ingredient", () => {
  expect(reducer(initialState, addIngredient({ id: "12" }))).toEqual({
    ingredients: [
      {
        count: 2,
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
      },
      {
        count: 0,
        _id: "2",
        name: "string",
        type: "bun",
        proteins: 12,
        fat: 32,
        carbohydrates: 12,
        calories: 12,
        price: 12,
        image: `string`,
        image_mobile: `string`,
        image_large: `string`,
        __v: 234,
      },
    ],
    isLoading: true,
    hasError: false,
  });
});

test("should change counter, -1 for ingredient", () => {
  expect(reducer(initialState, removeIngredient({ id: "12" }))).toEqual({
    ingredients: [
      {
        count: 0,
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
      },
      {
        count: 0,
        _id: "2",
        name: "string",
        type: "bun",
        proteins: 12,
        fat: 32,
        carbohydrates: 12,
        calories: 12,
        price: 12,
        image: `string`,
        image_mobile: `string`,
        image_large: `string`,
        __v: 234,
      },
    ],
    isLoading: true,
    hasError: false,
  });
});

test("should change counter, +2 for bun ingredient", () => {
  expect(reducer(initialState, addBun({ id: "2" }))).toEqual({
    ingredients: [
      {
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
      },
      {
        count: 2,
        _id: "2",
        name: "string",
        type: "bun",
        proteins: 12,
        fat: 32,
        carbohydrates: 12,
        calories: 12,
        price: 12,
        image: `string`,
        image_mobile: `string`,
        image_large: `string`,
        __v: 234,
      },
    ],
    isLoading: true,
    hasError: false,
  });
});

test("should change ingredients after getIngredients.fulfilled", () => {
  const initialState = {
    ingredients: [],
    isLoading: true,
    hasError: false,
  };

  const ingrsToAdd = [
    {
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
    },
    {
      count: 2,
      _id: "2",
      name: "string",
      type: "bun",
      proteins: 12,
      fat: 32,
      carbohydrates: 12,
      calories: 12,
      price: 12,
      image: `string`,
      image_mobile: `string`,
      image_large: `string`,
      __v: 234,
    },
  ];

  const action = getIngredients.fulfilled(ingrsToAdd, "", undefined, undefined);

  const newState = reducer(initialState, action);

  expect(newState.ingredients).toEqual(ingrsToAdd);
  expect(newState.isLoading).toBe(true);
  expect(newState.hasError).toBe(false);
});
