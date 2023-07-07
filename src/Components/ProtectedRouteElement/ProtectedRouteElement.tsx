import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from "../../utils/utils";
import { IStore } from "../../services/reducers/store";
import {
  checkUser,
  getUser,
  refreshToken,
} from "../../services/actions/userFunctions";
import { useEffect } from "react";

export const ProtectedRouteElement = ({ element }: { element: any }) => {
  const location = useLocation();

  const auth = useSelector((state: IStore) => state.userData.auth);

  if (auth) {
    return element;
  } else {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
};

export const ProtectedRouteElementLogginedUser = ({
  element,
}: {
  element: any;
}) => {
  const auth = useSelector((state: IStore) => state.userData.auth);
  if (!auth) {
    return element;
  } else {
    return <Navigate to="/" replace />;
  }
};
export const ProtectedRouteElementResetPass = ({
  element,
}: {
  element: any;
}) => {
  const emailSent = useSelector((state: IStore) => state.userData.emailSent);
  if (!getCookie("refreshToken") && emailSent) {
    return element;
  }
  return <Navigate to="/login" replace />;
};
