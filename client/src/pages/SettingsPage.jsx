import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "../components/Layouts/MainLayout";
import UserDataSetting from "../components/Settings/UserDataSetting";

function SettingsPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <MainLayout>
      <UserDataSetting user={user} />
    </MainLayout>
  );
}

export default SettingsPage;
