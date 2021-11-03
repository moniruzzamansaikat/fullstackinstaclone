import React, { useEffect } from "react";
import MainLayout from "../components/Layouts/MainLayout";
import ProfileHeader from "../components/Profile/ProfileHeader";
import { fetchProfilePosts } from "../store/posts/posts";
import { useDispatch, useSelector } from "react-redux";
import ProfilePosts from "../components/Profile/ProfilePosts";

function ProfilePage() {
  const dispatch = useDispatch();
  const { profilePosts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProfilePosts(user?._id));
  }, [dispatch, user._id]);

  return (
    <MainLayout>
      <ProfileHeader user={user} mainUser={true} />
      <ProfilePosts posts={profilePosts} />
    </MainLayout>
  );
}

export default ProfilePage;
