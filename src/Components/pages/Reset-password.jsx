import { useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { passwordReset } from "../../services/actions/userFunctions";

import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ResetPassword() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    dispatch(passwordReset({ userPassword: password, userToken: token })).then(
      (data) => {
        if (data.payload.success) {
          navigate("/login");
        }
      }
    );
  };

  return (
    <div>
      <AppHeader />
      <body className={`${styles.main} mt-25`}>
        <h1 className="text text_type_main-large mb-6">Reset Password</h1>
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          placeholder={"New password"}
          value={password}
          name={"password"}
          extraClass="mb-6"
        />

        <Input
          type={"text"}
          placeholder={"Code fron letter"}
          onChange={(e) => setToken(e.target.token)}
          value={token}
          name={"token"}
          size={"default"}
          extraClass="mb-6"
        />

        <Button
          onClick={fetchData}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Save
        </Button>
        <p className="text text_type_main-small mt-20">
          Do u remember password?{" "}
          <Link
            to={{
              pathname: `/login`,
            }}
          >
            Login
          </Link>
        </p>
      </body>
    </div>
  );
}

export default ResetPassword;
