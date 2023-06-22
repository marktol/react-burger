import AppHeader from "../AppHeader/AppHeader";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function Ingredient() {
  const dispatch = useDispatch();
  const { id } = useParams();

  console.log(window.history.state);
  const isModal = true;

  if (isModal) {
    return <></>;
  }
  return (
    <div>
      <AppHeader />
      <body className={styles.main}>
        <h1 className="text text_type_main-large">Ingredient details</h1>
        {id}
      </body>
    </div>
  );
}

export default Ingredient;
