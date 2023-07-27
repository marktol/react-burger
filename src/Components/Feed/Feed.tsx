import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WS_CONNECTION_START } from "../../services/actions/socketMiddleware";
import styles from "./feed.module.css";
import { IStore } from "../../services/reducers/store";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IOrder } from "../../utils/interfaces";
import { Link } from "react-router-dom";
const url = "wss://norma.nomoreparties.space/orders/all";

export const Feed = () => {
  const dispatch = useDispatch();
  const wsConnected = useSelector((state: IStore) => state.ws.wsConnected);

  useEffect(() => {
    if (!wsConnected) {
      dispatch({ type: WS_CONNECTION_START, payload: url });
    }
    return () => {};
  });

  const orders = useSelector((state: IStore) => state.ws.orders);

  const total: number = useSelector((state: IStore) => state.ws.total);
  const totalToday: number = useSelector(
    (state: IStore) => state.ws.totalToday
  );

  return (
    <>
      {orders && (
        <div className={styles.flexContainerMain}>
          <div className={styles.leftDiv}>
            <p className={`text text_type_main-large ${styles.textLeft}`}>
              Orders
            </p>
            <div className={`custom-scroll mb-1 pb-1 ${styles.scrollDiv}`}>
              {orders.map((elem: any) => (
                <Link
                  className={styles.noDecoration}
                  to={{
                    pathname: `/feed/${elem.number}`,
                  }}
                  state={{ background: "modal" }}
                >
                  <FeedCard elem={elem} />
                </Link>
              ))}
            </div>
          </div>
          <div className={`ml-15 ${styles.rightDiv}`}>
            <FeedssInfo totalToday={totalToday} total={total} orders={orders} />
          </div>
        </div>
      )}
    </>
  );
};

const FeedssInfo = ({
  totalToday,
  total,
  orders,
}: {
  totalToday: any;
  total: any;
  orders: Array<IOrder>;
}) => {
  const ordersReady: Array<number> = [];
  const ordersInProgress: Array<number> = [];
  const setStatus = () => {
    for (let i = 0; i < orders?.length; i++) {
      if (orders[i].status == "done") ordersReady.push(orders[i].number);
      if (orders[i].status == "pending" || orders[i].status == "created")
        ordersInProgress.push(orders[i].number);
    }
  };
  setStatus();
  const updReady = ordersReady.slice(0, 9);

  return (
    <>
      <div className={styles.flexContainer}>
        <div className={styles.ReadyDiv}>
          <p className="text text_type_main-medium mb-6">Ready:</p>
          <div>
            {updReady.map((elem: number) => (
              <p
                className={`text text_type_digits-default mt-2 ${styles.done}`}
              >
                {elem}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.ReadyDiv}>
          <p className="text text_type_main-medium mb-6">Inprogress:</p>
          <div>
            {ordersInProgress.map((elem: number) => (
              <p className="text text_type_digits-default mt-2">{elem}</p>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="text text_type_main-medium mt-15">
          Done for all time:
        </div>
        <p className={`text text_type_digits-large ${styles.orderIdText}`}>
          {total}
        </p>
      </div>

      <div>
        <div className="text text_type_main-medium mt-15">Done today:</div>
        <p className={`text text_type_digits-large ${styles.orderIdText}`}>
          {totalToday}
        </p>
      </div>
    </>
  );
};

export const FeedCard = (order: any) => {
  const ingredientsFromStore = useSelector(
    (state: IStore) => state.allIngredients.ingredients
  );

  const ingrsInOrder = () => {
    let newArr = [];
    for (let ingr = 0; ingr < order.elem.ingredients?.length; ingr++) {
      if (order.elem.ingredients[ingr] != null) {
        newArr.push(
          ingredientsFromStore.find(
            (elem) => elem._id == order.elem.ingredients[ingr]
          )
        );
      }
    }
    return newArr;
  };

  const picturesFroOrder = () => {
    let pictures: Array<string> = [];
    for (let i = 0; i < updatedIngrsInOrder.length; i++) {
      if (updatedIngrsInOrder[i]?.image_mobile) {
        pictures.push(updatedIngrsInOrder[i]?.image_mobile!);
      }
    }
    return pictures;
  };

  const priceCulc = () => {
    let price = 0;
    for (let i = 0; i < updatedIngrsInOrder.length; i++) {
      if (updatedIngrsInOrder[i]?.type == "bun") {
        price += updatedIngrsInOrder[i]?.price || 0;
      }
      price += updatedIngrsInOrder[i]?.price || 0;
    }
    return price;
  };

  const updatedIngrsInOrder = ingrsInOrder();
  const price = priceCulc();
  const allPics = picturesFroOrder();
  const maxPics = 6;

  return (
    <>
      <div className={`mt-4 mr-2 ${styles.border}`}>
        <div className="mr-6 ml-6 pt-6 pb-6">
          <div className={` ${styles.flexLine}`}>
            <div>
              <p className="text text_type_digits-default">
                #{order.elem.number}
              </p>
            </div>
            <div>
              <p className="text text_type_main-small text_color_inactive">
                {order.elem.createdAt}
              </p>
            </div>
          </div>

          <p className="text text_type_main-medium mt-6">{order.elem.name}</p>
          <div className={`${styles.flexLine} mt-6 ml-6`}>
            <div>
              {allPics.slice(0, maxPics).map((elem: string, index: number) => (
                <div key={index} className={styles.pictureContainer}>
                  <img
                    className={styles.picturesStyle}
                    src={elem}
                    alt={`Image ${index + 1}`}
                  />
                  {index === 5 && allPics.length > maxPics && (
                    <div className={styles.imageOverlay}>
                      +{allPics.length - maxPics}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.flexContainer}>
              <div>
                <span className="text text text_type_digits-default ">
                  {price}
                </span>
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
};
