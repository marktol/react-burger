import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useState, useEffect } from "react";
import styles from "./BurgerIngredients.module.css";
import { Modal } from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState("Buns");
  const [showModal, setShowModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState();

  useEffect(() => {
    const element = document.getElementById(current);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  }, [current]);

  const onCloseModal = () => {
    setShowModal(false);
    setSelectedIngredient(null);
  };

  const onOpenModal = (ingredient) => {
    setShowModal(true);
    setSelectedIngredient(ingredient);
  };

  return (
    <>
      {showModal && (
        <Modal
          closeModal={onCloseModal}
          show={showModal}
          title="Ingredient details"
        >
          <IngredientDetails data={selectedIngredient} />
        </Modal>
      )}
      <section className={`pt-10 ${styles.mainBurger}`}>
        <p className={`text text_type_main-large ${styles.textLeft}`}>
          Make a burger
        </p>
        <section className="tab mb-10">
          <div style={{ display: "flex" }}>
            <Tab value="Buns" active={current === "Buns"} onClick={setCurrent}>
              Buns
            </Tab>
            <Tab
              value="Sauces"
              active={current === "Sauces"}
              onClick={setCurrent}
            >
              Sauces
            </Tab>
            <Tab
              value="Toppings"
              active={current === "Toppings"}
              onClick={setCurrent}
            >
              Toppings
            </Tab>
          </div>
        </section>
        <section className={`custom-scroll mb-1 pb-1 ${styles.scrollDiv}`}>
          <p
            id="Buns"
            className={`text text_type_main-medium ${styles.textLeft}`}
          >
            Buns
          </p>
          <section className={styles.items}>
            {props.data
              .filter((elem) => elem.type === "bun")
              .map((bun) => (
                <BurgerElement
                  key={bun._id}
                  img={bun.image}
                  cost={bun.price}
                  name={bun.name}
                  data={bun}
                  onClick={() => {
                    onOpenModal(bun);
                  }}
                />
              ))}
          </section>

          <p
            id="Sauces"
            className={`text text_type_main-medium ${styles.textLeft}`}
          >
            Sauces
          </p>
          <section className={styles.items}>
            {props.data
              .filter((elem) => elem.type === "sauce")
              .map((sauce) => (
                <BurgerElement
                  key={sauce._id}
                  img={sauce.image}
                  cost={sauce.price}
                  name={sauce.name}
                  data={sauce}
                  onClick={() => {
                    onOpenModal(sauce);
                  }}
                />
              ))}
          </section>

          <p
            id="Toppings"
            className={`text text_type_main-medium ${styles.textLeft}`}
          >
            Toppings
          </p>
          <section className={styles.items}>
            {props.data
              .filter((elem) => elem.type === "main")
              .map((main) => (
                <BurgerElement
                  key={main._id}
                  img={main.image}
                  cost={main.price}
                  name={main.name}
                  data={main}
                  onClick={() => {
                    onOpenModal(main);
                  }}
                />
              ))}
          </section>
        </section>
      </section>
    </>
  );
};

const BurgerElement = (props) => {
  return (
    <section className="mr-4" onClick={props.onClick}>
      <img className="ml-4 mr-4" src={props.img} alt="image" />

      <section className={styles.flexCost}>
        <section>
          <span className="text text_type_digits-default mt-1 mb-1">
            {props.cost}
          </span>
        </section>
        <section>
          <CurrencyIcon type="primary" />
        </section>
      </section>

      <p className={`${styles.name} text text_type_main-small mr-1 ml-1`}>
        {props.name}
      </p>
    </section>
  );
};

export default BurgerIngredients;
