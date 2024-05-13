import { axiosApi } from "./axios.api";

export const getProducts = async (queryParams = {}) => {
  try {
    let paramas = "?";
    paramas += queryParams?.limit ? "limit=" + queryParams?.limit : "";
    paramas += queryParams?.skip ? "skip=" + queryParams?.skip : "";

    const productsList = await axiosApi.get("/products" + paramas);
    return productsList?.data || {};
  } catch (error) {
    throw error?.data;
  }
};

export const getProductById = async (productId) => {
  try {
    const productData = await axiosApi.get(`/product/${productId}`);
    return productData?.data || {};
  } catch (error) {
    throw error?.data;
  }
};

export const addToCart = async (cartPaylaod = {}) => {
  try {
    const cartRes = await axiosApi.post("/products/cart", cartPaylaod);
    return cartRes?.data || {};
  } catch (error) {
    throw error?.data;
  }
};

export const getCartProducts = async () => {
  try {
    let paramas = "?userId=" + localStorage.getItem("userId");

    const cartList = await axiosApi.get("/products/cart" + paramas);
    return cartList?.data || {};
  } catch (error) {
    throw error?.data;
  }
};
