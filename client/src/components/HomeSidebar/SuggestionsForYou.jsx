import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUserCard from "./SuggestedUserCard";
import { fetchSuggestedUsers } from "../../store/users/users";
import "./styles/SuggestionsForYou.css";

export default function Suggestions() {
  const { suggestedUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSuggestedUsers());
  }, [dispatch]);

  return (
    <div>
      <div className="suggestions_for_you">
        <h3>Suggestions For You</h3>
        <Link className="link" to="/suggestions">
          <span>See all</span>
        </Link>
      </div>

      {suggestedUsers?.map((user) => (
        <SuggestedUserCard key={user._id} user={user} />
      ))}
    </div>
  );
}
