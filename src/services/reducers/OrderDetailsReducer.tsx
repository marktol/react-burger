import { createSlice } from "@reduxjs/toolkit";
import { setOrder } from "../actions/thunkFunctions";

const initialState: { orderNumber: string } = {
  orderNumber: "",
};
export const OrderDetails = createSlice({
  name: "OrderDetails",
  initialState,
  reducers: {
    setOrderNumber: (state, action) => {
      state.orderNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setOrder.fulfilled, (state, action) => {
      console.log(action.payload);

      state.orderNumber = action.payload;
    });
  },
});

export const { setOrderNumber } = OrderDetails.actions;

export default OrderDetails.reducer;
