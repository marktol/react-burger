import AppHeader from "../AppHeader/AppHeader";
import styles from "./Login.module.css";
import { useState } from "react";
import { forgotPassword } from "../../services/actions/userFunctions";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fetchData = async () => {
    dispatch(forgotPassword(email)).then((data) => {
      if (data.payload.success) {
        navigate("/resetpassword");
        setIsLoading(false);
      }
    });
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <AppHeader />
      <body className={styles.main}>
        <h1 className="text text_type_main-large">Password recovery</h1>

        <EmailInput
          onChange={onChangeEmail}
          value={email}
          name={"email"}
          isIcon={false}
        />

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={fetchData}
        >
          Recover
        </Button>
        <p className="text text_type_main-small">Do u remember password?</p>
      </body>
    </div>
  );
}

export default ForgotPassword;
