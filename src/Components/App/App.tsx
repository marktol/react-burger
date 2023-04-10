import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useEffect, useState } from "react";
import { getIngredients } from "../../utils/burger-api";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIsLoading(false);
        setState(data.data);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.main} id="react-modals">
      <AppHeader />
      <div className={styles.menu}>
        {!isLoading && <BurgerIngredients data={state} />}
        {!isLoading && hasError && <h1>Uploading error, refresh page</h1>}
        <BurgerConstructor />
      </div>
    </div>
  );
}

export default App;
