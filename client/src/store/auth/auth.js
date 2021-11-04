import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authRequest, xhr } from "../../utils/xhr";

const initialState = {
  token: localStorage.getItem("jwt_token"),
  user: null,
  fetchingUser: false,
  updatingUserData: false,
  notifications: [],
};

// fetch notifications
export const fetchNotifications = createAsyncThunk(
  "auth/fetchNotifications",
  async (_, { dispatch, getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        "/notifications"
      );
      dispatch(setNotifications(data));
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

// update user data
export const updateUserData = createAsyncThunk(
  "auth/updateUserData",
  async (updateData, { dispatch, getState }) => {
    try {
      dispatch(setUpdatingUserData(true));

      const formData = new FormData();
      Object.keys(updateData).forEach((key) => {
        formData.append(key, updateData[key]);
      });

      const { data } = await authRequest(getState().auth.token)(
        "/auth/update",
        {
          method: "PUT",
          data: formData,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(setUser(data.user));
      dispatch(setToken(data.token));
      dispatch(setUpdatingUserData(false));
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
      dispatch(setUpdatingUserData(false));
    }
  }
);

// register user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { dispatch }) => {
    try {
      const { data } = await xhr("/auth/register", {
        method: "POST",
        data: userData,
      });
      dispatch(setToken(data.token));
      dispatch(setUser(data.user));
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

// login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (authData, { dispatch }) => {
    try {
      const { data } = await xhr("/auth/login", {
        method: "POST",
        data: authData,
      });

      dispatch(setToken(data.token));
      dispatch(setUser(data.user));
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

// check authentication
export const checkAuthenticatinon = createAsyncThunk(
  "auth/checkAuthenticatinon",
  async (token, { dispatch, getState }) => {
    dispatch(setFetchingUser(true));

    try {
      const { data } = await authRequest(token)("/auth/check");
      dispatch(setUser(data));
      dispatch(setFetchingUser(false));
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
      dispatch(setFetchingUser(false));
    }
  }
);

// MAIN SLICE
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeToken: () => {
      localStorage.removeItem("jwt_token");
    },

    setFetchingUser: (state, { payload }) => {
      state.fetchingUser = payload;
    },

    addSavedPost: (state, { payload }) => {
      state.user.saved = [...state.user.saved, payload];
    },

    removeSavedPost: (state, { payload }) => {
      state.user.saved = state.user.saved.filter((f) => f !== payload);
    },

    setToken: (state, { payload }) => {
      localStorage.setItem("jwt_token", payload);
      state.token = payload;
    },

    setUser: (state, { payload }) => {
      state.user = payload;
    },

    logoutUser: (state, { payload }) => {
      localStorage.removeItem("jwt_token");
      state.token = null;
      state.user = null;
    },

    setUpdatingUserData: (state, { payload }) => {
      state.updatingUserData = payload;
    },

    setNotifications: (state, { payload }) => {
      state.notifications = payload;
    },

    addFollowId: (state, { payload }) => {
      state.user.following = [...state.user.following, payload];
    },

    removeFollowId: (state, { payload }) => {
      state.user.following = state.user.following.filter(
        (follow) => follow !== payload
      );
    },
  },
});

export const {
  setToken,
  setUser,
  removeToken,
  logoutUser,
  setFetchingUser,
  setNotifications,
  setUpdatingUserData,
  addFollowId,
  addSavedPost,
  removeSavedPost,
  removeFollowId,
} = auth.actions;
export default auth.reducer;
