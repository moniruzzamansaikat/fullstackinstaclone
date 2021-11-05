import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authRequest } from "../../utils/xhr";
import postsExtraReducers from "./postsExtraReducers";
import { addSavedPost, removeSavedPost } from "../auth/auth";

const initialState = {
  posts: [],
  profilePosts: [],
  savedPosts: [],
  singlePost: null,
  openDropdownMenu: false,
  dropdownedPost: null,
  creatingPost: false,
  createdPost: false,
  removingPost: false,
};

// fetch prfile posts
export const fetchProfilePosts = createAsyncThunk(
  "posts/fetchProfilePosts",
  async (userId, { getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        `/users/${userId}/posts`
      );
      return data;
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

// fetch saved posts
export const fetchSavedPosts = createAsyncThunk(
  "posts/fetchSavedPosts",
  async (_, { getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)("/posts/save");
      return data;
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

// fetch single posts
export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (postId, { getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        `/posts/${postId}`
      );
      return data;
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

// save post
export const savePost = createAsyncThunk(
  "users/savePost",
  async (postId, { dispatch, getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        `/posts/${postId}/save`,
        {
          method: "POST",
        }
      );
      dispatch(addSavedPost(data));
      return data;
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

export const removeFromSaved = createAsyncThunk(
  "posts/removeFromSaved",
  async (postId, { dispatch, getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        `/posts/${postId}/save`,
        {
          method: "DELETE",
        }
      );
      dispatch(removeSavedPost(data));
      return data;
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

// fetch posts
export const fetchPosts = createAsyncThunk(
  "pots/fetchPosts",
  async (_, { dispatch, getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)("/posts");
      dispatch(setPosts(data));
    } catch (error) {}
  }
);

// create new post
export const createNewPost = createAsyncThunk(
  "posts/createNewPost",
  async (params, { dispatch, getState }) => {
    try {
      dispatch(setCreatingPost(true));

      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });

      if (params.photos) {
        params.photos.forEach((item) => {
          formData.append(item.id, item);
        });
      }

      const { data } = await authRequest(getState().auth.token)("/posts", {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "mutlipart/form-data",
        },
      });
      dispatch(setCreatingPost(false));
      dispatch(addPost(data));
      dispatch(setCreatedPost(true));
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
      dispatch(setCreatingPost(false));
    }
  }
);

// delete post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { dispatch, getState }) => {
    dispatch(setRemovingPost(true));

    try {
      const { data } = await authRequest(getState().auth.token)(
        `/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      dispatch(setRemovingPost(false));
      dispatch(removePost(data._id));
    } catch (error) {}
  }
);

// main slice
const posts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, { payload }) => {
      state.posts = [payload, ...state.posts];
    },

    setPosts: (state, { payload }) => {
      state.posts = payload;
    },

    removePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post._id !== payload);
    },

    setCreatingPost: (state, { payload }) => {
      state.creatingPost = payload;
    },

    setCreatedPost: (state, { payload }) => {
      state.createdPost = payload;
    },

    setOpenDropdownMenu: (state, { payload }) => {
      state.openDropdownMenu = payload;
    },

    setDropdownedPost: (state, { payload }) => {
      state.dropdownedPost = payload;
    },

    setRemovingPost: (state, { payload }) => {
      state.removingPost = payload;
    },
  },

  extraReducers: postsExtraReducers,
});

export const {
  addPost,
  setCreatingPost,
  setPosts,
  removePost,
  setCreatedPost,
  setOpenDropdownMenu,
  setDropdownedPost,
  setRemovingPost,
} = posts.actions;
export default posts.reducer;
