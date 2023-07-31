import { createSlice } from "@reduxjs/toolkit";
import { IWs } from "../../utils/interfaces";

const initialState: IWs = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const ws = createSlice({
  name: "wsReducer",
  initialState,
  reducers: {
    connectionSucces: (state) => {
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    },

    connectionError: (state, action?) => {
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    },

    connectionClosed: (state) => {
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        orders: [],
      };
    },

    getMessage: (state, action) => {
      const { total, orders, totalToday } = action.payload.payload;
      return {
        ...state,
        error: undefined,
        orders: orders,
        total: total,
        totalToday: totalToday,
      };
    },
  },
});
export const {
  connectionSucces,
  connectionError,
  connectionClosed,
  getMessage,
} = ws.actions;
export default ws.reducer;
