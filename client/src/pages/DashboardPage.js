import React from "react";
import SideNav from "../components/SideNav";
import CurrentTimeBox from "../components/CurrentTimeBox";
import DashboardPageContent from "../components/DashboardPageContent";

export default function DashboardPage() {
  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <SideNav />
      <CurrentTimeBox />
      <DashboardPageContent />
    </div>
  );
}
