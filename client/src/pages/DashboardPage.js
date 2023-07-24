import React from "react";
import SideNav from "../components/SideNav";
import DashboardPageContent from "../components/DashboardPageContent";

export default function DashboardPage() {
  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <SideNav />
      <DashboardPageContent />
    </div>
  );
}
