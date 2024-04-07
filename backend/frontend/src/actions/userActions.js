import axios from "axios";
import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILURE,
} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";

const userLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

const userLoginSuccess = (userInfo) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: userInfo,
  };
};

const userLoginFailure = (err_msg) => {
  return {
    type: USER_LOGIN_FAILURE,
    payload: err_msg,
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userLoginRequest);
    axios
      .post(
        "/api/users/login/",
        { username: email, password: password },
        config
      )
      .then((response) => {
        const userInfo = response.data;
        dispatch(userLoginSuccess(userInfo));

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(userLoginFailure(err_msg));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
    dispatch({ type: ORDER_LIST_MY_RESET });
    dispatch({ type: USER_LIST_RESET });
  };
};

const userRegisterRequest = () => {
  return {
    type: USER_REGISTER_REQUEST,
  };
};

const userRegisterSuccess = (userInfo) => {
  return {
    type: USER_REGISTER_SUCCESS,
    payload: userInfo,
  };
};

const userRegisterFailure = (err_msg) => {
  return {
    type: USER_REGISTER_FAILURE,
    payload: err_msg,
  };
};

export const register = (name, email, password) => {
  return (dispatch) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    dispatch(userRegisterRequest);
    axios
      .post(
        "/api/users/register/",
        { name: name, email: email, password: password },
        config
      )
      .then((response) => {
        const userInfo = response.data;
        dispatch(userRegisterSuccess(userInfo));
        dispatch(userLoginSuccess(userInfo));

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(userRegisterFailure(err_msg));
      });
  };
};

const userDetailsRequest = () => {
  return {
    type: USER_DETAILS_REQUEST,
  };
};

const userDetailSuccess = (user) => {
  return {
    type: USER_DETAILS_SUCCESS,
    payload: user,
  };
};

const userDetailsFailure = (err_msg) => {
  return {
    type: USER_DETAILS_FAILURE,
    payload: err_msg,
  };
};

export const getUserDetails = (id) => {
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
    dispatch(userDetailsRequest());
    axios
      .get(`/api/users/${id}/`, config)
      .then((response) => {
        const user = response.data;
        dispatch(userDetailSuccess(user));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(userDetailsFailure(err_msg));
      });
  };
};

const userUpdateProfileRequest = () => {
  return {
    type: USER_DETAILS_REQUEST,
  };
};

const userUpdateProfileSuccess = (user) => {
  return {
    type: USER_DETAILS_SUCCESS,
    payload: user,
  };
};

const userUpdateProfileFailure = (err_msg) => {
  return {
    type: USER_DETAILS_FAILURE,
    payload: err_msg,
  };
};

export const updateUserProfile = (user) => {
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
    dispatch(userUpdateProfileRequest());
    axios
      .put(`/api/users/profile/update/`, user, config)
      .then((response) => {
        const userInfo = response.data;
        dispatch(userUpdateProfileSuccess(userInfo));
        dispatch(userLoginSuccess(userInfo));

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(userUpdateProfileFailure(err_msg));
      });
  };
};

const userListRequest = () => {
  return {
    type: USER_LIST_REQUEST,
  };
};

const userListSuccess = (data) => {
  return {
    type: USER_LIST_SUCCESS,
    payload: data,
  };
};

const userListFailure = (err_msg) => {
  return {
    type: USER_LIST_FAILURE,
    payload: err_msg,
  };
};

export const listUsers = () => {
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
    dispatch(userListRequest());
    axios
      .get(`/api/users/`, config)
      .then((response) => {
        dispatch(userListSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(userListFailure(err_msg));
      });
  };
};

const userDeleteRequest = () => {
  return {
    type: USER_DELETE_REQUEST,
  };
};

const userDeleteSuccess = (data) => {
  return {
    type: USER_DELETE_SUCCESS,
    payload: data,
  };
};

const userDeleteFailure = (err_msg) => {
  return {
    type: USER_DELETE_FAILURE,
    payload: err_msg,
  };
};

export const deleteUser = (id) => {
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
    dispatch(userDeleteRequest());
    axios
      .delete(`/api/users/delete/${id}`, config)
      .then((response) => {
        dispatch(userDeleteSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(userDeleteFailure(err_msg));
      });
  };
};

const updateUserRequest = () => {
  return {
    type: USER_UPDATE_REQUEST,
  };
};

const updateUserSuccess = () => {
  return {
    type: USER_UPDATE_SUCCESS,
  };
};

const updateUserFailure = (err_msg) => {
  return {
    type: USER_UPDATE_FAILURE,
    payload: err_msg,
  };
};

export const updateUser = (user) => {
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
    dispatch(updateUserRequest());
    axios
      .put(`/api/users/update/${user._id}/`, user, config)
      .then((response) => {
        dispatch(updateUserSuccess());
        dispatch(userDetailSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(updateUserFailure(err_msg));
      });
  };
};
