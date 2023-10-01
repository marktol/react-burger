import { IIngredient, IWs } from "../../utils/interfaces";
import reducer, {
  connectionSucces,
  connectionError,
  connectionClosed,
  getMessage,
} from "./WSReducer";

const initialState: IWs = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

const initialStateWData: IWs = {
  wsConnected: true,
  orders: [
    {
      length: 1,
      createdAt: "string",
      ingredients: ["1", "2", "3"],
      name: "string",
      number: 12,
      status: "string",
      updatedAt: "string",
      _id: "string",
    },
  ],
  total: 1,
  totalToday: 1,
};

test("should return the initial state WSReducer", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
  });
});

test("should add error if connection has an error", () => {
  const newState = reducer(initialState, connectionError({ error: "error" }));

  expect(newState.error).toEqual({ error: "error" });
  expect(newState.wsConnected).toEqual(false);
});

test("should change a wsConnected to true after succes connection", () => {
  const newState = reducer(initialState, connectionSucces());

  expect(newState.error).toEqual(undefined);
  expect(newState.wsConnected).toEqual(true);
});

test("should change a wsConnected and reset data when connection closed", () => {
  const newState = reducer(initialStateWData, connectionClosed());

  expect(newState.error).toEqual(undefined);
  expect(newState.wsConnected).toEqual(false);
  expect(newState.total).toEqual(0);
  expect(newState.totalToday).toEqual(0);
});

test("should change a data after messege", () => {
  const newState = reducer(
    initialState,
    getMessage({
      payload: {
        total: 1,
        orders: [
          {
            length: 1,
            createdAt: "string",
            ingredients: ["1", "2", "3"],
            name: "string",
            number: 12,
            status: "string",
            updatedAt: "string",
            _id: "string",
          },
        ],

        totalToday: 1,
      },
    })
  );

  expect(newState.error).toEqual(undefined);
  expect(newState.orders).toEqual([
    {
      length: 1,
      createdAt: "string",
      ingredients: ["1", "2", "3"],
      name: "string",
      number: 12,
      status: "string",
      updatedAt: "string",
      _id: "string",
    },
  ]);
  expect(newState.total).toEqual(1);
  expect(newState.totalToday).toEqual(1);
});
