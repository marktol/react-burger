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
import { useNavigate } from "react-router-dom";

function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const submitForm = async () => {
    dispatch(
      register({ emailUser: email, passwordUser: password, nameUser: name })
    );
    setIsLoading(false);
  };

  return (
    <div>
      <AppHeader />
      <body className={styles.main}>
        <h1 className="text text_type_main-large">Registration</h1>

        <Input
          type={"text"}
          onChange={onChangeName}
          placeholder={"Name"}
          value={name}
          name={"name"}
          size={"default"}
          extraClass="ml-1"
        />
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
          Register
        </Button>
        <p className="text text_type_main-small">
          Do u have an account?
          <a
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </a>
        </p>
      </body>
    </div>
  );
}

export default Register;
