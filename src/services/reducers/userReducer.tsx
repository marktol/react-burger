import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  getUser,
  refreshToken,
  logout,
  forgotPassword,
  checkUser,
} from "../actions/userFunctions";
import { setCookie, deleteCookie } from "../../utils/utils";
import { IUser } from "../../utils/interfaces";

const initialState: IUser = {
  name: "",
  email: "",
  accessToken: "",
  emailSent: false,
  auth: false,
};

export const userData = createSlice({
  name: "allIngredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
      state.auth = true;

      state.accessToken = action.payload.accessToken.split("Bearer ")[1];
      setCookie("token", state.accessToken);
      setCookie("refreshToken", action.payload.refreshToken);
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.auth = true;
      state.name = action.payload.user.name;
      state.email = action.payload.user.email;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken.split("Bearer ")[1];
      setCookie("token", state.accessToken);
      setCookie("refreshToken", action.payload.refreshToken);
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.accessToken = "";
      state.email = "";
      state.name = "";
      state.auth = false;
      deleteCookie("token");
      deleteCookie("refreshToken");
    });
    builder.addCase(forgotPassword.fulfilled, (state) => {
      state.emailSent = true;
    });
    builder.addCase(checkUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.auth = true;
      }
    });
  },
});

// Action creators are generated for each case reducer function

export default userData.reducer;
