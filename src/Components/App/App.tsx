import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useEffect, useState } from "react";
import { getIngredients } from "../../utils/burger-api";
import { BurgerContext, SelectedIngrsContext } from "../../utils/burgerContext";

function App() {
  const [burgerIngrs, setBurgerIngrs] = useState();
  const [selectedIngrs, setSelectedIngrs] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setBurgerIngrs(data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.main} id="react-modals">
      <BurgerContext.Provider value={{ burgerIngrs, setBurgerIngrs }}>
        <SelectedIngrsContext.Provider
          value={{ selectedIngrs, setSelectedIngrs }}
        >
          <AppHeader />
          <div className={styles.menu}>
            {!isLoading && <BurgerIngredients />}
            {!isLoading && hasError && <h1>Uploading error, refresh page</h1>}
            {!isLoading && <BurgerConstructor />}
            {!isLoading && hasError && <h1>Uploading error, refresh page</h1>}
          </div>
        </SelectedIngrsContext.Provider>
      </BurgerContext.Provider>
    </div>
  );
}

export default App;
