import AppHeader from "../AppHeader/AppHeader";
import styles from "../IngredientDetails/IngredientDetails.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Ingredient() {
  const { id } = useParams();
  const ingredients = useSelector((state) =>
    state.allIngridients.ingridients.filter((elem) => elem._id === id)
  );
  const ingridient = ingredients[0];

  return (
    ingridient && (
      <div>
        <AppHeader />
        <body className={styles.main}>
          <h1 className="text text_type_main-large">Ingredient details</h1>
          <div>
            <img src={ingridient.image_large} alt={ingridient.name} />

            <p className={`text text_type_main-medium ${styles.middle}`}>
              {ingridient.name}
            </p>

            <div
              className={`${styles.description} pl-25 pr-25 pb-15 ${styles.middle}`}
            >
              <div className="text text_type_main-default text_color_inactive">
                <p>Calories, Kcal</p>
                <p className="text text_type_digits-default">
                  {ingridient.calories}
                </p>
              </div>
              <div className="text text_type_main-default text_color_inactive">
                <p>Proteins, g</p>
                <p className="text text_type_digits-default">
                  {ingridient.proteins}
                </p>
              </div>
              <div className="text text_type_main-default text_color_inactive">
                <p>Fats, g</p>
                <p className="text text_type_digits-default">
                  {ingridient.fat}
                </p>
              </div>
              <div className="text text_type_main-default text_color_inactive">
                <p>Carbohydrates, g</p>
                <p className="text text_type_digits-default">
                  {ingridient.carbohydrates}
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
