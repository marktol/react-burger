import styles from "./BurgerMain.module.css";

import BurgerIngredients from "../Components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../Components/BurgerConstructor/BurgerConstructor";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function BurgerMain() {
  return (
    <div className={styles.main} id="react-modals">
      <DndProvider backend={HTML5Backend}>
        <main className={styles.menu}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
}

export default BurgerMain;
