import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followPeople, unfollowPeople } from "../../store/users/users";

function FollowButton({ user }) {
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
    <div>
      {user._id !== currentUser._id ? (
        <button
          className="btn"
          onClick={following ? handleUnfollow : handleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      ) : null}
    </div>
  );
}

export default FollowButton;
