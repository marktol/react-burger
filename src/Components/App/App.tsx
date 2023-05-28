import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useEffect, useState } from "react";
import { getIngredients } from "../../utils/burger-api";

import { useDispatch } from "react-redux";
import { addIngridients } from "../../services/reducers/allIngridientsReducer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getIngredients()
      .then((data) => {
        setIsLoading(false);
        dispatch(addIngridients(data.data));
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.main} id="react-modals">
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <div className={styles.menu}>
          {!isLoading && <BurgerIngredients />}
          {!isLoading && hasError && <h1>Uploading error, refresh page</h1>}
          <BurgerConstructor />
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
