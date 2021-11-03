import Axios from "axios";

export const xhr = Axios.create({
  baseURL: "http://localhost:5000/api",
});

// export const authRequest = Axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: {
//     Authorization: `bearer ${jwt_token}`,
//   },
// });

/**
 *
 * @param {String} token
 * @returns AxiosInstance
 */
export const authRequest = (token) => {
  return Axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
};
