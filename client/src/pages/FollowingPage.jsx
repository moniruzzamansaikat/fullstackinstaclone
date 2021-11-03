import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MainLayout from "../components/Layouts/MainLayout";
import { fetchFollowing } from "../store/users/users";
import UserItems from "./UserItems";

function FollowingPage() {
  const { following } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchFollowing(id));
  }, [dispatch, id]);

  return (
    <MainLayout>
      <UserItems users={following} />
    </MainLayout>
  );
}

export default FollowingPage;
