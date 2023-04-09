import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

export const Modal = (props) => {
  const renderPlace = document.getElementById("root");

  return createPortal(
    <div>
      <ModalOverlay isShowing={props.show} />
      <div className={props.show ? `${styles.show}` : `${styles.hide}`}>
        <div
          className={
            props.data ? `${styles.modalDetails}` : `${styles.modalOrder}`
          }
        >
          <div className={`${styles.modalHeader} pr-10 pl-10 pt-10`}>
            {props.data ? (
              <span className="text text_type_main-large">
                Ingredient details
              </span>
            ) : (
              <span> </span>
            )}
            <CloseIcon onClick={props.toggleModal} type="primary" />
          </div>
          <div>
            {props.data ? (
              <OrderDetails data={props.data} />
            ) : (
              <IngredientDetails />
            )}
          </div>
        </div>
      </div>
    </div>,
    renderPlace
  );
};
