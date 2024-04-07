import axios from "axios";
import {
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_REVIEW_FAILURE,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_TOP_FAILURE,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

const fetchProductsRequest = () => {
  return {
    type: PRODUCT_LIST_REQUEST,
  };
};

const fetchProductsSuccess = (products) => {
  return {
    type: PRODUCT_LIST_SUCCESS,
    payload: products,
  };
};

const fetchProductsfailure = (err_msg) => {
  return {
    type: PRODUCT_LIST_FAILURE,
    payload: err_msg,
  };
};

export const listProducts = (queryString = "") => {
  return (dispatch) => {
    // let appendString = ""
    // if (keyword){
    //   appendString = `/?keyword=${keyword}`
    // }
    dispatch(fetchProductsRequest());
    axios
      .get(`/api/products${queryString}`)
      .then((response) => {
        dispatch(fetchProductsSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(fetchProductsfailure(err_msg));
      });
  };
};



// list top products

const topProductsRequest = () => {
  return {
    type: PRODUCT_TOP_REQUEST,
  };
};

const topProductsSuccess = (products) => {
  return {
    type: PRODUCT_TOP_SUCCESS,
    payload: products,
  };
};

const topProductsfailure = (err_msg) => {
  return {
    type: PRODUCT_TOP_FAILURE,
    payload: err_msg,
  };
};

export const listTopProducts = () => {
  return (dispatch) => {
  
    dispatch(topProductsRequest());
    axios
      .get(`/api/products/top/`)
      .then((response) => {
        dispatch(topProductsSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(topProductsfailure(err_msg));
      });
  };
};


// Product details actions --------------------------------

const fetchProductDetailsRequest = () => {
  return {
    type: PRODUCT_DETAILS_REQUEST,
  };
};

const fetchProductDetailsSuccess = (product) => {
  return {
    type: PRODUCT_DETAILS_SUCCESS,
    payload: product,
  };
};

const fetchProductDetailsfailure = (err_msg) => {
  return {
    type: PRODUCT_DETAILS_FAILURE,
    payload: err_msg,
  };
};

export const listProductDetails = (pid) => {
  return (dispatch) => {
    dispatch(fetchProductDetailsRequest());

    axios
      .get(`/api/products/${pid}`)
      .then((response) => {
        dispatch(fetchProductDetailsSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        error.response.dispatch(fetchProductDetailsfailure(err_msg));
      });
  };
};

//delete product
const deleteProductRequest = () => {
  return {
    type: PRODUCT_DELETE_REQUEST,
  };
};

const deleteProductSuccess = () => {
  return {
    type: PRODUCT_DELETE_SUCCESS,
  };
};

const deleteProductFailure = (err_msg) => {
  return {
    type: PRODUCT_DELETE_FAILURE,
    payload: err_msg,
  };
};

export const deleteProduct = (id) => {
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

    dispatch(deleteProductRequest());
    axios
      .delete(`/api/products/delete/${id}/`, config)
      .then((response) => {
        dispatch(deleteProductSuccess());
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(deleteProductFailure(err_msg));
      });
  };
};

//create product
const createProductRequest = () => {
  return {
    type: PRODUCT_CREATE_REQUEST,
  };
};

const createProductSuccess = (data) => {
  return {
    type: PRODUCT_CREATE_SUCCESS,
    payload: data,
  };
};

const createProductFailure = (err_msg) => {
  return {
    type: PRODUCT_CREATE_FAILURE,
    payload: err_msg,
  };
};

export const createProduct = () => {
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

    dispatch(createProductRequest());
    axios
      .post(`/api/products/create/`, {}, config)
      .then((response) => {
        dispatch(createProductSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(createProductFailure(err_msg));
      });
  };
};

//update product
const updateProductRequest = () => {
  return {
    type: PRODUCT_UPDATE_REQUEST,
  };
};

const updateProductSuccess = (data) => {
  return {
    type: PRODUCT_UPDATE_SUCCESS,
    payload: data,
  };
};

const updateProductFailure = (err_msg) => {
  return {
    type: PRODUCT_UPDATE_FAILURE,
    payload: err_msg,
  };
};

export const updateProduct = (product) => {
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

    dispatch(updateProductRequest());
    axios
      .put(`/api/products/update/${product._id}/`, product, config)
      .then((response) => {
        dispatch(updateProductSuccess(response.data));
        dispatch(fetchProductDetailsSuccess(response.data));
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(updateProductFailure(err_msg));
      });
  };
};

//review create
const createReviewRequest = () => {
  return {
    type: PRODUCT_CREATE_REVIEW_REQUEST,
  };
};

const createReviewSuccess = () => {
  return {
    type: PRODUCT_CREATE_REVIEW_SUCCESS,
  };
};

const createReviewFailure = (err_msg) => {
  return {
    type: PRODUCT_CREATE_REVIEW_FAILURE,
    payload: err_msg,
  };
};

export const createProductReview = (productId, review) => {
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

    dispatch(createReviewRequest());
    axios
      .post(`/api/products/${productId}/reviews/`, review, config)
      .then((response) => {
        dispatch(createReviewSuccess());
      })
      .catch((error) => {
        const err_msg =
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        dispatch(createReviewFailure(err_msg));
      });
  };
};
