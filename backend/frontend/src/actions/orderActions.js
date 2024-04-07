import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import {
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAILURE,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAILURE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAILURE,
  ORDER_LIST_MY_FAILURE,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAILURE,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/orderConstants";
import axios from "axios";

const orderCreateRequest = () => {
  return {
    type: ORDER_CREATE_REQUEST,
  };
};

const orderCreateSuccess = (data) => {
  return {
    type: ORDER_CREATE_SUCCESS,
    payload: data,
  };
};

const orderCreateFailure = (err_msg) => {
  return {
    type: ORDER_CREATE_FAILURE,
    payload: err_msg,
  };
};

const clearCart = () => {
  return {
    type: CART_CLEAR_ITEMS,
  };
};
export const createOrder = (order) => {
  return (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch(orderCreateRequest());
    axios
      .post(`/api/orders/add/`, order, config)
      .then((response) => {
        dispatch(orderCreateSuccess(response.data));

        dispatch(clearCart());
        localStorage.removeItem("cartItems");
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(orderCreateFailure(err_msg));
      });
  };
};

// get order details
const orderDetailsRequest = () => {
  return {
    type: ORDER_DETAILS_REQUEST,
  };
};

const orderDetailsSuccess = (data) => {
  return {
    type: ORDER_DETAILS_SUCCESS,
    payload: data,
  };
};

const orderDetailsFailure = (err_msg) => {
  return {
    type: ORDER_DETAILS_FAILURE,
    payload: err_msg,
  };
};

export const getOrderDetails = (id) => {
  return (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(orderDetailsRequest());
    axios
      .get(`/api/orders/${id}/`, config)
      .then((response) => {
        dispatch(orderDetailsSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(orderDetailsFailure(err_msg));
      });
  };
};


// pay order
const payOrderRequest = () => {
  return {
    type: ORDER_PAY_REQUEST,
  };
};

const payOrderSuccess = () => {
  return {
    type: ORDER_PAY_SUCCESS,
  };
};

const payOrderFailure = (err_msg) => {
  return {
    type: ORDER_PAY_FAILURE,
    payload: err_msg,
  };
};



export const payOrder = (id, paymentResult) => {
  return (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(payOrderRequest());
    axios
      .put(`/api/orders/${id}/pay/`,paymentResult, config)
      .then((response) => {
        dispatch(payOrderSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(payOrderFailure(err_msg));
      });
  };
};


// deliver order
const deliverOrderRequest = () => {
  return {
    type: ORDER_DELIVER_REQUEST,
  };
};

const deliverOrderSuccess = () => {
  return {
    type: ORDER_DELIVER_SUCCESS,
  };
};

const deliverOrderFailure = (err_msg) => {
  return {
    type: ORDER_DELIVER_FAILURE,
    payload: err_msg,
  };
};



export const deliverOrder = (order) => {
  return (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(deliverOrderRequest());
    axios
      .put(`/api/orders/${order._id}/deliver/`,{}, config)
      .then((response) => {
        dispatch(deliverOrderSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(deliverOrderFailure(err_msg));
      });
  };
};


// list my orders
const listMyOrdersRequest = () => {
  return {
    type: ORDER_LIST_MY_REQUEST,
  };
};

const listMyOrdersSuccess = (data) => {
  return {
    type: ORDER_LIST_MY_SUCCESS,
    payload: data,
  };
};

const listMyOrdersFailure = (err_msg) => {
  return {
    type: ORDER_LIST_MY_FAILURE,
    payload: err_msg,
  };
};

export const listMyOrders = () => {
  return (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(listMyOrdersRequest());
    axios
      .get(`/api/orders/myorders/`, config)
      .then((response) => {
        dispatch(listMyOrdersSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(listMyOrdersFailure(err_msg));
      });
  };
};

// list orders
const listOrdersRequest = () => {
  return {
    type: ORDER_LIST_REQUEST,
  };
};

const listOrdersSuccess = (data) => {
  return {
    type: ORDER_LIST_SUCCESS,
    payload: data,
  };
};

const listOrdersFailure = (err_msg) => {
  return {
    type: ORDER_LIST_FAILURE,
    payload: err_msg,
  };
};

export const listOrders = () => {
  return (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(listOrdersRequest());
    axios
      .get(`/api/orders/`, config)
      .then((response) => {
        dispatch(listOrdersSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(listOrdersFailure(err_msg));
      });
  };
};