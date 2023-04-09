import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useEffect, useState } from "react";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setState(data.data);
      })
      .catch((e) => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <section className={styles.main} id="react-modals">
      <AppHeader />
      <section className={styles.menu}>
        {!isLoading && <BurgerIngredients data={state} />}
        <BurgerConstructor />
      </section>
    </section>
  );
}

export default App;
