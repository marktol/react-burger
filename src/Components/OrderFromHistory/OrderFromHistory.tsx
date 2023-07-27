import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IStore } from "../../services/reducers/store";
import { IIngredient, IOrder } from "../../utils/interfaces";
import { Modal } from "../Modal/Modal";
import styles from "./OrderFromHistory.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { WS_CONNECTION_START } from "../../services/actions/socketMiddleware";

export const OrderFromHistory = () => {
  const ingredientsFromStore = useSelector(
    (state: IStore) => state.allIngredients.ingredients
  );
  const { id } = useParams();
  const orderId = parseInt(id || "", 10);
  const orderFromStore = useSelector((state: IStore) =>
    state.ws.orders?.filter((elem) => elem?.number == orderId)
  );
  const order: IOrder | undefined = orderFromStore?.[0];

  const priceCulc = () => {
    let price = 0;
    for (let i = 0; i < ingridientsInOrder.length; i++) {
      price +=
        ingridientsInOrder[i].ingr.type === "bun"
          ? ingridientsInOrder[i].ingr.price * 2
          : ingridientsInOrder[i].ingr.price * ingridientsInOrder[i].count;
    }
    return price;
  };

  const ingrsInOrder = () => {
    let newArr: any = [];
    for (let ingr = 0; ingr < order?.ingredients?.length!; ingr++) {
      if (order?.ingredients[ingr] != null) {
        newArr.push(
          ingredientsFromStore.find(
            (elem) => elem._id == order.ingredients[ingr]
          )
        );
      }
    }
    return newArr;
  };

  const ingridientsInOrder: Array<{ ingr: IIngredient; count: number }> =
    ingrsInOrder().reduce(
      (
        acc: { ingr: IIngredient; count: number }[],
        currentValue: IIngredient
      ) => {
        const existingIngredient = acc.find(
          (item) => item.ingr.name === currentValue.name
        );

        if (!existingIngredient) {
          if (currentValue.type === "bun") {
            acc.push({ ingr: currentValue, count: 2 });
          } else {
            acc.push({ ingr: currentValue, count: 1 });
          }
        } else {
          existingIngredient.count++;
        }
        return acc;
      },
      []
    );
  const price = priceCulc();

  return (
    <>
      <OrderHistoryComponent
        page={false}
        order={order!}
        orderId={orderId}
        price={price}
        ingridientsInOrder={ingridientsInOrder}
      />
    </>
  );
};

export const OrderHistoryComponent = ({
  order,
  orderId,
  price,
  ingridientsInOrder,
  page,
}: {
  order: IOrder;
  orderId: number;
  price: number;
  ingridientsInOrder: Array<{ ingr: IIngredient; count: number }>;
  page: boolean;
}) => {
  if (!page) {
    return (
      <>
        <Modal title={`#${orderId}`}>
          <div>
            <p className="text text_type_main-medium mt-10 ml-10">
              {order?.name}
            </p>
          </div>
          <div>
            <p
              className={`${styles.statusColor} text text_type_main-small mt-3 ml-10`}
            >
              {order?.status}
            </p>
          </div>
          <div>
            <p className="text text_type_main-medium mt-15 ml-10">
              Ingredients:
            </p>
          </div>
          <div className={`custom-scroll mt-6  ${styles.scrollDiv}`}>
            {ingridientsInOrder.map(
              (elem: { ingr: IIngredient; count: number }) => (
                <div key={elem.ingr._id} className={styles.description}>
                  <div>
                    <img src={elem.ingr.image_mobile} alt={elem.ingr.name} />
                  </div>
                  <div className="text text_type_main-small mt-6">
                    {elem.ingr.name}
                  </div>
                  <div className={`mr-7 mt-5 ${styles.flexContainer}`}>
                    <div>
                      <span className="text text text_type_digits-default mr-2">
                        {elem.count} x {elem.ingr.price}
                      </span>
                    </div>
                    <div>
                      <CurrencyIcon type="primary" />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className={`mt-10 ml-10 mr-10 mb-10 ${styles.flexContainer}`}>
            <div className="text text_type_main-small text_color_inactive">
              {order?.createdAt}
            </div>
            <div className={styles.flexContainer}>
              <div className="text text_type_digits-default  mr-2">{price}</div>
              <div>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <div className={`${styles.pageContainer} mt-25`}>
          <div>
            <div>
              <p className="text text_type_main-medium mt-10 ml-10">
                {order?.name}
              </p>
            </div>
            <div>
              <p
                className={`${styles.statusColor} text text_type_main-small mt-3 ml-10`}
              >
                {order?.status}
              </p>
            </div>
            <div>
              <p className="text text_type_main-medium mt-15 ml-10">
                Ingredients:
              </p>
            </div>
            <div className={`custom-scroll mt-6  ${styles.scrollDiv}`}>
              {ingridientsInOrder.map(
                (elem: { ingr: IIngredient; count: number }) => (
                  <div key={elem.ingr._id} className={styles.description}>
                    <div>
                      <img src={elem.ingr.image_mobile} alt={elem.ingr.name} />
                    </div>
                    <div className="text text_type_main-small mt-6">
                      {elem.ingr.name}
                    </div>
                    <div className={`mr-7 mt-5 ${styles.flexContainer}`}>
                      <div>
                        <span className="text text text_type_digits-default mr-2">
                          {elem.count} x {elem.ingr.price}
                        </span>
                      </div>
                      <div>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            <div className={`mt-10 ml-10 mr-10 mb-10 ${styles.flexContainer}`}>
              <div className="text text_type_main-small text_color_inactive">
                {order?.createdAt}
              </div>
              <div className={styles.flexContainer}>
                <div className="text text_type_digits-default  mr-2">
                  {price}
                </div>
                <div>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
