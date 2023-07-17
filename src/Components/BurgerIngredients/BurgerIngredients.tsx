import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingrType } from "../../utils/prop-types";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styles from "./BurgerIngredients.module.css";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { useSelector, useDispatch } from "react-redux";
import { addIngredientDetails } from "../../services/reducers/IngredientDetailsReducer";
import { useDrag } from "react-dnd";
import { IStore } from "../../services/reducers/store";
import { IIngredient } from "../../utils/interfaces";

// Импортируйте необходимые стили и компоненты

const BurgerIngredients = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState("Buns");
  const containerRef = useRef(null);

  const dispatch = useDispatch();

  const ingredients = useSelector(
    (state: IStore) => state.allIngredients.ingredients
  );

  const handleScroll = () => {
    const container: any = containerRef.current;
    if (!container) return;

    const headers: NodeListOf<HTMLParagraphElement> =
      container.querySelectorAll("p.text_type_main-medium");

    const containerMiddleY: number = container.getBoundingClientRect().top;

    let closestHeader: any = null;
    let closestDistance: number = Infinity;

    headers.forEach((header: HTMLParagraphElement) => {
      const headerMiddleY: number =
        header.getBoundingClientRect().top + header.offsetHeight / 2;
      const distance: number = Math.abs(containerMiddleY - headerMiddleY);

      if (distance < closestDistance) {
        closestHeader = header;
        closestDistance = distance;
      }
    });

    if (closestHeader) {
      setActiveTab(closestHeader.id);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onCloseModal = () => {
    setShowModal(false);
    dispatch(addIngredientDetails({}));
  };

  const onOpenModal = (ingredient: IIngredient) => {
    dispatch(addIngredientDetails(ingredient));
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <Modal closeModal={onCloseModal} title="Подробности ингредиента">
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
        <div
          className={`custom-scroll mb-1 pb-1 ${styles.scrollDiv}`}
          ref={containerRef}
          onScroll={handleScroll}
        >
          <p
            id="Buns"
            className={`text text_type_main-medium ${styles.textLeft}`}
          >
            Булки
          </p>
          <div className={styles.items}>
            {ingredients
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
            {ingredients
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
            {ingredients
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

interface IBurgerElementProps {
  key: string;

  img: string;
  cost: number;
  name: string;
  data: IIngredient;
  count: number;
  onClick: (ingredient: IIngredient) => void;
  dragType: string;
  itemId: string;
}

const BurgerElement = (props: IBurgerElementProps) => {
  const [, drag] = useDrag({
    type: props.dragType,
    item: { element: props.data },
  });
  const location = useLocation();

  return (
    <div className="mr-4" ref={drag}>
      <Link
        className={styles.noDecoration}
        to={{
          pathname: `/ingredients/${props.itemId}`,
        }}
        state={{ background: "modal" }}
      >
        <div>
          <div className={styles.counterTop}>
            {props.count > 0 && <Counter count={props.count} size="small" />}
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
      </Link>
    </div>
  );
};

export default BurgerIngredients;
