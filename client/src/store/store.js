import { configureStore } from "@reduxjs/toolkit";
import photosSlice from "./photos/photos";
import postsSlice from "./posts/posts";
import authSlice from "./auth/auth";
import usersSlice from "./users/users";

export default configureStore({
  reducer: {
    photos: photosSlice,
    posts: postsSlice,
    auth: authSlice,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
