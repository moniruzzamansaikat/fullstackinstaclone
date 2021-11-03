import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import ProfileHeader from "../components/Profile/ProfileHeader";
import { useSelector, useDispatch } from "react-redux";
import { fetchPublicProfileUser } from "../store/users/users";
import { fetchProfilePosts } from "../store/posts/posts";
import ProfilePosts from "../components/Profile/ProfilePosts";
import Meta from "../components/Meta";

function PublicProfile() {
  const dispatch = useDispatch();
  const { publicProfileUser } = useSelector((state) => state.users);
  const { profilePosts } = useSelector((state) => state.posts);
  const { id: userId } = useParams();

  useEffect(() => {
    dispatch(fetchPublicProfileUser(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchProfilePosts(userId));
  }, [dispatch, userId]);

  if (!publicProfileUser) return null;

  return (
    <MainLayout>
      <Meta title={publicProfileUser?.name} />
      <ProfileHeader user={publicProfileUser} />
      <ProfilePosts posts={profilePosts} />
    </MainLayout>
  );
}

export default PublicProfile;
