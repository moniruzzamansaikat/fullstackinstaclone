import {
  fetchProfilePosts,
  fetchSavedPosts,
  fetchSinglePost,
  savePost,
  removeFromSaved,
} from "./posts";
import { addComment } from "./comment";

const postsExtraReducers = (builder) => {
  builder
    .addCase(fetchSavedPosts.fulfilled, (state, { payload }) => {
      state.savedPosts = payload;
    })
    .addCase(fetchProfilePosts.fulfilled, (state, { payload }) => {
      state.profilePosts = payload;
    })
    .addCase(fetchSinglePost.fulfilled, (state, { payload }) => {
      state.singlePost = payload;
    })
    .addCase(addComment.fulfilled, (state, { payload }) => {
      state.singlePost.comments = payload;
    })
    .addCase(savePost.fulfilled, (state, { payload }) => {
      state.savedPosts = [...state.savedPosts, payload];
    })
    .addCase(removeFromSaved.fulfilled, (state, { payload }) => {
      state.savedPosts = state.savedPosts.filter(
        (post) => post._id !== payload
      );
    });
};

export default postsExtraReducers;
