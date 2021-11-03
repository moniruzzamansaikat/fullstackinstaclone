import { createAsyncThunk } from "@reduxjs/toolkit";
import { authRequest } from "../../utils/xhr";
import { setDislikePost, setLikePost } from "./posts";

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
      dispatch(setLikePost({ postId, ...data }));
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

      dispatch(setDislikePost({ postId, ...data }));
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);
