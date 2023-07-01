import { Navigate } from "react-router-dom";

import { getUser, refreshToken } from "../../services/actions/userFunctions";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../utils/utils";

export const ProtectedRouteElement = ({ element }) => {
  const auth = useSelector((state) => state.userData.auth);
  if (auth) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
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
