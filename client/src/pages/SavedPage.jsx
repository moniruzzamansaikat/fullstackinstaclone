import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/Layouts/MainLayout";
import PostSmallCard from "../components/Shared/PostSmallCard";
import { fetchSavedPosts } from "../store/posts/posts";
import "./styles/SavePage.css";

function SavedPage() {
  const { savedPosts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavedPosts());
  }, [dispatch]);

  if (!savedPosts || !savedPosts.length) return null;

  return (
    <MainLayout>
      <div className="save_page">
        {savedPosts.map((post) => (
          <PostSmallCard key={post._id} post={post} />
        ))}
      </div>
    </MainLayout>
  );
}

export default SavedPage;
