import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";

import { Link, useLocation } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();
  const isMain = location.pathname === "/" ? true : false;
  const isOrderList = location.pathname.startsWith("/feed") ? true : false;
  const isProfile = location.pathname.startsWith("/profile") ? true : false;

  return (
    <header className={`ml-10 mr-10 mt-10 ${styles.flexContainer} `}>
      <Link
        className={`mb-4 mt-4 mr-2 ${styles.headerLeft} ${
          styles.flexContainer
        } ${styles.linkColor} ${
          isMain ? styles.activeTab : styles.notActiveTab
        }`}
        to={{
          pathname: `/`,
        }}
      >
        <div className={`ml-5 mr-1 mb-4 mt-4 ${styles.notActiveTab}`}>
          <BurgerIcon type="primary" />
        </div>
        <div className="mb-4 mt-4 ml-1 mr-5 text text_type_main-default">
          <span>Constructor</span>
        </div>
      </Link>
      <Link
        className={`mb-4 mt-4 mr-2 ${styles.headerLeft} ${
          styles.flexContainer
        } ${styles.linkColor} ${
          isOrderList ? styles.activeTab : styles.notActiveTab
        }`}
        to={{
          pathname: `/feed`,
        }}
      >
        <div className="ml-5 mr-1 mb-4 mt-4">
          <ListIcon type="primary" />
        </div>
        <div
          className={`mb-4 mt-4 ml-1 mr-5 text text_type_main-default ${styles.nowrap}`}
        >
          <span>Order list</span>
        </div>
      </Link>

      <div
        className={` ${styles.logo} mt-6 mb-6 ${
          isMain ? styles.activeTab : styles.notActiveTab
        }`}
      >
        <Link
          to={{
            pathname: `/`,
          }}
        >
          <Logo />
        </Link>
      </div>
      <Link
        className={`mb-4 mt-4 ${styles.headerRight} ${styles.flexContainer} ${
          styles.linkColor
        } ${isProfile ? styles.activeTab : styles.notActiveTab}`}
        to={{
          pathname: `/profile`,
        }}
      >
        <div className="ml-5 mr-1 mb-4 mt-4">
          <ProfileIcon type="primary" />
        </div>
        <div className="mb-4 mt-4 ml-1 mr-5 text text_type_main-default   ">
          <span className="text text_type_main-default">Profile</span>
        </div>
      </Link>
    </header>
  );
};

export default AppHeader;
