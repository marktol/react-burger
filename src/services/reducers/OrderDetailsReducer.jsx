import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderNumber: 0,
};
export const OrderDetails = createSlice({
  name: "OrderDetails",
  initialState,
  reducers: {
    setOrderNumber: (state, action) => {
      state.orderNumber = action.payload;
    },
  },
});

export const { setOrderNumber } = OrderDetails.actions;

export default OrderDetails.reducer;
