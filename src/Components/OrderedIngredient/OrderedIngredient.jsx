import styles from "./OrderedIngredient.module.css";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { deleteFromBurgerConstructor } from "../../services/reducers/BurgerConstructorReducer";
import { removeIngridient } from "../../services/reducers/allIngridientsReducer";

const OrderedIngredient = ({ elem, index, moveIngredient }) => {
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "component",
    hover(hoverElem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = hoverElem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveIngredient(dragIndex, hoverIndex);
      hoverElem.index = hoverIndex;
    },
  });
  const [, drag] = useDrag({
    type: "component",
    item: () => ({ id: elem.id, index }),
  });

  if (elem.item.type !== "bun") drag(drop(ref));

  const dispatch = useDispatch();

  const preventDefault = (e) => e.preventDefault();

  return (
    <div
      ref={ref}
      onDrop={preventDefault}
      data-handler-id={handlerId}
      className={styles.iconWithIngr}
    >
      <DragIcon type="primary" />

      <ConstructorElement
        key={elem.id}
        text={elem.item.name}
        isLocked={false}
        price={elem.item.price}
        thumbnail={elem.item.image}
        handleClose={() => {
          dispatch(
            deleteFromBurgerConstructor({
              id: elem.id,
            })
          );
          dispatch(
            removeIngridient({
              id: elem.item._id,
            })
          );
        }}
      />
    </div>
  );
};

export default OrderedIngredient;
