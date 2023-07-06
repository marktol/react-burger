import { IStore } from "../services/reducers/store";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IngredientComponent } from "../Components/IngredientDetails/IngredientDetails";

function Ingredient() {
  const { id } = useParams();
  const ingredients = useSelector((state: IStore) =>
    state.allIngredients.ingredients.filter((elem) => elem._id === id)
  );
  const ingredient = ingredients[0];

  return (
    ingredient && <IngredientComponent ingredient={ingredient} page={true} />
  );
}

export default Ingredient;
