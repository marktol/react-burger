import styles from "./ModalOverlay.module.css";

const ModalOverlay = (props: { isShowing: boolean }) => {
  return (
    <div
      className={props.isShowing ? `${styles.show}` : `${styles.hide}`}
    ></div>
  );
};
export default ModalOverlay;
