import Axios from "axios";

export const xhr = Axios.create({
  baseURL: "/api",
});

/**
 *
 * @param {String} token
 * @returns AxiosInstance
 */
export const authRequest = (token) => {
  return Axios.create({
    baseURL: "/api",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};
