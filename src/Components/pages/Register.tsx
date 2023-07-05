import { useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";

import {
  Button,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { register } from "../../services/actions/userFunctions";
import { Link } from "react-router-dom";

function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch<any>();
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const submitForm = async () => {
    dispatch(
      register({ emailUser: email, passwordUser: password, nameUser: name })
    );
  };

  return (
    <div>
      <AppHeader />
      <body className={`mt-25 ${styles.main}`}>
        <h1 className="text text_type_main-large mb-6">Registration</h1>

        <Input
          type={"text"}
          onChange={onChangeName}
          placeholder={"Name"}
          value={name}
          name={"name"}
          size={"default"}
          extraClass="ml-1 mb-6"
        />
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
          Register
        </Button>
        <p className="text text_type_main-small  mt-20">
          Do u have an account?{" "}
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

export default Register;
