import { useEffect, useState } from "react";

import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { login } from "../services/actions/userFunctions";
import { useNavigate, Link, useLocation } from "react-router-dom";

import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Login() {
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const location = useLocation();
  const { state } = location;

  const redirectTo = state?.from || "/";

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ emailUser: email, passwordUser: password })).then(
      (data: any) => {
        if (data.payload == undefined) {
        } else {
          navigate(redirectTo);
          setIsLoading(false);
        }
      }
    );
  };
  return (
    <div>
      <div className={`${styles.main} mt-25`}>
        <h1 className="text text_type_main-large mb-6">Login</h1>
        <form onSubmit={submitForm} className={styles.main}>
          <EmailInput
            onChange={onChangeEmail}
            value={email}
            name={"email"}
            isIcon={false}
            extraClass="mb-6"
            data-cy={"email"}
          />

          <PasswordInput
            onChange={onChangePassword}
            placeholder={"Password"}
            value={password}
            name={"password"}
            extraClass="mb-6"
            data-cy={"pass"}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Login
          </Button>
        </form>
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
      </div>
    </div>
  );
}

export default Login;
