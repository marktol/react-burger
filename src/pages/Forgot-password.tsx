import styles from "./Login.module.css";
import { useState } from "react";
import { forgotPassword } from "../services/actions/userFunctions";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch<any>();

  const fetchData = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(email)).then((data: any) => {
      if (data.payload.success) {
        navigate("/reset-password");
        setIsLoading(false);
      }
    });
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div>
      <div className={`${styles.main} mt-25`}>
        <h1 className="text text_type_main-large mb-6">Password recovery</h1>
        <form onSubmit={fetchData} className={styles.main}>
          <EmailInput
            onChange={onChangeEmail}
            value={email}
            name={"email"}
            isIcon={false}
            extraClass="mb-6"
          />

          <Button htmlType="submit" type="primary" size="medium">
            Recover
          </Button>
        </form>
        <p className="text text_type_main-small mt-20">
          Do u remember password?
          <Link
            to={{
              pathname: `/login`,
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
