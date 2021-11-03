import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authRequest } from "../../utils/xhr";
import { setToken } from "../auth/auth";

const initialState = {
  users: [],
  following: [],
  followers: [],
  suggestedUsers: [],
  fetchingSuggestedUsers: false,
  fetchingFollowers: false,
  fetchingFollowing: false,
  publicProfileUser: null,
};

// fetch followers
export const fetchFollowers = createAsyncThunk(
  "users/fetchFollowers",
  async (id, { dispatch, getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        `/users/${id}/followers`
      );
      dispatch(setFollowers(data));
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

// fetch followers
export const fetchFollowing = createAsyncThunk(
  "users/fetchFollowing",
  async (id, { dispatch, getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        `/users/${id}/following`
      );
      dispatch(setFollowing(data));
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

// fetch public profile user
export const fetchPublicProfileUser = createAsyncThunk(
  "users/fetchPublicProfileUser",
  async (id, { dispatch, getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(`/users/${id}`);
      return data;
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

// fetch suggested users
export const fetchSuggestedUsers = createAsyncThunk(
  "users/fetchSuggestedUsers",
  async (_, { dispatch, getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        "/users/suggestions"
      );
      dispatch(setSuggestedUsers(data));
    } catch (error) {
      console.log(error);
      const { data: reason } = error.reponse;
      console.log(reason);
    }
  }
);

// follow people
export const followPeople = createAsyncThunk(
  "users/followPeople",
  async (userId, { dispatch, getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        "/users/follow",
        {
          method: "POST",
          data: { userId },
        }
      );

      dispatch(setToken(data.token));
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

// follow people
export const unfollowPeople = createAsyncThunk(
  "users/unfollowPeople",
  async (userId, { dispatch, getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        "/users/unfollow",
        {
          method: "POST",
          data: { userId },
        }
      );
      dispatch(setToken(data.token));
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

//  MAIN SLICE
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, { payload }) => {
      state.users = payload;
    },

    setFollowers: (state, { payload }) => {
      state.followers = payload;
    },

    setFollowing: (state, { payload }) => {
      state.following = payload;
    },

    addUser: () => {},
    removeUser: () => {},

    addFollower: (state, { payload }) => {
      state.followers = [...state.followers, payload];
    },

    removeFollower: () => {},

    addFollowing: (state, { payload }) => {
      state.following = [...state.following, payload];
    },

    removeFollowing: () => {},

    setFetchingFollowers: (state, { payload }) => {
      state.fetchingFollowing = payload;
    },

    setFetchingFollowing: (state, { payload }) => {
      state.fetchingFollowing = payload;
    },

    setSuggestedUsers: (state, { payload }) => {
      state.suggestedUsers = payload;
    },

    setFetchingSuggestedUsers: (state, { payload }) => {
      state.fetchingSuggestedUsers = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPublicProfileUser.fulfilled, (state, { payload }) => {
      state.publicProfileUser = payload;
    });
  },
});

export const {
  setUser,
  setFollowers,
  setFollowing,
  addUser,
  removeUser,
  addFollower,
  removeFollower,
  addFollowing,
  removeFollowing,
  setSuggestedUsers,
  setFetchingFollowers,
  setFetchingFollowing,
  setFetchingSuggestedUsers,
} = usersSlice.actions;
export default usersSlice.reducer;
