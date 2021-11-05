import React from "react";
import { useSelector } from "react-redux";
import MainLayout from "../components/Layouts/MainLayout";
import ContactInfoSetting from "../components/Settings/ContactInfoSetting";
import UserDataSetting from "../components/Settings/UserDataSetting";
import "./styles/SettingsPage.css";

function SettingsPage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <MainLayout>
      <div className="settings_page">
        <UserDataSetting user={user} />
        <ContactInfoSetting user={user} />
      </div>
    </MainLayout>
  );
}

export default SettingsPage;
