import React from "react";
import SideNav from "../components/SideNav";
import SettingPageContent from "../components/SettingPageContent";

// css
import "../assets/SettingPage.css";
import "../assets/Admin.css";

export default function SettingPage() {
  return (
    <div className="dashboard">
      <SideNav />
      <SettingPageContent />
    </div>
  );
}
