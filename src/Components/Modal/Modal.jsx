import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

export const Modal = (props) => {
  const renderPlace = document.getElementById("root");

  return createPortal(
    <div>
      <ModalOverlay isShowing={props.show} />
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
