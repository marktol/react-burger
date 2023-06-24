import { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../services/actions/userFunctions";
import { useNavigate, Link } from "react-router-dom";

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
      <body className={`${styles.main} mt-25`}>
        <h1 className="text text_type_main-large mb-6">Login</h1>

        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />

        <PasswordInput
          onChange={onChangePassword}
          placeholder={"Password"}
          value={password}
          name={"password"}
          extraClass="mb-6"
        />
        <Button
          onClick={submitForm}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Login
        </Button>
        <p className="mb-4 mt-20">
          Are u new?{"  "}
          <Link
            className={`mb-4 mt-4 ${styles.headerRight} ${styles.flexContainer} ${styles.linkColor}`}
            to={{
              pathname: `/register`,
            }}
          >
            Register
          </Link>
        </p>
        <p>
          Forgot password?{"  "}
          <Link
            className={`mb-4 mt-4 ${styles.headerRight} ${styles.flexContainer} ${styles.linkColor}`}
            to={{
              pathname: `/forgot-password`,
            }}
          >
            Forgot Password
          </Link>
        </p>
      </body>
    </div>
  );
}

export default Login;
