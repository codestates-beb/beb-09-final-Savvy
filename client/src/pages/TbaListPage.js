import React from "react";
import SideNav from "../components/SideNav";
import TbaListPageContent from "../components/TbaListPageContent";

export default function TbaListPage() {
  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <SideNav />
      <TbaListPageContent />
    </div>
  );
}
