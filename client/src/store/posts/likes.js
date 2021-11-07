import { createAsyncThunk } from "@reduxjs/toolkit";
import { authRequest } from "../../utils/xhr";

// like post
export const likePost = createAsyncThunk(
  "posts/likePost",
  async (postId, { dispatch, getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        `/posts/${postId}/like`,
        {
          method: "PUT",
        }
      );

      return { postId, data };
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);

// dislike post
export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async (postId, { dispatch, getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        `/posts/${postId}/dislike`,
        {
          method: "PUT",
        }
      );

      return { postId, data };
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);
