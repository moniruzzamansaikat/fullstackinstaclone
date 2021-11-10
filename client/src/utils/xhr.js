import Axios from "axios";

export const xhr = Axios.create({
  baseURL: "https://saikim.herokuapp.com/api",
});

/**
 *
 * @param {String} token
 * @returns AxiosInstance
 */
export const authRequest = (token) => {
  return Axios.create({
    baseURL: "https://saikim.herokuapp.com/api",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};
