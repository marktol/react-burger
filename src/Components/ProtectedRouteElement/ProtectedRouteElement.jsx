import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/utils";
import { useSelector } from "react-redux";

export const ProtectedRouteElement = ({ element }) => {
  if (getCookie("refreshToken")) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export const ProtectedRouteElementLogginedUser = ({ element }) => {
  if (getCookie("refreshToken")) {
    return <Navigate to="/" replace />;
  } else {
    return element;
  }
};
export const ProtectedRouteElementResetPass = ({ element }) => {
  const emailSent = useSelector((state) => state.userData.emailSent);
  if (!getCookie("refreshToken") && emailSent) {
    return element;
  }
  return <Navigate to="/login" replace />;
};
