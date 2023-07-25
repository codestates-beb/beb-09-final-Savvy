import React from "react";
import SideNav from "../components/SideNav";
import ManagerPageContent from "../components/ManagerPageContent";

export default function ManagerPage() {
  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <SideNav />
      <ManagerPageContent />
    </div>
  );
}
