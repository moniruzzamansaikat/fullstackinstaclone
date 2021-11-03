import { createAsyncThunk } from "@reduxjs/toolkit";
import { authRequest } from "../../utils/xhr";

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, text }, { getState }) => {
    try {
      const { data } = await authRequest(getState().auth.token)(
        `/posts/${postId}/comments`,
        {
          method: "POST",
          data: {
            text,
          },
        }
      );
      return data;
    } catch (error) {
      const { data: reason } = error.response;
      console.log(reason);
    }
  }
);
