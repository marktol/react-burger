import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IStore } from "../../services/reducers/store";
import { IIngredient, IOrder } from "../../utils/interfaces";
import { Modal } from "../Modal/Modal";
import styles from "./OrderFromHistory.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { OrderHistoryComponent } from "../OrderFromHistory/OrderFromHistory";
import { useEffect } from "react";
import { WS_CONNECTION_START } from "../../services/actions/socketMiddleware";
import { getCookie } from "../../utils/utils";
const url = "wss://norma.nomoreparties.space/orders/all";
const urlUser = "wss://norma.nomoreparties.space/orders";

export const Order = ({ user }: { user: boolean }) => {
  const dispatch = useDispatch();
  const wsConnected = useSelector((state: IStore) => state.ws.wsConnected);
  useEffect(() => {
    if (!wsConnected && !user) {
      dispatch({ type: WS_CONNECTION_START, payload: url });
    }
    if (!wsConnected && user) {
      dispatch({
        type: WS_CONNECTION_START,
        payload: `${urlUser}?token=${getCookie("token")}`,
      });
    }
    return () => {};
  });

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
        page={true}
        order={order!}
        orderId={orderId}
        price={price}
        ingridientsInOrder={ingridientsInOrder}
      />
    </>
  );
};
