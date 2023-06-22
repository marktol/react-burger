import { useState, useEffect } from "react";
import AppHeader from "../AppHeader/AppHeader";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  refreshToken,
  logout,
} from "../../services/actions/userFunctions";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/utils";

import {
  Tab,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Profile() {
  const userName = useSelector((state) => state.userData.name);
  const userEmail = useSelector((state) => state.userData.email);

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [current, setCurrent] = useState("one");
  const dispatch = useDispatch();

  const onChangeEmail = (e) => {};
  const onChangePassword = (e) => {};
  const logOut = async () => {
    dispatch(logout(getCookie("refreshToken"))).then((data) => {
      if (data.payload && data.payload.success == true) {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUser(getCookie("token"))).then((data) => {
        if (data.error && data.error.message === "jwt expired") {
          dispatch(refreshToken(getCookie("refreshToken"))).then(() => {
            fetchData();
          });
        }
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <AppHeader />
      <body className={styles.main}>
        <div className={styles.tabs}>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Profile
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Orders history
          </Tab>
          <Tab value="three" active={current === "three"} onClick={logOut}>
            Logout
          </Tab>
        </div>
        <div>
          <Input
            type={"text"}
            placeholder={"Name"}
            value={userName}
            name={"name"}
            size={"default"}
            extraClass="ml-1"
          />
          <EmailInput value={userEmail} name={"email"} isIcon={false} />

          <PasswordInput
            onChange={onChangePassword}
            placeholder={"Password"}
            value={password}
            name={"password"}
            extraClass="mb-2"
          />
        </div>
      </body>
    </div>
  );
}

export default Profile;
