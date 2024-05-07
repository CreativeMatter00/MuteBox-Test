import axios from "axios";

//? Get ALL Post

export const getALLPost = async () => {
  try {
    const response = await axios.get(`/api/post`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (
      error?.response?.data?.error === "invalid signature" ||
      error?.response?.data?.error === "invalid token" ||
      error?.response?.data?.error === "jwt expired"
    ) {
      const response = await axios.get(`/api/logout`);
      window.location.href = "/login";
      return response;
    }
  }
};

export const getALLOption = async () => {
  try {
    const response = await axios.get(`/api/option`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    if (
      error?.response?.data?.error === "invalid signature" ||
      error?.response?.data?.error === "invalid token" ||
      error?.response?.data?.error === "jwt expired"
    ) {
      const response = await axios.get(`/api/logout`);
      window.location.href = "/login";
      return response;
    }
  }
};

//? Get logout

export const getLogout = async () => {
  try {
    const response = await axios.get(`/api/logout`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
