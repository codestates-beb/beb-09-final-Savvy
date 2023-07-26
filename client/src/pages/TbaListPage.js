import React from "react";
import TbaListPageContent from "../components/TbaListPageContent";
import SideNav from "../components/SideNav";
import CurrentTimeBox from "../components/CurrentTimeBox";
import TbaListParent from "../components/TbaListParent";

export default function TbaListPage() {
  return (
    <div className="dashboard" style={{ height: "100vh" }}>
      <SideNav />
      <TbaListPageContent />
      <CurrentTimeBox />
      <TbaListParent />
    </div>
  );
}