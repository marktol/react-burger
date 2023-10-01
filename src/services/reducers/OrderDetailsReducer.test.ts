import { setOrder } from "../actions/thunkFunctions";
import reducer, { setOrderNumber } from "./OrderDetailsReducer";

const initialState = { orderNumber: "" };
const orderNumber = "123";

test("should return the initial state OrderDetailsReducer", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    orderNumber: "",
  });
});

test("should set order number after setOrder.fulfilled", () => {
  const action = setOrder.fulfilled(orderNumber, "", []);
  const newState = reducer(initialState, action);

  expect(newState.orderNumber).toEqual(orderNumber);
});

test("should set order number", () => {
  const newState = reducer(initialState, setOrderNumber(orderNumber));

  expect(newState.orderNumber).toEqual(orderNumber);
});
