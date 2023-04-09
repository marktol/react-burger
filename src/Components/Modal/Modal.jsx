import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { useState, useEffect } from "react";

export const Modal = (props) => {
  const renderPlace = document.getElementById("root");

  const escFunction = (e) => {
    if (e.key === "Escape") {
      props.closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return createPortal(
    <div>
      <div onClick={props.closeModal}>
        <ModalOverlay isShowing={props.show} />
      </div>

      <div className={props.show ? `${styles.show}` : `${styles.hide}`}>
        <div className={styles.modalContent}>
          <div className={`${styles.modalHeader} pr-10 pl-10 pt-10`}>
            <span className="text text_type_main-large">{props.title}</span>
            <CloseIcon onClick={props.closeModal} type="primary" />
          </div>
          {props.children}
        </div>
      </div>
    </div>,
    renderPlace
  );
};
