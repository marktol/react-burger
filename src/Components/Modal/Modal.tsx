import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { KeyboardEvent, ReactNode, useEffect } from "react";

import { useNavigate } from "react-router-dom";
interface IModalProps {
  show: boolean;
  title?: string;
  closeModal: () => void;
  children: ReactNode;
}

export const Modal = (props: IModalProps) => {
  const renderPlace = document.getElementById("root") as
    | Element
    | DocumentFragment;

  const escFunction = (e: Event) => {
    const keyboardEvent = e as unknown as KeyboardEvent;
    if (keyboardEvent.key === "Escape") {
      props.closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
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

interface IModalIngrProps {
  title: string;
  children: ReactNode;
}

export const ModalIngr = (props: IModalIngrProps) => {
  const renderPlace = document.getElementById("root") as
    | Element
    | DocumentFragment;
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  const escFunction = (e: Event) => {
    const keyboardEvent = e as unknown as KeyboardEvent;
    if (keyboardEvent.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", escFunction);
    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, []);

  return createPortal(
    <div>
      <div onClick={closeModal}>
        <ModalOverlay isShowing={true} />
      </div>

      <div className={styles.show}>
        <div className={styles.modalContent}>
          <div className={`${styles.modalHeader} pr-10 pl-10 pt-10`}>
            <span className="text text_type_main-large">{props.title}</span>
            <CloseIcon onClick={closeModal} type="primary" />
          </div>
          {props.children}
        </div>
      </div>
    </div>,
    renderPlace
  );
};
