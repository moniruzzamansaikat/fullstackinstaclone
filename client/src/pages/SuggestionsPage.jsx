import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/Layouts/MainLayout";
import { fetchSuggestedUsers } from "../store/users/users";
import UserItems from "./UserItems";

function SuggestionsPage() {
  const dispatch = useDispatch();
  const { suggestedUsers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchSuggestedUsers());
  }, [dispatch]);

  return (
    <MainLayout>
      <UserItems users={suggestedUsers} />
    </MainLayout>
  );
}

export default SuggestionsPage;
