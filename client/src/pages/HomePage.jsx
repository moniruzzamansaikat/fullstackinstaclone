import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeSidebar from "../components/HomeSidebar/HomeSidebar";
import MainLayout from "../components/Layouts/MainLayout";
import Posts from "../components/Posts/Posts";
import Stories from "../components/Stories/Stories";
import { fetchPosts } from "../store/posts/posts";
import "./styles/homePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const { creatingPost, removingPost } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="home_page">
        <div id="home_main_container">
          <Stories />

          {creatingPost && (
            <p className="success_msg">
              <span>Your post is uploading....</span>
            </p>
          )}

          {removingPost && (
            <p className="error_msg">
              <span>Your post is removing....</span>
            </p>
          )}

          <Posts />
        </div>
        <div style={{ position: "relative" }} id="side_bar_container">
          <HomeSidebar />
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;
