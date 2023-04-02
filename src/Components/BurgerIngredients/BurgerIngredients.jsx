import {
  Tab,
  CurrencyIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import "./BurgerIngredients.css";

const BurgerIngredients = (props) => {
  const [current, setCurrent] = useState("Buns");

  return (
    <section className="main-burger pt-10">
      <p className="text text_type_main-large text-left">Make a burger</p>
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
      <section className="scrollDiv custom-scroll mb-1 pb-1">
        <p className="text text_type_main-medium text-left">Buns</p>
        <section className="items ">
          {props.data
            .filter((elem) => elem.type === "bun")
            .map((bun) => (
              <BurgerElement
                key={bun._id}
                img={bun.image}
                cost={bun.price}
                name={bun.name}
              />
            ))}
        </section>

        <p className="text text_type_main-medium  text-left">Sauces</p>
        <section className="items ">
          {props.data
            .filter((elem) => elem.type === "sauce")
            .map((sauce) => (
              <BurgerElement
                key={sauce._id}
                img={sauce.image}
                cost={sauce.price}
                name={sauce.name}
              />
            ))}
        </section>

        <p className="text text_type_main-medium  text-left">Toppings</p>
        <section className="items ">
          {props.data
            .filter((elem) => elem.type === "main")
            .map((main) => (
              <BurgerElement
                key={main._id}
                img={main.image}
                cost={main.price}
                name={main.name}
              />
            ))}
        </section>
      </section>
    </section>
  );
};

const BurgerElement = (props) => {
  return (
    <section className=" mr-4">
      <img className="ml-4 mr-4 " src={props.img} alt="image" />

      <section className="flex-cost">
        <section>
          <span className="cost mt-1 mb-1 text text_type_digits-default ">
            {props.cost}
          </span>
        </section>
        <section>
          <CurrencyIcon type="primary" />
        </section>
      </section>

      <p className="name text text_type_main-small mr-1 ml-1">{props.name}</p>
    </section>
  );
};

export default BurgerIngredients;
