import styles from "./OrderDetails.module.css";
import checked from "../../Images/done.png";

import { useSelector } from "react-redux";
import { IStore } from "../../services/reducers/store";

import { BallTriangle } from "react-loader-spinner";

const OrderDetails = () => {
  const orderNumber = useSelector(
    (state: IStore) => state.orderDetails.orderNumber
  );

  return (
    <>
      {orderNumber ? (
        <>
          <p
            className={`text text_type_digits-large ${styles.middle} ${styles.orderId} ml-25 mr-25 mt-4`}
          >
            {orderNumber}
          </p>

          <p
            className={`text text_type_main-default ${styles.middle} ${styles.orderIdText} ml-25 mr-25 mt-8`}
          >
            order id
          </p>
          <div className={`${styles.middle} ${styles.checkIcon} mt-15`}>
            <img src={checked} alt="Checked" />
          </div>
          <p className={`text text_type_main-small ${styles.middle} mt-15`}>
            Your order is being prepared
          </p>
          <p
            className={`text text_type_main-small text_color_inactive ${styles.middle} mt-2  mb-30`}
          >
            Wait for readiness at the orbital station
          </p>
        </>
      ) : (
        <BallTriangle
          wrapperClass={styles.loader}
          height="100"
          width="100"
          color="white"
          ariaLabel="three-dots-loading"
        />
      )}
    </>
  );
};

export default OrderDetails;
