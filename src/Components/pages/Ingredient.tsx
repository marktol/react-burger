import { IStore } from "../../services/reducers/store";
import AppHeader from "../AppHeader/AppHeader";
import styles from "../IngredientDetails/IngredientDetails.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Ingredient() {
  const { id } = useParams();
  const ingredients = useSelector((state: IStore) =>
    state.allIngredients.ingredients.filter((elem) => elem._id === id)
  );
  const ingredient = ingredients[0];

  return (
    ingredient && (
      <div>
        <AppHeader />
        <body className={`${styles.main} mt-25`}>
          <h1 className={`text text_type_main-large ${styles.middle}`}>
            Ingredient details
          </h1>
          <div>
            <div className={styles.ingrDiscription}>
              <img src={ingredient.image_large} alt={ingredient.name} />
            </div>

            <p className={`text text_type_main-medium ${styles.middle}`}>
              {ingredient.name}
            </p>

            <div className={`${styles.ingrDiscription}  `}>
              <div
                className={`text text_type_main-default text_color_inactive ${styles.middle}`}
              >
                <p>Calories, Kcal</p>
                <p className="text text_type_digits-default">
                  {ingredient.calories}
                </p>
              </div>
              <div
                className={`text text_type_main-default text_color_inactive ${styles.middle} ml-4`}
              >
                <p>Proteins, g</p>
                <p className="text text_type_digits-default">
                  {ingredient.proteins}
                </p>
              </div>
              <div
                className={`text text_type_main-default text_color_inactive ${styles.middle} ml-4`}
              >
                <p>Fats, g</p>
                <p className="text text_type_digits-default">
                  {ingredient.fat}
                </p>
              </div>
              <div
                className={`text text_type_main-default text_color_inactive ${styles.middle} ml-4`}
              >
                <p>Carbohydrates, g</p>
                <p className="text text_type_digits-default">
                  {ingredient.carbohydrates}
                </p>
              </div>
            </div>
          </div>
        </body>
      </div>
    )
  );
}

export default Ingredient;
