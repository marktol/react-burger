import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./UserOrders.module.css";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/utils";
import { logout } from "../../services/actions/userFunctions";
import { useDispatch, useSelector } from "react-redux";
import { WS_CONNECTION_START } from "../../services/actions/socketMiddleware";
import { useEffect } from "react";
import { IStore } from "../../services/reducers/store";
import { FeedCard } from "../Feed/Feed";
const url = "wss://norma.nomoreparties.space/orders";

export const UserOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const wsConnected = useSelector((state: IStore) => state.ws.wsConnected);
  console.log(wsConnected);
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
        <div className={styles.main}>
          <div className={styles.leftDiv}>
            <div className="ml-25 mr-25">
              <Tab value="one" active={false} onClick={() => {}}>
                <Link
                  to={{
                    pathname: `/profile`,
                  }}
                >
                  Profile
                </Link>
              </Tab>
              <Tab value="two" active={true} onClick={() => {}}>
                <Link
                  to={{
                    pathname: `/orders`,
                  }}
                >
                  Orders history
                </Link>
              </Tab>
              <Tab value="three" active={false} onClick={logOut}>
                Logout
              </Tab>
            </div>
          </div>
          <div
            className={`custom-scroll mb-1 pb-1 ${styles.scrollDiv} ${styles.feed}`}
          >
            {orders?.map((elem: any) => (
              <Link
                className={styles.noDecoration}
                to={{
                  pathname: `/orders/${elem.number}`,
                }}
                state={{ background: "modal" }}
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
