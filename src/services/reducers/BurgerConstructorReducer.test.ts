import reducer, {
  addToBurgerConstructor,
  deleteFromBurgerConstructor,
  updateListBurgerConstructor,
  addBunToBurgerConstructor,
  IBurgerConstructor,
  recalcTotal,
} from "./BurgerConstructorReducer";

const initialState: IBurgerConstructor = {
  ingredients: [
    {
      id: "2",
      item: {
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
    },
  ],
  bun: null,
  totalPrice: 0,
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
];
const id = "1";

const bun = {
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
};

test("should return the initial state BurgerConstructorReducer", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    ingredients: [],
    bun: null,
    totalPrice: 0,
  });
});

test("should add ingr to burger constructor", () => {
  const initialState = {
    ingredients: [],
    bun: null,
    totalPrice: 0,
  };

  const newState = reducer(
    initialState,
    addToBurgerConstructor({ item: ingrsToAdd, id: id })
  );

  expect(newState.ingredients).toEqual([{ item: ingrsToAdd, id: "1" }]);
  expect(newState.bun).toBe(null);
});

test("should update List burger constructor", () => {
  const newState = reducer(
    initialState,
    updateListBurgerConstructor({ newList: [{ item: ingrsToAdd, id: id }] })
  );

  expect(newState.ingredients).toEqual([{ item: ingrsToAdd, id: "1" }]);
  expect(newState.bun).toBe(null);
});

test("should add bun to burger constructor", () => {
  const initialState = {
    ingredients: [],
    bun: null,
    totalPrice: 0,
  };
  const newState = reducer(
    initialState,
    addBunToBurgerConstructor({ item: bun })
  );

  expect(newState.ingredients).toEqual([]);
  expect(newState.bun).toEqual(bun);
});
