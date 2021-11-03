import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import image from "../../images/avatar.jpg";
import { useSelector, useDispatch } from "react-redux";
import { followPeople, unfollowPeople } from "../../store/users/users";
import "./styles/SuggestedUserCard.css";

function SuggestedUserCard({ user }) {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const handleFollow = () => {
    dispatch(followPeople(user._id));
  };

  const handleUnfollow = () => {
    dispatch(unfollowPeople(user._id));
  };

  const following = useMemo(() => {
    return currentUser.following.includes(user?._id);
  }, [currentUser, user]);

  return (
    <div className="suggested_user_card">
      <div className="user_card">
        <div className="user_info">
          <img src={user?.photo?.url || image} alt="" />
          <div>
            <Link to={`/profile/${user._id}`}>
              <small className="link">{user.name}</small>
            </Link>
            <p>Suggestion for you</p>
          </div>
        </div>
        <div>
          <span
            className="custom_link"
            onClick={following ? handleUnfollow : handleFollow}
          >
            {following ? "Unfollow" : "Follow"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SuggestedUserCard;
