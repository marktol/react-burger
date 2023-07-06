import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../../utils/utils";

export const ProtectedRouteElement = ({ element }) => {
  const location = useLocation();
  const auth = useSelector((state) => state.userData.auth);
  if (auth) {
    return element;
  } else {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
};

export const ProtectedRouteElementLogginedUser = ({ element }) => {
  const auth = useSelector((state) => state.userData.auth);
  if (!auth) {
    return element;
  } else {
    return <Navigate to="/" replace />;
  }
};
export const ProtectedRouteElementResetPass = ({ element }) => {
  const emailSent = useSelector((state) => state.userData.emailSent);
  if (!getCookie("refreshToken") && emailSent) {
    return element;
  }
  return <Navigate to="/login" replace />;
};
