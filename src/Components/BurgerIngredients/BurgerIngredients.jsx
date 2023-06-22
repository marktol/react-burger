import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { PropTypes } from "prop-types";
import { ingrType } from "../../utils/prop-types";

import { useState, useEffect } from "react";
import styles from "./BurgerIngredients.module.css";
import { Modal } from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { useSelector, useDispatch } from "react-redux";
import { addIngridientDetails } from "../../services/reducers/IngredientDetailsReducer";
import { useDrag } from "react-dnd";
import { useHistory, useNavigate } from "react-router-dom";

const BurgerIngredients = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Buns");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ingridients = useSelector((state) => state.allIngridients.ingridients);

  const handleScroll = () => {
    const container = document.querySelector(`.${styles.scrollDiv}`);
    const headers = container.querySelectorAll("p.text_type_main-medium");

    let closestHeader = headers[0];
    let closestHeaderDistance = Math.abs(
      container.getBoundingClientRect().top -
        closestHeader.getBoundingClientRect().top
    );

    headers.forEach((header) => {
      const distance = Math.abs(
        container.getBoundingClientRect().top -
          header.getBoundingClientRect().top
      );

      if (distance < closestHeaderDistance) {
        closestHeader = header;
        closestHeaderDistance = distance;
      }
    });

    setActiveTab(closestHeader.id);
  };

  useEffect(() => {
    const container = document.querySelector(`.${styles.scrollDiv}`);
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [ingridients]);

  const onCloseModal = () => {
    setShowModal(false);
    dispatch(addIngridientDetails({}));
  };

  const onOpenModal = (ingredient) => {
    dispatch(addIngridientDetails(ingredient));

    navigate(`/ingredients/${ingredient._id}`);

    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <Modal
          closeModal={onCloseModal}
          show={showModal}
          title="Подробности ингредиента"
        >
          <IngredientDetails />
        </Modal>
      )}
      <div className={`pt-10 ${styles.mainBurger}`}>
        <p className={`text text_type_main-large ${styles.textLeft}`}>
          Создайте свой бургер
        </p>
        <div className="tab mb-10">
          <div style={{ display: "flex" }}>
            <Tab
              value="Buns"
              active={activeTab === "Buns"}
              onClick={() => setActiveTab("Buns")}
            >
              Булки
            </Tab>
            <Tab
              value="Sauces"
              active={activeTab === "Sauces"}
              onClick={() => setActiveTab("Sauces")}
            >
              Соусы
            </Tab>
            <Tab
              value="Toppings"
              active={activeTab === "Toppings"}
              onClick={() => setActiveTab("Toppings")}
            >
              Начинки
            </Tab>
          </div>
        </div>
        <div className={`custom-scroll mb-1 pb-1 ${styles.scrollDiv}`}>
          <p
            id="Buns"
            className={`text text_type_main-medium ${styles.textLeft}`}
          >
            Булки
          </p>
          <div className={styles.items}>
            {ingridients
              .filter((elem) => elem.type === "bun")
              .map((bun) => (
                <BurgerElement
                  key={bun._id}
                  img={bun.image}
                  cost={bun.price}
                  name={bun.name}
                  data={bun}
                  count={bun.count}
                  onClick={() => {
                    onOpenModal(bun);
                  }}
                  dragType="bun"
                  itemId={bun._id}
                />
              ))}
          </div>

          <p
            id="Sauces"
            className={`text text_type_main-medium ${styles.textLeft}`}
          >
            Соусы
          </p>
          <div className={styles.items}>
            {ingridients
              .filter((elem) => elem.type === "sauce")
              .map((ingr) => (
                <BurgerElement
                  key={ingr._id}
                  img={ingr.image}
                  cost={ingr.price}
                  name={ingr.name}
                  data={ingr}
                  count={ingr.count}
                  onClick={() => {
                    onOpenModal(ingr);
                  }}
                  dragType="ingr"
                  itemId={ingr._id}
                />
              ))}
          </div>

          <p
            id="Toppings"
            className={`text text_type_main-medium ${styles.textLeft}`}
          >
            Начинки
          </p>
          <div className={styles.items}>
            {ingridients
              .filter((elem) => elem.type === "main")
              .map((ingr) => (
                <BurgerElement
                  key={ingr._id}
                  img={ingr.image}
                  cost={ingr.price}
                  name={ingr.name}
                  data={ingr}
                  count={ingr.count}
                  onClick={() => {
                    onOpenModal(ingr);
                  }}
                  dragType="ingr"
                  itemId={ingr._id}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

const BurgerElement = (props) => {
  const [, drag] = useDrag({
    type: props.dragType,
    item: { element: props.data },
  });

  return (
    <div className="mr-4" onClick={props.onClick} ref={drag}>
      <div>
        <div className={styles.counterTop}>
          {props.count > 0 && (
            <Counter
              className={styles.counterTop}
              count={props.count}
              size="small"
            />
          )}
        </div>
      </div>
      <img className="ml-4 mr-4" src={props.img} alt={props.name} />

      <div className={styles.flexCost}>
        <div>
          <span className="text text_type_digits-default mt-1 mb-1">
            {props.cost}
          </span>
        </div>
        <div>
          <CurrencyIcon type="primary" />
        </div>
      </div>

      <p className={`${styles.name} text text_type_main-small mr-1 ml-1`}>
        {props.name}
      </p>
    </div>
  );
};

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingrType),
};
