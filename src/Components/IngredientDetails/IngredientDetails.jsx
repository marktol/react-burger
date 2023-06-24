import styles from "./IngredientDetails.module.css";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IngredientDetails = () => {
  const { id } = useParams();

  const ingredients = useSelector((state) =>
    state.allIngridients.ingridients.filter((elem) => elem._id === id)
  );
  const ingridient = ingredients[0];

  return (
    <div>
      <img
        className={`${styles.imageIngr} pl-30 pr-30`}
        src={ingridient.image_large}
        alt={ingridient.name}
      />

      <p className={`text text_type_main-medium ${styles.middle}`}>
        {ingridient.name}
      </p>

      <div
        className={`${styles.description} pl-25 pr-25 pb-15 ${styles.middle}`}
      >
        <div className="text text_type_main-default text_color_inactive">
          <p>Calories, Kcal</p>
          <p className="text text_type_digits-default">{ingridient.calories}</p>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <p>Proteins, g</p>
          <p className="text text_type_digits-default">{ingridient.proteins}</p>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <p>Fats, g</p>
          <p className="text text_type_digits-default">{ingridient.fat}</p>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <p>Carbohydrates, g</p>
          <p className="text text_type_digits-default">
            {ingridient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
