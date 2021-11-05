import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/Layouts/MainLayout";
import { BsThreeDots } from "react-icons/bs";
import AddComment from "../components/Posts/AddComment";
import SingePostComment from "../components/Comment/SingePostComment";
import PostSave from "../components/Posts/PostSave";
import PostLike from "../components/Posts/PostLike";
import { fetchSinglePost } from "../store/posts/posts";
import "./styles/PostPage.css";

function PostPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { singlePost: post } = useSelector((state) => state.posts);
  const { id: postId } = useParams();

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, [dispatch, postId]);

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
            <div className="pb">
              {post.comments.map((comment) => (
                <SingePostComment key={comment._id} comment={comment} />
              ))}
            </div>
          </section>

          <section className="footer">
            <div className="icons">
              <PostLike post={post} user={user} />
              <PostSave post={post} />
            </div>
            <AddComment postId={postId} />
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export default PostPage;
