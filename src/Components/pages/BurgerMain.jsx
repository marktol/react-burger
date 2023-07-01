import styles from "./BurgerMain.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { useEffect, useState } from "react";
import { getIngredients } from "../../services/actions/thunkFunctions";

import { useDispatch } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function BurgerMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getIngredients());

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.main} id="react-modals">
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <main className={styles.menu}>
          {!isLoading && <BurgerIngredients />}
          {!isLoading && hasError && <h1>Uploading error, refresh page</h1>}
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
}

export default BurgerMain;
