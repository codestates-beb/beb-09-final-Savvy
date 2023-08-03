import React from "react";
import SideNav from "../components/SideNav";
import CurrentTimeBox from "../components/CurrentTimeBox";
import DashboardSearchbar from "../components/DashboardSearchbar";
import DashboardGraqh from "../components/DashboardGraqh";
import DashboardBox from "../components/DashboardBox";

export default function DashboardPage() {
  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <SideNav /> 
      <CurrentTimeBox />
      <DashboardBox />
      <DashboardSearchbar />
      <DashboardGraqh />
    </div>
  );
}