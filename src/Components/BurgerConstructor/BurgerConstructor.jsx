import {
  ConstructorElement,
  CurrencyIcon,
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";

import styles from "./BurgerConstructor.module.css";

const BurgerConstructor = () => {
  const [showModal, setShowModal] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <Modal closeModal={onCloseModal} show={showModal}>
          <OrderDetails />
        </Modal>
      )}
      <section className={`${styles.parent} ${styles.mainConstr}  pt-25 pl-10`}>
        <section className={`${styles.ingrs}  pl-4`}>
          <section className={`${styles.botIngr} mr-5`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail={
                "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
              }
            />
          </section>

          <div className={`${styles.scrollCm} ${styles.ingrs} custom-scroll `}>
            <div className={styles.iconWithIngr}>
              <div>
                <DragIcon type="primary" />
              </div>
              <div>
                <ConstructorElement
                  text="Краторная булка N-200i (верх)"
                  isLocked={false}
                  price={50}
                  thumbnail={
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                  }
                />
              </div>
            </div>
            <div className={styles.iconWithIngr}>
              <div>
                <DragIcon type="primary" />
              </div>
              <div>
                <ConstructorElement
                  text="Краторная булка N-200i (верх)"
                  isLocked={false}
                  price={50}
                  thumbnail={
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                  }
                />
              </div>
            </div>
            <div className={styles.iconWithIngr}>
              <div>
                <DragIcon type="primary" />
              </div>
              <div>
                <ConstructorElement
                  text="Краторная булка N-200i (верх)"
                  isLocked={false}
                  price={50}
                  thumbnail={
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                  }
                />
              </div>
            </div>
            <div className={styles.iconWithIngr}>
              <div>
                <DragIcon type="primary" />
              </div>
              <div>
                <ConstructorElement
                  text="Краторная булка N-200i (верх)"
                  isLocked={false}
                  price={50}
                  thumbnail={
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                  }
                />
              </div>
            </div>
            <div className={styles.iconWithIngr}>
              <div>
                <DragIcon type="primary" />
              </div>
              <div>
                <ConstructorElement
                  text="Краторная булка N-200i (верх)"
                  isLocked={false}
                  price={50}
                  thumbnail={
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                  }
                />
              </div>
            </div>
            <div className={styles.iconWithIngr}>
              <div>
                <DragIcon type="primary" />
              </div>
              <div>
                <ConstructorElement
                  text="Краторная булка N-200i (верх)"
                  isLocked={false}
                  price={50}
                  thumbnail={
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                  }
                />
              </div>
            </div>
            <div className={styles.iconWithIngr}>
              <div>
                <DragIcon type="primary" />
              </div>
              <div>
                <ConstructorElement
                  text="Краторная булка N-200i (верх)"
                  isLocked={false}
                  price={50}
                  thumbnail={
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                  }
                />
              </div>
            </div>
            <div className={styles.iconWithIngr}>
              <div>
                <DragIcon type="primary" />
              </div>
              <div>
                <ConstructorElement
                  text="Краторная булка N-200i (верх)"
                  isLocked={false}
                  price={50}
                  thumbnail={
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                  }
                />
              </div>
            </div>
            <div className={styles.iconWithIngr}>
              <div>
                <DragIcon type="primary" />
              </div>
              <div>
                <ConstructorElement
                  text="Краторная булка N-200i (верх)"
                  isLocked={false}
                  price={50}
                  thumbnail={
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                  }
                />
              </div>
            </div>
            <div className={styles.iconWithIngr}>
              <div>
                <DragIcon type="primary" />
              </div>
              <div>
                <ConstructorElement
                  text="Краторная булка N-200i (верх)"
                  isLocked={false}
                  price={50}
                  thumbnail={
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                  }
                />
              </div>
            </div>
            <div className={styles.iconWithIngr}>
              <div>
                <DragIcon type="primary" />
              </div>
              <div>
                <ConstructorElement
                  text="Краторная булка N-200i (верх)"
                  isLocked={false}
                  price={50}
                  thumbnail={
                    "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
                  }
                />
              </div>
            </div>
          </div>

          <section className={`${styles.botIngr} mr-5`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail={
                "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
              }
            />
          </section>
        </section>

        <section className={`${styles.flexBb} mt-10 pr-4`}>
          <section>
            <span className="cost mt-1 mb-1 mr-4 text text text_type_digits-medium ">
              1223
            </span>
          </section>
          <section className="mr-10">
            <CurrencyIcon type="primary" />
          </section>
          <section>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={onOpenModal}
            >
              Make an order
            </Button>
          </section>
        </section>
      </section>
    </>
  );
};

export default BurgerConstructor;
