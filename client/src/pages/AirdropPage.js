import React from "react";
import SideNav from "../components/SideNav";
import AirdropPageContent from "../components/AirdropPageContent";

export default function AirdropPage() {
  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <SideNav />
      <AirdropPageContent />
    </div>
  );
}
