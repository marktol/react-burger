import { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/userFunctions";
import { useNavigate } from "react-router-dom";

import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Login() {
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const submitForm = async () => {
    dispatch(login({ emailUser: email, passwordUser: password })).then(
      (data) => {
        if (data.payload == undefined) {
        } else {
          navigate("/");
          setIsLoading(false);
        }
      }
    );
  };
  return (
    <div>
      <AppHeader />
      <body className={styles.main}>
        <h1 className="text text_type_main-large">Login</h1>

        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          isIcon={false}
        />

        <PasswordInput
          onChange={onChangePassword}
          placeholder={"Password"}
          value={password}
          name={"password"}
          extraClass="mb-2"
        />
        <Button
          onClick={submitForm}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Login
        </Button>
        <p>
          Are u new?{" "}
          <a
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </a>
        </p>
        <p>
          Forgot password?{" "}
          <a
            onClick={() => {
              navigate("/forgotpassword");
            }}
          >
            Forgot Password
          </a>
        </p>
      </body>
    </div>
  );
}

export default Login;
