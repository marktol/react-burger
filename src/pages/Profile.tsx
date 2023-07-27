import { useState, useEffect } from "react";

import styles from "./Profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  getUser,
  refreshToken,
  logout,
} from "../services/actions/userFunctions";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../utils/utils";

import {
  Tab,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { IStore } from "../services/reducers/store";

function Profile() {
  const userName = useSelector((state: IStore) => state.userData.name);
  const userEmail = useSelector((state: IStore) => state.userData.email);

  const navigate = useNavigate();
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [current, setCurrent] = useState("one");
  const dispatch = useDispatch<any>();

  const logOut = async () => {
    const refreshToken: string = getCookie("refreshToken");
    dispatch(logout(refreshToken)).then((data: any) => {
      if (data.payload && data.payload.success == true) {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUser(getCookie("token"))).then((data: any) => {
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
      <div className={styles.main}>
        <div className={`ml-25 mr-25 ${styles.tabs}`}>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            <Link
              to={{
                pathname: `/profile`,
              }}
            >
              Profile
            </Link>
          </Tab>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            <Link
              to={{
                pathname: `/orders`,
              }}
            >
              Orders history
            </Link>
          </Tab>
          <Tab value="three" active={current === "three"} onClick={logOut}>
            Logout
          </Tab>
        </div>
        <div>
          <Input
            onChange={onChangeName}
            type={"text"}
            placeholder={"Name"}
            value={userName}
            name={"name"}
            size={"default"}
            extraClass="ml-1"
          />
          <EmailInput
            value={userEmail}
            name={"email"}
            isIcon={false}
            onChange={onChangeEmail}
          />

          <PasswordInput
            onChange={onChangePassword}
            placeholder={"Password"}
            value={password}
            name={"password"}
            extraClass="mb-2"
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;
