import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../Modal/Modal";
import { useState, useCallback } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToBurgerConstructor,
  updateListBurgerConstructor,
  addBunToBurgerConstructor,
} from "../../services/reducers/BurgerConstructorReducer";
import { addIngredient } from "../../services/reducers/allIngredientsReducer";
import { v4 } from "uuid";
import OrderedIngredient from "../OrderedIngredient/OrderedIngredient";
import { setOrder } from "../../services/actions/thunkFunctions";
import { setOrderNumber } from "../../services/reducers/OrderDetailsReducer";
import { addBun } from "../../services/reducers/allIngredientsReducer";
import { getCookie } from "../../utils/utils";

import styles from "./BurgerConstructor.module.css";
import { IStore } from "../../services/reducers/store";
import { IIngredient } from "../../utils/interfaces";

const BurgerConstructor = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const ingrsInConstructor = useSelector(
    (state: IStore) => state.burgerConstructor.ingredients
  );
  const choosenBun = useSelector(
    (state: IStore) => state.burgerConstructor.bun
  );
  const totalPrice: number = useSelector(
    (state: IStore) => state.burgerConstructor.totalPrice
  );

  const ingrIds = ingrsInConstructor
    ? ingrsInConstructor.map((elem) => elem.item._id)
    : [];

  const bunId = choosenBun ? [choosenBun._id] : [];

  const itemsForOrder = bunId.concat(ingrIds).concat(bunId);

  const moveIngredient = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = ingrsInConstructor[dragIndex];
      const newCards = [...ingrsInConstructor];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);
      dispatch(updateListBurgerConstructor({ newList: newCards }));
    },
    [ingrsInConstructor, dispatch]
  );

  const [, drop] = useDrop({
    accept: "ingr",
    drop: (item: { element: IIngredient }) => {
      dispatch(
        addToBurgerConstructor({
          item: item.element,
          id: v4(),
        })
      );

      dispatch(
        addIngredient({
          id: item.element._id,
        })
      );
    },
  });

  const [, dropBun] = useDrop({
    accept: "bun",
    drop: (item: { element: IIngredient }) => {
      dispatch(
        addBunToBurgerConstructor({
          item: item.element,
        })
      );
      dispatch(
        addBun({
          id: item.element._id,
        })
      );
    },
  });

  const onCloseModal = () => {
    setShowModal(false);
    dispatch(setOrderNumber(0));
  };

  const onOpenModal = () => {
    const fetchData = async () => {
      try {
        dispatch(setOrder(itemsForOrder));
        setShowModal(true);
      } catch (error) {}
    };
    if (getCookie("token")) {
      fetchData();
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {showModal && (
        <Modal closeModal={onCloseModal}>
          <OrderDetails />
        </Modal>
      )}
      <div className={`${styles.parent} ${styles.mainConstr}  pt-25 pl-10`}>
        <div ref={dropBun} className={`${styles.ingrs}  pl-4`}>
          <div className={`${styles.botIngr} mr-5`}>
            {choosenBun ? (
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${choosenBun.name} (верх)`}
                price={choosenBun.price}
                thumbnail={choosenBun.image}
              />
            ) : (
              <ConstructorElement
                type="top"
                isLocked={true}
                text="Pick a some bun for your burger"
                price={0}
                thumbnail={
                  "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                }
              />
            )}
          </div>

          <div
            ref={drop}
            className={`${styles.scrollCm} ${styles.ingrs} custom-scroll `}
          >
            {ingrsInConstructor.length > 0 ? (
              ingrsInConstructor.map((elem, index) => (
                <OrderedIngredient
                  key={elem.id}
                  elem={elem}
                  moveIngredient={moveIngredient}
                  index={index}
                />
              ))
            ) : (
              <></>
            )}
          </div>

          <div className={`${styles.botIngr} mr-5`}>
            {choosenBun ? (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${choosenBun.name} (верх)`}
                price={choosenBun.price}
                thumbnail={choosenBun.image}
              />
            ) : (
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Pick a some bun for your burger"
                price={0}
                thumbnail={
                  "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                }
              />
            )}
          </div>
        </div>

        <div className={`${styles.flexBb} mt-10 pr-4`}>
          <div>
            <span className="cost mt-1 mb-1 mr-4 text text text_type_digits-medium ">
              {totalPrice}
            </span>
          </div>
          <div className="mr-10">
            <CurrencyIcon type="primary" />
          </div>
          <div>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={onOpenModal}
            >
              Make an order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerConstructor;
