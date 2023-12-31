import React from "react";
import SideNav from "../components/SideNav";
import CurrentTimeBox from "../components/CurrentTimeBox";
import SettingPageContent from "../components/SettingPageContent";

// css
import "../assets/SettingPage.css";
import "../assets/Admin.css";

export default function SettingPage({ web3Auth }) {
  return (
    <div className="dashboard">
      <SideNav />
      <CurrentTimeBox />
      <SettingPageContent web3Auth={web3Auth} />
    </div>
  );
}
