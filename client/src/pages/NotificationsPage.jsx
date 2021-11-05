import { useSelector } from "react-redux";
import MainLayout from "../components/Layouts/MainLayout";
import NotifCard from "../components/Notification/NotifCard";

function NotificationsPage() {
  const { notifications } = useSelector((state) => state.auth);

  return (
    <MainLayout>
      {notifications?.map((notif) => (
        <NotifCard key={notif._id} notif={notif} />
      ))}
    </MainLayout>
  );
}

export default NotificationsPage;
