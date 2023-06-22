import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import BurgerMain from "../pages/BurgerMain";
import Register from "../pages/Register";
import Ingredient from "../pages/Ingredient";
import ResetPassword from "../pages/Reset-password";
import ForgotPassword from "../pages/Forgot-password";
import Profile from "../pages/Profile";
import {
  ProtectedRouteElement,
  ProtectedRouteElementLogginedUser,
  ProtectedRouteElementResetPass,
} from "../ProtectedRouteElement/ProtectedRouteElement";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BurgerMain />} />

        <Route
          path="/login"
          element={<ProtectedRouteElementLogginedUser element={<Login />} />}
        />

        <Route
          path="/register"
          element={<ProtectedRouteElementLogginedUser element={<Register />} />}
        />

        <Route
          path="/resetpassword"
          element={
            <ProtectedRouteElementResetPass element={<ResetPassword />} />
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <ProtectedRouteElementLogginedUser element={<ForgotPassword />} />
          }
        />
        <Route
          path="/profile"
          element={<ProtectedRouteElement element={<Profile />} />}
        />
        <Route path="/ingredients/:id" element={<Ingredient />} />
      </Routes>
    </BrowserRouter>
  );
}
