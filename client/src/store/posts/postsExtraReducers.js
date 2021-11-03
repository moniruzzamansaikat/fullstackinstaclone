import { fetchProfilePosts, fetchSavedPosts, fetchSinglePost } from "./posts";
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
    });
};

export default postsExtraReducers;
