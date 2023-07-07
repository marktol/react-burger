import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "../../pages/login";
import BurgerMain from "../../pages/BurgerMain";
import Register from "../../pages/Register";
import Ingredient from "../../pages/Ingredient";
import ResetPassword from "../../pages/Reset-password";
import ForgotPassword from "../../pages/Forgot-password";
import Profile from "../../pages/Profile";
import { useDispatch } from "react-redux";
import { Audio } from "react-loader-spinner";
import {
  ProtectedRouteElement,
  ProtectedRouteElementLogginedUser,
  ProtectedRouteElementResetPass,
} from "../ProtectedRouteElement/ProtectedRouteElement";
import { Modal } from "../Modal/Modal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { useEffect, useState } from "react";
import { getIngredients } from "../../services/actions/thunkFunctions";
import { checkUser } from "../../services/actions/userFunctions";
import AppHeader from "../AppHeader/AppHeader";
import styles from "./App.module.css";

export default function App() {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const background = location.state && location.state.background;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(checkUser()).then(() => {
        dispatch(getIngredients()).then(() => {
          setLoading(false);
        });
      });
    };

    fetchData();
  }, [dispatch]);
  return (
    <>
      {loading && (
        <Audio
          wrapperClass={styles.loader}
          height="180"
          width="180"
          color="white"
          ariaLabel="three-dots-loading"
        />
      )}
      {!loading && (
        <>
          <AppHeader />
          <Routes>
            <Route path="/" element={<BurgerMain />} />
            {!background && (
              <Route path="/ingredients/:id" element={<Ingredient />} />
            )}

            <Route
              path="/login"
              element={
                <ProtectedRouteElementLogginedUser element={<Login />} />
              }
            />

            <Route
              path="/register"
              element={
                <ProtectedRouteElementLogginedUser element={<Register />} />
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRouteElementResetPass element={<ResetPassword />} />
              }
            />
            <Route
              path="/forgot-password"
              element={
                <ProtectedRouteElementLogginedUser
                  element={<ForgotPassword />}
                />
              }
            />

            <Route
              path="/profile"
              element={<ProtectedRouteElement element={<Profile />} />}
            />

            <Route path="*" element={<BurgerMain />} />
          </Routes>
          {background && !loading && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={
                  <Modal title="Детали ингредиента">
                    <IngredientDetails />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      )}
    </>
  );
}
