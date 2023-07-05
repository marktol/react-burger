import styles from "./IngredientDetails.module.css";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IStore } from "../../services/reducers/store";

const IngredientDetails = () => {
  const { id } = useParams();

  const ingredients = useSelector((state: IStore) =>
    state.allIngredients.ingredients.filter((elem) => elem._id === id)
  );
  const ingredient = ingredients[0];

  return (
    <div>
      <img
        className={`${styles.imageIngr} pl-30 pr-30`}
        src={ingredient.image_large}
        alt={ingredient.name}
      />

      <p className={`text text_type_main-medium ${styles.middle}`}>
        {ingredient.name}
      </p>

      <div
        className={`${styles.description} pl-25 pr-25 pb-15 ${styles.middle}`}
      >
        <div className="text text_type_main-default text_color_inactive">
          <p>Calories, Kcal</p>
          <p className="text text_type_digits-default">{ingredient.calories}</p>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <p>Proteins, g</p>
          <p className="text text_type_digits-default">{ingredient.proteins}</p>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <p>Fats, g</p>
          <p className="text text_type_digits-default">{ingredient.fat}</p>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <p>Carbohydrates, g</p>
          <p className="text text_type_digits-default">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
