const NORMA_API = "https://norma.nomoreparties.space/api";

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngredients() {
  return fetch(`${NORMA_API}/ingredients`).then(checkReponse);
}

export function setOrder(ingridients) {
  return fetch(`${NORMA_API}/orders`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      ingredients: ingridients,
    }),
  }).then(checkReponse);
}
