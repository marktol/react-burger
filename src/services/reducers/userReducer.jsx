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

const initialState = {
  name: "",
  email: "",
  accessToken: "",
  emailSent: false,
  auth: false,
};

export const userData = createSlice({
  name: "allIngridients",
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
      deleteCookie("token");
      deleteCookie("refreshToken");
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.emailSent = true;
    });
    builder.addCase(checkUser.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { logIn } = userData.actions;

export default userData.reducer;
