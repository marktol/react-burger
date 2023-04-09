import styles from "./ModalOverlay.module.css";
import { PropTypes } from "prop-types";

const ModalOverlay = (props) => {
  return (
    <div
      className={props.isShowing ? `${styles.show}` : `${styles.hide}`}
    ></div>
  );
};
export default ModalOverlay;

ModalOverlay.propTypes = {
  isShowing: PropTypes.bool,
};
