import { createAsyncThunk } from "@reduxjs/toolkit";
export const NORMA_API = "https://norma.nomoreparties.space/api";

export const checkReponse = (res: any) => {
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
    console.log(ingredientsId);
    const response = await fetch(`${NORMA_API}/orders`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
