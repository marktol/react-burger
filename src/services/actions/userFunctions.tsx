import { createAsyncThunk } from "@reduxjs/toolkit";
import { NORMA_API, checkReponse } from "./thunkFunctions";
import { getCookie } from "../../utils/utils";

export const register = createAsyncThunk(
  "data/register",
  async ({
    emailUser,
    passwordUser,
    nameUser,
  }: {
    emailUser: string;
    passwordUser: string;
    nameUser: string;
  }) => {
    const response = await fetch(`${NORMA_API}/auth/register`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: emailUser,
        name: nameUser,
        password: passwordUser,
      }),
    }).then(checkReponse);

    const data = response;
    return data;
  }
);

export const forgotPassword = createAsyncThunk(
  "data/forgotPassword",
  async (userEmail: string) => {
    const response = await fetch(`${NORMA_API}/password-reset`, {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
      }),
    }).then(checkReponse);

    const data = response;
    return data;
  }
);

export const passwordReset = createAsyncThunk(
  "data/passwordReset",
  async ({
    userPassword,
    userToken,
  }: {
    userPassword: string;
    userToken: string;
  }) => {
    const response = await fetch(`${NORMA_API}/password-reset/reset`, {
      method: "POST",
      body: JSON.stringify({
        password: userPassword,
        token: userToken,
      }),
    }).then(checkReponse);

    const data = response;
    return data;
  }
);

export const login = createAsyncThunk(
  "data/login",
  async ({
    emailUser,
    passwordUser,
  }: {
    emailUser: string;
    passwordUser: string;
  }) => {
    const response = await fetch(`${NORMA_API}/auth/login`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: emailUser,
        password: passwordUser,
      }),
    }).then(checkReponse);

    const data = response;
    return data;
  }
);

export const getUser = createAsyncThunk("auth/user", async (token: string) => {
  const userToken = "Bearer " + token;
  const response = await fetch(`${NORMA_API}/auth/user`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: userToken,
    },
  }).then(checkReponse);

  const data = response;
  return data;
});

export const logout = createAsyncThunk("auth/logout", async (token: string) => {
  const response = await fetch(`${NORMA_API}/auth/logout`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      token: token,
    }),
  }).then(checkReponse);

  const data = response;
  return data;
});

export const refreshToken = createAsyncThunk(
  "/auth/token",
  async (token: string) => {
    const response = await fetch(`${NORMA_API}/auth/token`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: token,
      }),
    }).then(checkReponse);

    const data = response;

    return data;
  }
);

export const checkUser = createAsyncThunk("auth/checkUser", async () => {
  const userToken = "Bearer " + getCookie("token");
  const response = await fetch(`${NORMA_API}/auth/user`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: userToken,
    },
  });

  let data: boolean = true;
  if (response.ok) data = true;
  else data = false;
  return data;
});
