import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header className={`ml-10 mr-10 mt-10 ${styles.flexContainer} `}>
      <a
        href=""
        className={`mb-4 mt-4 mr-2 ${styles.headerLeft} ${styles.flexContainer} ${styles.linkColor}`}
      >
        <div className="ml-5 mr-1 mb-4 mt-4">
          <BurgerIcon type="primary" />
        </div>
        <div className="mb-4 mt-4 ml-1 mr-5 text text_type_main-default   ">
          <span>Constructor</span>
        </div>
      </a>

      <a
        href=""
        className={`mb-4 mt-4 ${styles.flexContainer} ${styles.linkColor}`}
      >
        <div className="ml-5 mr-1 mb-4 mt-4">
          <ListIcon type="primary" />
        </div>
        <div
          className={`mb-4 mt-4 ml-1 mr-5 text text_type_main-default ${styles.nowrap}`}
        >
          <span>Order list</span>
        </div>
      </a>

      <div className={` ${styles.logo} mt-6 mb-6`}>
        <Logo />
      </div>

      <a
        href=""
        className={`mb-4 mt-4 ${styles.headerRight} ${styles.flexContainer} ${styles.linkColor}`}
      >
        <div className="ml-5 mr-1 mb-4 mt-4">
          <ProfileIcon type="primary" />
        </div>
        <div className="mb-4 mt-4 ml-1 mr-5 text text_type_main-default   ">
          <span className="text text_type_main-default">Profile</span>
        </div>
      </a>
    </header>
  );
};

export default AppHeader;
