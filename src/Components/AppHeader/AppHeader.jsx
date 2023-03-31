import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./AppHeader.css";

const AppHeader = () => {
  return (
    <nav className="flex-container">
      <section className="mr-1 mb-4 mt-4">
        <section className="mb-4 mt-4 center">
          <BurgerIcon type="primary" />
          <span className="text text_type_main-default">Constructor</span>
        </section>
      </section>

      <section className="mr-1 mb-4 mt-4">
        <section className="ml-1 mb-4 mt-4">
          <ListIcon type="secondary" />
          <span className="text text_type_main-default">Order list</span>
        </section>
      </section>

      <section className="mb-6 mt-6">
        <Logo />
      </section>

      <section className="mb-4 mt-4">
        <section className="mb-4 mt-4">
          <ProfileIcon type="secondary" />
          <span className="text text_type_main-default">Profile</span>
        </section>
      </section>
    </nav>
  );
};

export default AppHeader;
