import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./UserOrders.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/utils";
import { logout } from "../../services/actions/userFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/socketMiddleware";
import { useEffect } from "react";
import { IStore } from "../../services/reducers/store";
import { FeedCard } from "../Feed/Feed";
const url = "wss://norma.nomoreparties.space/orders";

export const UserOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const wsConnected = useSelector((state: IStore) => state.ws.wsConnected);

  useEffect(() => {
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, []);

  useEffect(() => {
    if (!wsConnected) {
      dispatch({
        type: WS_CONNECTION_START,
        payload: `${url}?token=${getCookie("token")}`,
      });
    }
    return () => {};
  });

  const orders = useSelector((state: IStore) => state.ws.orders);

  const logOut = async () => {
    const refreshToken: string = getCookie("refreshToken");
    dispatch(logout(refreshToken)).then((data: any) => {
      if (data.payload && data.payload.success == true) {
        navigate("/login");
      }
    });
  };
  return (
    <>
      <div>
        <div className={`mt-15 ${styles.main}`}>
          <div className={styles.leftDiv}>
            <div className="ml-25">
              <div className={`mr-15 `}>
                <div className={`text text_type_main-large mt-7`}>
                  <Link
                    to={{
                      pathname: `/profile`,
                    }}
                    className={styles.notActiveTab}
                  >
                    Profile
                  </Link>
                </div>
                <div className="text text_type_main-large mt-5">
                  <Link
                    to={{
                      pathname: `/orders`,
                    }}
                    className={styles.activeTab}
                  >
                    Orders history
                  </Link>
                </div>

                <div
                  className={`${styles.notActiveTab} text text_type_main-large mt-5`}
                  onClick={logOut}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
          <div
            className={`custom-scroll mb-1 pb-1 ${styles.scrollDiv} ${styles.feed}`}
          >
            {orders?.map((elem: any) => (
              <Link
                className={styles.noDecoration}
                to={{
                  pathname: `/profile/orders/${elem.number}`,
                }}
                state={{ background: "modal" }}
                key={elem.number}
              >
                <FeedCard elem={elem} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
function dispatch(arg0: { type: any; payload: any }) {
  throw new Error("Function not implemented.");
}
