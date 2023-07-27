import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { ReactNode, useEffect } from "react";

import { useNavigate } from "react-router-dom";
interface IModalProps {
  title?: string;
  closeModal?: () => void;
  children: ReactNode;
}

export const Modal = (props: IModalProps) => {
  const renderPlace = document.getElementById("root") as
    | Element
    | DocumentFragment;
  const navigate = useNavigate();
  const closeMyPopup = () => {
    if (props.closeModal) {
      props.closeModal();
    } else {
      navigate(-1);
    }
  };

  const escFunction = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMyPopup();
    }
  };

  const clickHandler = () => {
    closeMyPopup();
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, []);

  return createPortal(
    <div>
      <div onClick={clickHandler}>
        <ModalOverlay isShowing={true} />
      </div>

      <div className={styles.show}>
        <div className={styles.modalContent}>
          <div className={`${styles.modalHeader} pr-10 pl-10 pt-10`}>
            <span className="text text_type_main-large">{props.title}</span>
            <CloseIcon onClick={clickHandler} type="primary" />
          </div>
          {props.children}
        </div>
      </div>
    </div>,
    renderPlace
  );
};
