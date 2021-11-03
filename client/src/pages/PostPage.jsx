import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { authRequest } from "../utils/xhr";
import MainLayout from "../components/Layouts/MainLayout";
import { BsThreeDots, BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import "./styles/PostPage.css";

function PostPage() {
  const { token } = useSelector((state) => state.auth);
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    authRequest(token)(`/posts/${postId}`).then(({ data }) => {
      setPost(data);
    });
  }, [postId, token]);

  if (!post) return null;

  return (
    <MainLayout>
      <div className="post_page">
        <div
          className="img_div"
          style={{ backgroundImage: `url(${post?.photos[0].url})` }}
        ></div>
        <div className="post_details">
          <header>
            <div>
              <img src={post?.user?.photo?.url} alt="" />
              <Link to={`/profile/${post?.user?._id}`}>{post?.user?.name}</Link>
            </div>

            <BsThreeDots />
          </header>

          <section className="body">
            <img src={post?.user?.photo?.url} alt="" />
            <div className="pb">
              <Link to={`/profile/${post?.user?._id}`}>{post?.user?.name}</Link>
              <p>{post.text}</p>
            </div>
          </section>

          <section className="footer">
            <div className="icons">
              <BsHeart id="icon" />
              <FaRegComment id="icon" />
            </div>
            <div className="comment">
              <input type="text" />
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default PostPage;
