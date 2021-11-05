import {
  fetchProfilePosts,
  fetchSavedPosts,
  fetchSinglePost,
  savePost,
  removeFromSaved,
} from "./posts";
import { addComment } from "./comment";
import { dislikePost, likePost } from "./likes";

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

    // like post
    .addCase(likePost.fulfilled, (state, { payload }) => {
      if (payload.postId === state.singlePost._id) {
        state.singlePost.likes.push(payload.data);
      }

      state.posts = state.posts.map((post) => ({
        ...post,
        likes:
          post._id === payload.postId
            ? [...post.likes, payload.data]
            : post.likes,
      }));
    })

    // dislike post
    .addCase(dislikePost.fulfilled, (state, { payload }) => {
      if (payload.postId === state.singlePost._id) {
        state.singlePost.likes = state.singlePost.likes.filter(
          (like) => like?._id !== payload?.data?._id
        );
      }

      state.posts = state.posts.map((post) => ({
        ...post,
        likes:
          post._id === payload.postId
            ? post.likes.filter((like) => like?._id !== payload?.data?._id)
            : post.likes,
      }));
    })
    .addCase(removeFromSaved.fulfilled, (state, { payload }) => {
      state.savedPosts = state.savedPosts.filter(
        (post) => post._id !== payload
      );
    });
};

export default postsExtraReducers;
