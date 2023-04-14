import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../Modal/Modal";
import { useState, useContext, useEffect } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import { BurgerContext, SelectedIngrsContext } from "../../utils/burgerContext";
import { setOrder } from "../../utils/burger-api";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = () => {
  const { burgerIngrs, setBurgerIngrs } = useContext(BurgerContext);
  const { selectedIngrs, setSelectedIngrs } = useContext(SelectedIngrsContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (burgerIngrs) {
      const allIngrs = {
        topings: burgerIngrs.filter((elem) => elem.type != "bun"),
        bun: burgerIngrs.find((elem) => elem.type == "bun"),
      };
      setSelectedIngrs(allIngrs);

      if (allIngrs.topings) {
        let totalPriceCalculation = 0;
        for (let i = 0; i < allIngrs.topings.length; i++) {
          totalPriceCalculation += allIngrs.topings[i].price;
        }
        totalPriceCalculation += allIngrs.bun.price * 2;
        setTotalPrice(totalPriceCalculation);
      }
    }
  }, [burgerIngrs]);

  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onOpenModal = () => {
    const respBody = selectedIngrs.topings.map((x) => x._id);

    setOrder(respBody)
      .then((data) => {
        setOrderNumber(data.order.number);
        setShowModal(true);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  };
  if (selectedIngrs) {
    return (
      <>
        {showModal && (
          <Modal closeModal={onCloseModal} show={showModal}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )}
        <div className={`${styles.parent} ${styles.mainConstr}  pt-25 pl-10`}>
          <div className={`${styles.ingrs}  pl-4`}>
            <div className={`${styles.botIngr} mr-5`}>
              <ConstructorElement
                isLocked={true}
                text={`${selectedIngrs.bun.name} (верх)`}
                price={selectedIngrs.bun.price}
                thumbnail={selectedIngrs.bun.image}
              />
            </div>

            <div
              className={`${styles.scrollCm} ${styles.ingrs} custom-scroll `}
            >
              {selectedIngrs &&
                selectedIngrs.topings
                  .filter((elem) => elem.type != "bun1")
                  .map((ingr) => (
                    <div className={styles.iconWithIngr} key={ingr._id}>
                      <div>
                        <DragIcon type="primary" />
                      </div>
                      <div>
                        <ConstructorElement
                          key={ingr._id}
                          text={ingr.name}
                          isLocked={false}
                          price={ingr.price}
                          thumbnail={ingr.image}
                        />
                      </div>
                    </div>
                  ))}
            </div>

            <div className={`${styles.botIngr} mr-5`}>
              <ConstructorElement
                isLocked={true}
                text={`${selectedIngrs.bun.name} (низ)`}
                price={selectedIngrs.bun.price}
                thumbnail={selectedIngrs.bun.image}
              />
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
  } else {
    return <></>;
  }
};

export default BurgerConstructor;
