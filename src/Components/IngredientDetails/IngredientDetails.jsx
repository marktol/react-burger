import styles from "./IngredientDetails.module.css";
import { PropTypes } from "prop-types";

const IngredientDetails = (props) => {
  return (
    <div>
      <img
        className={`${styles.imageIngr} pl-30 pr-30`}
        src={props.data.image_large}
        alt={props.data.name}
      />

      <p className={`text text_type_main-medium ${styles.middle}`}>
        {props.data.name}
      </p>

      <div
        className={`${styles.description} pl-25 pr-25 pb-15 ${styles.middle}`}
      >
        <div className="text text_type_main-default text_color_inactive">
          <p>Calories, Kcal</p>
          <p className="text text_type_digits-default">{props.data.calories}</p>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <p>Proteins, g</p>
          <p className="text text_type_digits-default">{props.data.proteins}</p>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <p>Fats, g</p>
          <p className="text text_type_digits-default">{props.data.fat}</p>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <p>Carbohydrates, g</p>
          <p className="text text_type_digits-default">
            {props.data.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;

IngredientDetails.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
};
