import { PayloadAction } from "@reduxjs/toolkit";
import type { Middleware } from "redux";
import {
  connectionClosed,
  connectionError,
  connectionSucces,
  getMessage,
} from "../reducers/WSReducer";
export type WsResponse = {
  success?: boolean;
  orders: [
    {
      ingredients: string[];
      _id: string;
      status: string;
      number: number;
      createdAt: string;
      updatedAt: string;
      name: string;
    }
  ];
  total: number;
  totalToday: number;
};
export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";

export type WsConnectionStartAction = {
  readonly type: typeof WS_CONNECTION_START;
};

export type WsConnectionSuccessAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

export type WsConnectionErrorAction = {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
};

export type WsConnectionClosedAction = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

export type WsGetDataAction = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly orders: any;
  readonly total: number;
  readonly totalToday: number;
};

export type WsSendDataAction = {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: { accessToken: string };
};

export type WsActions =
  | WsConnectionStartAction
  | WsConnectionSuccessAction
  | WsConnectionErrorAction
  | WsConnectionClosedAction
  | WsGetDataAction
  | WsSendDataAction;

export type TWSStoreActions = {
  wsInit: typeof WS_CONNECTION_START;
  wsSendMessage: typeof WS_SEND_MESSAGE;
  onOpen: typeof WS_CONNECTION_SUCCESS;
  onClose: typeof WS_CONNECTION_CLOSED;
  onError: typeof WS_CONNECTION_ERROR;
  onMessage: typeof WS_GET_MESSAGE;
};

export const wsUrl = "wss://norma.nomoreparties.space/orders";

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export const socketMiddleware = (wsActions: any): Middleware => {
  return ((store) => {
    let socket: WebSocket | null = null;
    const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
      wsActions;

    return (next) => (action: PayloadAction<string>) => {
      const { dispatch } = store;

      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(payload);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch(connectionSucces());
        };

        socket.onerror = (event) => {
          dispatch(
            connectionError({
              message: "An error occurred in the WebSocket connection.",
            })
          );
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: any = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch(getMessage({ payload: restParsedData }));
        };

        socket.onclose = (event) => {
          dispatch(connectionClosed());
        };

        if (type === WS_SEND_MESSAGE) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
        if (type === WS_CONNECTION_CLOSED && socket) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  }) as Middleware;
};
