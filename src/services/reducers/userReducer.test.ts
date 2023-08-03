import reducer from "./userReducer";
import {
  login,
  getUser,
  refreshToken,
  logout,
  forgotPassword,
  checkUser,
} from "../actions/userFunctions";
import { IUser } from "../../utils/interfaces";

import "jsdom-global/register";

const mockDocument = {
  _cookie: "",
  get cookie() {
    return this._cookie;
  },
  set cookie(value) {
    this._cookie = value;
  },
};

Object.defineProperty(global, "document", { value: mockDocument });

const initialState: IUser = {
  name: "",
  email: "",
  accessToken: "",
  emailSent: false,
  auth: false,
};

const initialStateUser: IUser = {
  name: "asd",
  email: "asd@asd.asd",
  accessToken: "asdasdasd",
  emailSent: false,
  auth: true,
};

test("should return the initial state user reducer", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    name: "",
    email: "",
    accessToken: "",
    emailSent: false,
    auth: false,
  });
});

test("should set data login.fulfilled", () => {
  const payload = {
    user: {
      name: "qq",
      email: "q@q.q",
    },
    accessToken: "Bearer token",
    refreshToken: "token",
  };

  const action = login.fulfilled(payload, "", {
    emailUser: "",
    passwordUser: "",
  });
  const newState = reducer(initialState, action);

  expect(newState.name).toEqual("qq");
  expect(newState.email).toEqual("q@q.q");
  expect(newState.auth).toBe(true);
});

test("should set data getUser.fulfilled", () => {
  const payload = {
    user: {
      name: "qq",
      email: "q@q.q",
    },
    accessToken: "Bearer token",
    refreshToken: "token",
  };

  const action = getUser.fulfilled(payload, "", "");
  const newState = reducer(initialState, action);

  expect(newState.name).toEqual("qq");
  expect(newState.email).toEqual("q@q.q");
  expect(newState.auth).toBe(true);
});

test("should reset data after logout", () => {
  const payload = {
    user: {
      name: "qq",
      email: "q@q.q",
    },
    accessToken: "Bearer token",
    refreshToken: "token",
  };

  const action = logout.fulfilled(payload, "", "");
  const newState = reducer(initialStateUser, action);

  expect(newState.name).toEqual("");
  expect(newState.email).toEqual("");
  expect(newState.accessToken).toEqual("");
  expect(newState.auth).toBe(false);
});

test("should set data if user forgotPassword", () => {
  const action = forgotPassword.fulfilled("", "", "");
  const newState = reducer(initialState, action);

  expect(newState.emailSent).toBe(true);
});

test("should set false in auth if user doesnt login", () => {
  const action = checkUser.fulfilled(false, "");
  const newState = reducer(initialState, action);

  expect(newState.auth).toBe(false);
});

test("should update accessToken after refreshing token", () => {
  const action = refreshToken.fulfilled({ accessToken: "Bearer qwe" }, "", "");
  const newState = reducer(initialState, action);

  expect(newState.accessToken).toBe("qwe");
});
