import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../components/Layouts/MainLayout";
import NotifCard from "../components/Notification/NotifCard";
import { fetchNotifications } from "../store/auth/auth";

function NotificationsPage() {
  const { notifications } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(notifications);
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <MainLayout>
      {notifications?.map((notif) => (
        <NotifCard key={notif._id} notif={notif} />
      ))}
    </MainLayout>
  );
}

export default NotificationsPage;
