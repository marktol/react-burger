import styles from "./OrderedIngredient.module.css";
import { useDispatch } from "react-redux";
import { DragEventHandler, useRef } from "react";
import { useDrop, useDrag, XYCoord } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { deleteFromBurgerConstructor } from "../../services/reducers/BurgerConstructorReducer";
import { removeIngredient } from "../../services/reducers/allIngredientsReducer";
import { IBurgerIngredient, IIngredient } from "../../utils/interfaces";

const OrderedIngredient = ({
  elem,
  index,
  moveIngredient,
}: {
  elem: IBurgerIngredient;
  index: number;
  moveIngredient: (dragIndex: any, hoverIndex: any) => void;
}) => {
  const ref: React.RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<any, void, { handlerId: any }>({
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
      const clientOffset: XYCoord | null = monitor.getClientOffset();
      if (clientOffset !== null) {
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
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

  const preventDefault: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    // Rest of your code
  };

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
            removeIngredient({
              id: elem.item._id,
            })
          );
        }}
      />
    </div>
  );
};

export default OrderedIngredient;
