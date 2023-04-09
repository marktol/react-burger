import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <section className={`ml-10 mr-10 mb-10 mt-10 ${styles.flexContainer} `}>
      <section
        className={`mb-4 mt-4 mr-2 ${styles.headerLeft} ${styles.flexContainer}`}
      >
        <section className="ml-5 mr-1 mb-4 mt-4">
          <BurgerIcon type="primary" />
        </section>
        <section className="mb-4 mt-4 ml-1 mr-5 text text_type_main-default   ">
          <span>Constructor</span>
        </section>
      </section>

      <section className={`mb-4 mt-4 ${styles.flexContainer}`}>
        <section className="ml-5 mr-1 mb-4 mt-4">
          <ListIcon type="primary" />
        </section>
        <section
          className={`mb-4 mt-4 ml-1 mr-5 text text_type_main-default ${styles.nowrap}`}
        >
          <span>Order list</span>
        </section>
      </section>

      <section className={` ${styles.logo} mt-6 mb-6`}>
        <Logo />
      </section>

      <section
        className={`mb-4 mt-4 ${styles.headerRight} ${styles.flexContainer} `}
      >
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
