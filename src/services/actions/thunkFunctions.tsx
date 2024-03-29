import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/utils";
export const NORMA_API = "https://norma.nomoreparties.space/api";

interface ApiResponse {
  ok: boolean;
  json: () => Promise<any>;
}

export const checkReponse = (res: ApiResponse) => {
  return res.ok
    ? res.json()
    : res.json().then((err: any) => Promise.reject(err));
};

export const getIngredients = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch(`${NORMA_API}/ingredients`).then(checkReponse);

  const data = response.data;
  return data;
});

export const setOrder = createAsyncThunk<string, Array<string>>(
  "data/setOrder",
  async (ingredientsId) => {
    const response = await fetch(`${NORMA_API}/orders`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      method: "POST",
      body: JSON.stringify({
        ingredients: ingredientsId,
      }),
    }).then(checkReponse);

    const data = response.order.number;

    return data;
  }
);
