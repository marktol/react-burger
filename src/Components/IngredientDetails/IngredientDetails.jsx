import styles from "./IngredientDetails.module.css";
import checked from "../../Images/done.png";

const IngredientDetails = () => {
  return (
    <>
      <p
        className={`text text_type_digits-large ${styles.middle} ${styles.orderId} ml-25 mr-25 mt-4`}
      >
        034536
      </p>
      <p
        className={`text text_type_digits-default ${styles.middle} ${styles.orderIdText} ml-25 mr-25 mt-8`}
      >
        order id
      </p>
      <div className={`${styles.middle} ${styles.checkIcon} mt-15`}>
        <img src={checked} alt="Checked" />
      </div>
      <p className={`text text_type_digits-small ${styles.middle} mt-15`}>
        Your order is being prepared
      </p>
      <p
        className={`text text_type_digits-small text_color_inactive ${styles.middle} mt-2`}
      >
        Wait for readiness at the orbital station
      </p>
    </>
  );
};

export default IngredientDetails;
