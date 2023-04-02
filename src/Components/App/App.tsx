import "./App.css";
import AppHeader from "../AppHeader/AppHeader";
import data from "../../utils/data";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
  return (
    <section className="main-container">
      <AppHeader />
      <section className="Menu">
        <BurgerIngredients data={data} />
        <BurgerConstructor />
      </section>
    </section>
  );
}

export default App;
