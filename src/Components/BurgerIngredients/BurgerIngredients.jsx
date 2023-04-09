import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useState } from "react";
import styles from "./BurgerIngredients.module.css";
import { Modal } from "../Modal/Modal";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState("Buns");

  return (
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
        <p className={`text text_type_main-medium ${styles.textLeft}`}>Buns</p>
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
              />
            ))}
        </section>

        <p className={`text text_type_main-medium ${styles.textLeft}`}>
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
              />
            ))}
        </section>

        <p className={`text text_type_main-medium ${styles.textLeft}`}>
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
              />
            ))}
        </section>
      </section>
    </section>
  );
};

const BurgerElement = (props) => {
  const [isVisible, setisVisible] = useState(false);

  const handleOpenModal = () => {
    console.log("click");
    setisVisible(true);
  };
  const toggleModal = () => {
    console.log("X clicked");
    setisVisible(false);
  };

  const openModal = (
    <Modal data={props.data} toggleModal={toggleModal} show={isVisible} />
  );

  return (
    <section className="mr-4" onClick={handleOpenModal}>
      {isVisible && openModal}
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
