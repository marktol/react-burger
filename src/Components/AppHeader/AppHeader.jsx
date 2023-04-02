import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import "./AppHeader.css";

const AppHeader = () => {
  return (
    <section className="flex-container  ml-10 mr-10 mb-10 mt-10 ">
      <section className="mb-4 mt-4 mr-2 header-left flex-container ">
        <section className="ml-5 mr-1 mb-4 mt-4">
          <BurgerIcon type="primary" />
        </section>
        <section className="mb-4 mt-4 ml-1 mr-5 text text_type_main-default   ">
          <span>Constructor</span>
        </section>
      </section>

      <section className="mb-4 mt-4 flex-container ">
        <section className="ml-5 mr-1 mb-4 mt-4">
          <ListIcon type="primary" />
        </section>
        <section className="mb-4 mt-4 ml-1 mr-5 text text_type_main-default  nowrap ">
          <span>Order list</span>
        </section>
      </section>

      <section className="  logo mt-6 mb-6">
        <Logo />
      </section>

      <section className="mb-4 mt-4 header-right flex-container ">
        <section className="ml-5 mr-1 mb-4 mt-4">
          <ProfileIcon type="primary" />
        </section>
        <section className="mb-4 mt-4 ml-1 mr-5 text text_type_main-default   ">
          <span className="text text_type_main-default">Profile</span>
        </section>
      </section>
    </section>
  );
};

export default AppHeader;
