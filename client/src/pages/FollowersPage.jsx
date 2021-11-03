import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import MainLayout from "../components/Layouts/MainLayout";
import { fetchFollowers } from "../store/users/users";
import UserItems from "./UserItems";

function FollowersPage() {
  const { followers } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchFollowers(id));
  }, [dispatch, id]);

  return (
    <MainLayout>
      <UserItems users={followers} />
    </MainLayout>
  );
}

export default FollowersPage;
